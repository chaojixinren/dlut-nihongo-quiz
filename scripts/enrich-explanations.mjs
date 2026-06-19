// scripts/enrich-explanations.mjs
//
// Enrich P1 questions in party / military / history md files with structured
// explanations (考点 / 标签 / 正确答案 / 干扰项分析 / 拓展), mirroring the
// Japanese grammar question style.
//
// Usage:
//   node scripts/enrich-explanations.mjs --limit 3       # dry-run, 3 per file
//   node scripts/enrich-explanations.mjs --only party    # one category
//   node scripts/enrich-explanations.mjs --force         # re-enrich already-done
//   node scripts/enrich-explanations.mjs                 # full run, all 678
//
// Env (read from .env or process.env):
//   ANTHROPIC_AUTH_TOKEN          (required)
//   ANTHROPIC_BASE_URL            (default https://api.deepseek.com/anthropic)
//   ANTHROPIC_DEFAULT_HAIKU_MODEL (default deepseek-v4-flash)

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Anthropic from '@anthropic-ai/sdk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ---------- .env loader (tiny, no deps) ----------
// Note: .env values take precedence over inherited shell env here, because the
// user's shell may have ANTHROPIC_* vars set for Claude Code itself (different
// account/endpoint). Our .env explicitly targets the enrichment script's provider.
const envPath = path.resolve(__dirname, '../.env')
const envOverrides = {}
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/)
    if (m) envOverrides[m[1]] = m[2].trim().replace(/^["']|["']$/g, '')
  }
}
const TOKEN = envOverrides.ANTHROPIC_AUTH_TOKEN || process.env.ANTHROPIC_AUTH_TOKEN
const BASE_URL = envOverrides.ANTHROPIC_BASE_URL || process.env.ANTHROPIC_BASE_URL || 'https://api.deepseek.com/anthropic'
const MODEL = envOverrides.ANTHROPIC_DEFAULT_HAIKU_MODEL || process.env.ANTHROPIC_DEFAULT_HAIKU_MODEL || 'deepseek-v4-flash'

if (!TOKEN) {
  console.error('✗ ANTHROPIC_AUTH_TOKEN not set. Put it in .env (see .env.example).')
  process.exit(1)
}

// DeepSeek's /anthropic endpoint expects an Authorization: Bearer header.
// The Anthropic SDK uses Bearer when `authToken` is passed (vs X-Api-Key for `apiKey`).
const client = new Anthropic({ authToken: TOKEN, baseURL: BASE_URL })

// ---------- CLI ----------
const argv = process.argv.slice(2)
const limitFlag = argv.includes('--limit') ? parseInt(argv[argv.indexOf('--limit') + 1]) : 0
const onlyFlagIdx = argv.indexOf('--only')
const onlyFlag = onlyFlagIdx >= 0 ? argv[onlyFlagIdx + 1] : ''
const force = argv.includes('--force')

// ---------- File specs ----------
const ROOT = path.resolve(__dirname, '..')

const FILES = [
  {
    name: 'party',
    path: 'data/raw/party/党史题库_按优先级整理.md',
    sectionStart: /^##\s+第一优先级/,
    sectionEnd: /^##\s+第二优先级/,
    // party: **N. stem**\n\nA. xxx\n\n**答案**：B\n\n**解析**：...\n\n---
    qHdr: /^\*\*\s*(\d+)\s*[\.、]\s*(.+?)\s*\*\*\s*$/,
    nextBoundary: l => /^\*\*\s*\d+\s*[\.、]/.test(l) || /^---\s*$/.test(l) || /^##\s/.test(l),
  },
  {
    name: 'military',
    path: 'data/raw/military/军理题库_按优先级整理.md',
    sectionStart: /^##\s+第一优先级/,
    sectionEnd: /^##\s+第二优先级/,
    qHdr: /^\*\*\s*(\d+)\s*[\.、]\s*(.+?)\s*\*\*\s*$/,
    nextBoundary: l => /^\*\*\s*\d+\s*[\.、]/.test(l) || /^---\s*$/.test(l) || /^##\s/.test(l),
  },
  {
    name: 'history',
    path: 'data/raw/history/刷题单1-核心必刷（T0）.md',
    sectionStart: null, // entire file is T0
    sectionEnd: null,
    // history: #### N. stem  OR  > #### N. stem
    qHdr: /^(>?\s*)?####\s+(\d+)\s*[\.、]\s*(.+?)\s*$/,
    nextBoundary: l => {
      const t = l.replace(/^>\s*/, '').trim()
      return /^####\s+\d+\s*[\.、]/.test(t) || /^---\s*$/.test(t) || /^##\s/.test(t)
    },
  },
]

// ---------- Question extraction ----------
function findBlocks(lines, spec) {
  // Returns array of { hdrLineIdx, bodyStartIdx, bodyEndIdx } for each question in scope.
  const blocks = []
  let inScope = spec.sectionStart === null // history: always in scope

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (spec.sectionStart && spec.sectionStart.test(line)) { inScope = true; continue }
    if (spec.sectionEnd && spec.sectionEnd.test(line)) { inScope = false; continue }
    if (!inScope) continue

    const m = line.match(spec.qHdr)
    if (!m) continue

    // Find body end: next boundary
    let end = i + 1
    while (end < lines.length && !spec.nextBoundary(lines[end])) end++
    blocks.push({ hdrLineIdx: i, bodyStartIdx: i + 1, bodyEndIdx: end })
  }
  return blocks
}

function parseBlock(lines, block, spec) {
  const hdrLine = lines[block.hdrLineIdx]
  const hdrMatch = hdrLine.match(spec.qHdr)
  // For history: groups are [full, quotePrefix, num, stem]; for party/military: [full, num, stem]
  const stem = spec.name === 'history' ? hdrMatch[3].trim() : hdrMatch[2].trim()

  const body = lines.slice(block.bodyStartIdx, block.bodyEndIdx).map(l => l.replace(/^>\s*/, ''))

  // Find answer line and explanation block within body
  let answerIdx = -1
  let answerText = ''
  for (let i = 0; i < body.length; i++) {
    const t = body[i].trim()
    // Three formats seen:
    //   **答案**：X       (party / military — bold wraps label only)
    //   **答案：X**       (history T0 — bold wraps whole line)
    //   **答案**：X **    (rare mixed)
    const m1 = t.match(/^\*\*\s*答案\s*\*\*\s*[：:]\s*(.+?)\s*$/)         // **答案**：X
    const m2 = t.match(/^\*\*\s*答案\s*[：:]\s*(.+?)\s*\*\*\s*$/)         // **答案：X**
    const m3 = t.match(/^\*\*\s*答案\s*\*\*\s*[：:]\s*(.+?)\s*\*\*\s*$/)  // **答案**：X **
    if (m1) { answerIdx = i; answerText = m1[1].trim(); break }
    if (m2) { answerIdx = i; answerText = m2[1].trim(); break }
    if (m3) { answerIdx = i; answerText = m3[1].trim(); break }
  }

  if (answerIdx < 0) return null

  // Options: lines before the answer that look like "A. xxx" / "A、xxx" / "A) xxx"
  const options = []
  for (let i = 0; i < answerIdx; i++) {
    const t = body[i].trim()
    if (!t) continue
    // Split line by inline options "A.x B.y C.z"
    const parts = t.split(/(?=[A-E][\.\u3001\uff09)])/).map(s => s.trim()).filter(p => /^[A-E][\.、）)?]/.test(p))
    for (const p of parts) {
      const m = p.match(/^([A-E])[\.、）)?]\s*(.+)$/)
      if (m && !options.find(o => o.key === m[1])) options.push({ key: m[1], text: m[2].trim() })
    }
  }

  // Locate explanation block in original `lines` (not the body slice).
  // Match any variant: **解析**： / **解析：** / **解析** : etc.
  let expStartAbs = -1
  for (let i = block.bodyStartIdx + answerIdx + 1; i < block.bodyEndIdx; i++) {
    const t = lines[i].replace(/^>\s*/, '').trim()
    if (/^\*\*解析/.test(t) && /[：:]/.test(t)) { expStartAbs = i; break }
  }
  // Explanation end = block.bodyEndIdx (next boundary) OR end of contiguous non-empty
  let expEndAbs = block.bodyEndIdx
  if (expStartAbs >= 0) {
    // Trim trailing blank lines from the explanation block
    while (expEndAbs > expStartAbs + 1 && lines[expEndAbs - 1].trim() === '') expEndAbs--
  }

  return {
    stem,
    options,
    answerText: answerText.trim(),
    explanationLines: expStartAbs >= 0 ? lines.slice(expStartAbs, expEndAbs) : [],
    expStartAbs,
    expEndAbs,
  }
}

function detectType(answerText, options) {
  // Strip trailing punctuation, normalize
  const cleaned = answerText.replace(/[\.。、\s]/g, '').toUpperCase()
  if (/^(正确|错误|对|错)$/.test(cleaned)) return 'judgement'
  if (/^[A-E]+$/.test(cleaned)) return cleaned.length > 1 ? 'multi' : 'single'
  // Text answer — match against option text
  const norm = s => s.replace(/[\.。、\s]/g, '').toLowerCase()
  const match = options.find(o => norm(o.text) === norm(answerText))
  if (match) return 'single'
  // Could be multi-text like "A、C、D" written out — try comma-split
  return 'single'
}

function normalizeAnswerLetter(answerText, options, type) {
  if (type === 'judgement') {
    const c = answerText.replace(/[\.。、\s]/g, '')
    return c === '正确' || c === '对' ? '正确' : '错误'
  }
  const cleaned = answerText.replace(/[\.。、\s]/g, '').toUpperCase()
  if (/^[A-E]+$/.test(cleaned)) return cleaned.split('').sort().join('')
  // Text answer → match option
  const norm = s => s.replace(/[\.。、\s]/g, '').toLowerCase()
  const match = options.find(o => norm(o.text) === norm(answerText))
  return match ? match.key : cleaned
}

// ---------- Prompt building ----------
function buildPrompt(q, categoryName) {
  const type = q.type
  const correctKey = q.correctKey
  const correctOpts = [...correctKey].map(k => q.options.find(o => o.key === k)).filter(Boolean)
  const wrongOpts = q.options.filter(o => !correctKey.includes(o.key))

  const optLines = q.options.map(o => `${o.key}. ${o.text}`).join('\n')
  const correctDesc = correctOpts.map(o => `${o.key}. ${o.text}`).join(' / ')

  let template
  if (type === 'judgement') {
    template = `**考点**：<10-25字具体知识点>

**标签**：<3-5个标签，用 · 分隔>

**判断依据**：<为什么是这个判断，2-4句话>

**易错点**：<常见错误认知或易混淆点，1-2句话>`
  } else {
    template = `**考点**：<10-25字具体知识点>

**标签**：<3-5个标签，用 · 分隔>

**正确答案**：<正确选项字母. 选项文本 — 一句话解释为什么对>

**干扰项分析**：
${wrongOpts.length > 0
  ? wrongOpts.map(o => `- ${o.key}. ${o.text.length > 30 ? o.text.slice(0, 30) + '…' : o.text} — <为什么错，一句话>`).join('\n')
  : '<无干扰项>'
}

**拓展**：<1-2句相关背景，如时间、人物、影响>`
  }

  return `你是${categoryName}考试题库的解析编写专家。请为下面的${type === 'single' ? '单选' : type === 'multi' ? '多选' : '判断'}题生成结构化解析。

【题干】
${q.stem}

【选项】
${optLines}

【正确答案】${correctDesc || correctKey}

【输出格式】（严格按以下 markdown 输出，不要任何其他文字，不要 \`\`\` 代码块包裹）
${template}

【要求】
1. 解释要具体、准确，紧扣本题考点，不要通用套话
2. 干扰项分析只列错误选项，每个错误选项一句话说明为什么错
3. 标签用 · 分隔，3-5 个，关键词级别的（如"鸦片战争 · 半殖民地半封建社会 · 南京条约"）
4. 用简体中文，简明扼要
5. 直接输出 markdown，不要前缀说明`
}

// ---------- API call ----------
async function enrich(q, categoryName) {
  const prompt = buildPrompt(q, categoryName)
  let lastErr
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const resp = await client.messages.create({
        model: MODEL,
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      })
      const text = (resp.content || [])
        .filter(b => b.type === 'text')
        .map(b => b.text)
        .join('')
        .trim()
      return text
    } catch (e) {
      lastErr = e
      const status = e?.status || e?.response?.status
      if (status === 429 || status >= 500) {
        await sleep(1500 * (attempt + 1))
        continue
      }
      throw e
    }
  }
  throw lastErr
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

// ---------- Validate AI output ----------
function isValidExplanation(text) {
  if (!text) return false
  if (text.includes('```')) return false
  if (!/\*\*考点\*\*/.test(text)) return false
  return true
}

// ---------- Normalize AI output ----------
// Ensure each section header (**考点**, **标签**, etc.) starts on its own line
// and has a blank line before it (except the first). Strip stray code fences.
function normalizeAiOutput(text) {
  let t = text.replace(/^[\s\n]+/, '').replace(/[\s\n]+$/, '')
  // Ensure each **section** starts on its own line
  t = t.replace(/\s*(\*\*(?:考点|标签|正确答案|干扰项分析|判断依据|易错点|拓展)\*\*)/g, '\n\n$1')
  // Collapse 3+ newlines to 2
  t = t.replace(/\n{3,}/g, '\n\n').trim()
  return t
}

// ---------- Idempotency ----------
function isAlreadyEnriched(explanationLines) {
  return explanationLines.some(l => /\*\*\s*考点\s*[：:]/.test(l.replace(/^>\s*/, '')))
}

// ---------- Main ----------
async function processFile(spec) {
  const abs = path.resolve(ROOT, spec.path)
  const original = fs.readFileSync(abs, 'utf-8')
  const eol = original.includes('\r\n') ? '\r\n' : '\n'
  const lines = original.split(eol)

  const blocks = findBlocks(lines, spec)
  console.log(`\n=== ${spec.name} ===`)
  console.log(`  ${blocks.length} questions found in scope`)

  let processed = 0, skipped = 0, failed = 0
  const targets = limitFlag > 0 ? blocks.slice(0, limitFlag) : blocks

  // To avoid rewriting file after every question, collect replacements and apply once at end.
  // Track as: array of { startLine, endLine, newLines[] }
  const replacements = []
  const concurrency = 4
  let cursor = 0

  async function worker() {
    while (cursor < targets.length) {
      const myIdx = cursor++
      const block = targets[myIdx]
      const parsed = parseBlock(lines, block, spec)
      if (!parsed) { skipped++; continue }
      const type = detectType(parsed.answerText, parsed.options || [])
      // Skip fill-in-blank questions (no options AND not judgement). The parsers drop these too.
      const isFillInBlank = (parsed.options || []).length < 2 && type !== 'judgement'
      if (isFillInBlank) {
        if (process.env.DEBUG_SKIP) console.log(`  [skip ${spec.name}#${myIdx + 1}] fill-in-blank opts=${parsed.options?.length} stem="${parsed.stem?.slice(0, 40) || ''}"`)
        skipped++; continue
      }
      if (parsed.explanationLines.length === 0) {
        if (process.env.DEBUG_SKIP) console.log(`  [skip ${spec.name}#${myIdx + 1}] no explanation`)
        skipped++; continue
      }
      if (!force && isAlreadyEnriched(parsed.explanationLines)) { skipped++; continue }

      const correctKey = normalizeAnswerLetter(parsed.answerText, parsed.options || [], type)
      if (!correctKey) { skipped++; continue }

      const categoryName = { party: '中国共产党党史', military: '高校军事理论', history: '中国近现代史纲要' }[spec.name]
      const label = `[${spec.name}#${myIdx + 1}]`

      try {
        const enriched = await enrich({
          stem: parsed.stem,
          options: parsed.options,
          type,
          correctKey,
        }, categoryName)

        if (!isValidExplanation(enriched)) {
          console.log(`  ✗ ${label} invalid output: ${enriched.slice(0, 100)}`)
          failed++
          continue
        }

        const normalized = normalizeAiOutput(enriched)

        // Build new explanation block. Preserve the leading "**解析**：" or "**解析：**" marker
        // from the original file so we don't fight the existing parser's regex.
        const origFirstLine = lines[parsed.expStartAbs].replace(/^>\s*/, '')
        let prefix
        if (/^\*\*解析[：:]/.test(origFirstLine.trim())) {
          // history style: **解析：** ...
          prefix = '**解析：**'
        } else {
          // party / military style: **解析**：...
          prefix = '**解析**：'
        }

        const newLines = [prefix, ...normalized.split('\n').map(l => l.trimEnd())]

        replacements.push({ startLine: parsed.expStartAbs, endLine: parsed.expEndAbs, newLines })

        processed++
        if (processed % 10 === 0) console.log(`  ✓ ${processed} enriched`)
      } catch (e) {
        console.log(`  ✗ ${label} API error: ${e.message?.slice(0, 120)}`)
        failed++
      }

      // Tiny delay between calls within a worker
      await sleep(150)
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()))

  // Apply replacements in DESCENDING line order so earlier replacements don't shift later indices.
  replacements.sort((a, b) => b.startLine - a.startLine)
  for (const r of replacements) {
    lines.splice(r.startLine, r.endLine - r.startLine, ...r.newLines)
  }

  if (replacements.length > 0) {
    fs.writeFileSync(abs, lines.join(eol), 'utf-8')
  }

  console.log(`  ✓ enriched: ${processed} | skipped: ${skipped} | failed: ${failed} | written: ${replacements.length > 0}`)
  return { processed, skipped, failed }
}

async function main() {
  console.log(`Model: ${MODEL}\nBase URL: ${BASE_URL}`)
  console.log(`Mode: ${limitFlag > 0 ? `limit=${limitFlag} per file` : 'full'}${force ? ' +force' : ''}${onlyFlag ? ` +only=${onlyFlag}` : ''}`)

  const specs = onlyFlag ? FILES.filter(s => s.name === onlyFlag) : FILES
  if (specs.length === 0) {
    console.error(`✗ no file matched --only ${onlyFlag}`)
    process.exit(1)
  }

  const summary = { processed: 0, skipped: 0, failed: 0 }
  for (const spec of specs) {
    const r = await processFile(spec)
    summary.processed += r.processed
    summary.skipped += r.skipped
    summary.failed += r.failed
  }

  console.log(`\n=== DONE ===`)
  console.log(`Total enriched: ${summary.processed} | skipped: ${summary.skipped} | failed: ${summary.failed}`)
}

main().catch(e => {
  console.error('Fatal:', e)
  process.exit(1)
})

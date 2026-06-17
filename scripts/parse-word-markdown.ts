import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

type SubType = 'kana-to-kanji' | 'kanji-to-kana'

interface RawOption {
  key: string
  text: string
  isCorrect: boolean
  annotation: string
}

interface RawSubQuestion {
  subType: SubType
  prompt: string
  options: RawOption[]
  answerKey: string
}

interface RawEntry {
  lesson: number
  num: number
  headword: string
  kanjiForm: string
  kanaForm: string
  translation: string
  subs: RawSubQuestion[]
}

function stripCorrectMark(text: string): { text: string; isCorrect: boolean } {
  const m = text.match(/^(.+?)\s*✅\s*$/)
  if (m) return { text: m[1].trim(), isCorrect: true }
  return { text: text.trim(), isCorrect: false }
}

function parseEntryHeader(line: string): { num: number; headword: string; kanjiForm: string; kanaForm: string; translation: string } | null {
  const m = line.match(/^###\s+(\d+)\.\s+(.+)$/)
  if (!m) return null
  const num = parseInt(m[1], 10)
  const rest = m[2].trim()
  const braIdx = rest.search(/[（(]/)
  let kanjiForm = ''
  let afterBra = rest
  if (braIdx >= 0) {
    kanjiForm = rest.slice(0, braIdx).trim()
    afterBra = rest.slice(braIdx)
  } else {
    kanjiForm = rest
  }
  let kanaForm = ''
  const kanaMatch = afterBra.match(/[（(]([^）)]+)[）)]/)
  if (kanaMatch) kanaForm = kanaMatch[1].trim()
  let translation = ''
  const dashIdx = rest.indexOf('—')
  if (dashIdx >= 0) {
    translation = rest.slice(dashIdx + 1).trim()
  }
  return { num, headword: rest, kanjiForm, kanaForm, translation }
}

function parseSubQuestionHeader(line: string): { subType: SubType; prompt: string } | null {
  const m = line.match(/^\*\*[AB]\.\s*(给假名选汉字|给汉字选假名)[：:]\s*(.+?)\*\*\s*$/)
  if (!m) return null
  const subType: SubType = m[1] === '给假名选汉字' ? 'kana-to-kanji' : 'kanji-to-kana'
  return { subType, prompt: m[2].trim() }
}

function parseOptionLine(line: string): RawOption | null {
  const m = line.match(/^-\s+([A-D])[\.、\s]+(.+?)\s*$/)
  if (!m) return null
  let body = m[2].trim()
  let annotation = ''
  const annoMatch = body.match(/【(.+?)】/)
  if (annoMatch) {
    annotation = annoMatch[1].trim()
    body = body.replace(/【.+?】/, '').trim()
  }
  const { text, isCorrect } = stripCorrectMark(body)
  return { key: m[1], text, isCorrect, annotation }
}

function parseFile(filePath: string, sourceFile: string): RawEntry[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const entries: RawEntry[] = []
  let currentLesson = 0
  let currentEntry: RawEntry | null = null
  let currentSub: RawSubQuestion | null = null

  const lines = content.split(/\r?\n/)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    const lessonMatch = trimmed.match(/^##\s+第(\d+)课/)
    if (lessonMatch) {
      currentLesson = parseInt(lessonMatch[1], 10)
      if (currentSub && currentEntry) {
        currentEntry.subs.push(currentSub)
        currentSub = null
      }
      if (currentEntry) {
        entries.push(currentEntry)
        currentEntry = null
      }
      continue
    }

    const header = parseEntryHeader(trimmed)
    if (header) {
      if (currentSub && currentEntry) {
        currentEntry.subs.push(currentSub)
        currentSub = null
      }
      if (currentEntry) entries.push(currentEntry)
      currentEntry = {
        lesson: currentLesson,
        num: header.num,
        headword: header.headword,
        kanjiForm: header.kanjiForm,
        kanaForm: header.kanaForm,
        translation: header.translation,
        subs: [],
      }
      continue
    }

    const subHeader = parseSubQuestionHeader(trimmed)
    if (subHeader) {
      if (currentSub && currentEntry) currentEntry.subs.push(currentSub)
      currentSub = { subType: subHeader.subType, prompt: subHeader.prompt, options: [], answerKey: '' }
      continue
    }

    const opt = parseOptionLine(trimmed)
    if (opt && currentSub) {
      currentSub.options.push(opt)
      if (opt.isCorrect) currentSub.answerKey = opt.key
      continue
    }
  }

  if (currentSub && currentEntry) currentEntry.subs.push(currentSub)
  if (currentEntry) entries.push(currentEntry)

  return entries
}

interface EnrichedQuestion {
  id: string
  category: 'word'
  groupId: string
  groupTitle: string
  numberInGroup: number
  stem: string
  options: { key: string; text: string }[]
  answerKey: string
  answerText: string
  translation: string
  explanation: string
  grammarPoints: string[]
  tags: string[]
  source: { file: string; group: string; position: number }
  status: 'ready'
  subType: SubType
  headword: string
}

function buildQuestion(entry: RawEntry, sub: RawSubQuestion, position: number, sourceFile: string): EnrichedQuestion {
  const lesson = entry.lesson
  const idSuffix = sub.subType === 'kana-to-kanji' ? 'a' : 'b'
  const id = `w${lesson}-${String(entry.num).padStart(3, '0')}-${idSuffix}`
  const groupId = `w${lesson}`
  const groupTitle = `第${lesson}课`

  const stem = sub.subType === 'kana-to-kanji'
    ? `假名 → 汉字｜${sub.prompt}`
    : `汉字 → 假名｜${sub.prompt}`

  const options = sub.options.map(o => ({ key: o.key, text: o.text }))
  const answerOpt = sub.options.find(o => o.key === sub.answerKey)
  const answerText = answerOpt?.text || ''

  const direction = sub.subType === 'kana-to-kanji' ? '汉字写法' : '假名读音'
  let explanation = `考察「${entry.headword}」的${direction}。中文意思：${entry.translation || '—'}。`

  const wrongOpts = sub.options.filter(o => o.key !== sub.answerKey && o.annotation)
  if (wrongOpts.length > 0) {
    const label = sub.subType === 'kana-to-kanji' ? '读音' : '对应的汉字'
    const refs = wrongOpts.map(o => `${o.key}. ${o.text} → ${o.annotation}`)
    explanation += ` 其他选项的${label}：${refs.join('；')}`
  }

  const tags = ['单词', `第${lesson}课`, sub.subType === 'kana-to-kanji' ? '选汉字' : '选假名']

  return {
    id,
    category: 'word',
    groupId,
    groupTitle,
    numberInGroup: entry.num,
    stem,
    options,
    answerKey: sub.answerKey,
    answerText,
    translation: entry.translation,
    explanation,
    grammarPoints: [],
    tags,
    source: { file: sourceFile, group: groupTitle, position },
    status: 'ready',
    subType: sub.subType,
    headword: entry.headword,
  }
}

function hasDuplicateOptions(sub: RawSubQuestion): boolean {
  const texts = sub.options.map(o => o.text)
  return new Set(texts).size !== texts.length
}

function main() {
  const files = [
    { path: path.resolve(__dirname, '../data/raw/日语汉字单词选择题-第26-28课.md'), label: '日语汉字单词选择题-第26-28课.md' },
    { path: path.resolve(__dirname, '../data/raw/日语汉字单词选择题-第28-31课.md'), label: '日语汉字单词选择题-第28-31课.md' },
    { path: path.resolve(__dirname, '../data/raw/日语汉字单词选择题-第32-36课.md'), label: '日语汉字单词选择题-第32-36课.md' },
  ]

  const questions: EnrichedQuestion[] = []
  const reportLines: string[] = []
  let positionCounter = 0
  let totalRawEntries = 0
  let skippedEntries = 0
  const skipped: { file: string; lesson: number; num: number; reason: string }[] = []

  for (const f of files) {
    if (!fs.existsSync(f.path)) {
      reportLines.push(`⚠ 文件不存在: ${f.path}`)
      continue
    }
    const entries = parseFile(f.path, f.label)
    reportLines.push(`📂 ${f.label}: 解析到 ${entries.length} 条原始条目`)
    totalRawEntries += entries.length

    for (const entry of entries) {
      if (entry.subs.length !== 2) {
        skipped.push({ file: f.label, lesson: entry.lesson, num: entry.num, reason: `子题数=${entry.subs.length}（期望 2）` })
        skippedEntries++
        continue
      }
      // 子题级独立校验：只跳过有问题的子题，保留另一个完好的子题
      const subLabels = ['A', 'B'] as const
      for (let si = 0; si < entry.subs.length; si++) {
        const sub = entry.subs[si]
        const lbl = subLabels[si]
        if (sub.options.length !== 4) {
          skipped.push({ file: f.label, lesson: entry.lesson, num: entry.num, reason: `${lbl} 选项数=${sub.options.length}` })
          skippedEntries++
          continue
        }
        if (hasDuplicateOptions(sub)) {
          skipped.push({ file: f.label, lesson: entry.lesson, num: entry.num, reason: `${lbl} 选项存在完全相同项` })
          skippedEntries++
          continue
        }
        if (!sub.answerKey) {
          skipped.push({ file: f.label, lesson: entry.lesson, num: entry.num, reason: `${lbl} 缺少答案标记` })
          skippedEntries++
          continue
        }
        positionCounter++
        questions.push(buildQuestion(entry, sub, positionCounter, f.label))
      }
    }
  }

  const ids = questions.map(q => q.id)
  const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i)

  const groups: Record<string, number[]> = {}
  for (const q of questions) {
    if (!groups[q.groupId]) groups[q.groupId] = []
    groups[q.groupId].push(q.numberInGroup)
  }

  reportLines.unshift(`总原始条目: ${totalRawEntries}`)
  reportLines.push(`跳过条目: ${skippedEntries} / ${totalRawEntries}`)
  reportLines.push(`收录题目: ${questions.length} (条目数 × 2)`)
  if (dupIds.length) reportLines.push(`⚠ 重复 ID: ${[...new Set(dupIds)].join(', ')}`)
  if (skipped.length > 0) {
    reportLines.push('--- 跳过明细 ---')
    for (const s of skipped) reportLines.push(`  ${s.file} · 第${s.lesson}课 #${s.num}: ${s.reason}`)
  }
  reportLines.push('--- 题组分布 ---')
  for (const [gid, nums] of Object.entries(groups)) {
    reportLines.push(`  ${gid}: ${nums.length} 题`)
  }
  reportLines.push('✅ 校验完成')

  const outPath = path.resolve(__dirname, '../public/word-question-bank.json')
  const reportPath = path.resolve(__dirname, '../data/processed/word-validation-report.json')

  fs.writeFileSync(outPath, JSON.stringify(questions, null, 2), 'utf-8')
  fs.writeFileSync(reportPath, JSON.stringify({
    report: reportLines,
    generatedAt: new Date().toISOString(),
    count: questions.length,
    skippedCount: skippedEntries,
    skipped,
  }, null, 2), 'utf-8')

  console.log(reportLines.join('\n'))
  console.log(`\n输出: ${outPath} (${questions.length} 题)`)
}

main()

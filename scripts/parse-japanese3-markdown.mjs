import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
import { validateQuestions } from './japanese3-validation.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = 'data/raw/japanese3/vocabulary-37-43.md'
const lines = fs.readFileSync(path.join(ROOT, SOURCE), 'utf8').split(/\r?\n/)
const entries = []
let current, sub, lesson, header
for (const line of lines) {
  const match = line.match(/^## 第(\d+)课$/)
  if (match) {
    lesson = Number(match[1])
    continue
  }
  if (line.startsWith('### ')) {
    header = line
    continue
  }
  if (line.startsWith('词条：')) {
    const entry = JSON.parse(line.slice(3))
    assert(entry.lesson === lesson, '词条课次不符章节')
    assert(
      header === `### ${entry.number}. ${entry.written}（${entry.kana}）—${entry.translation}`,
      '词条表记不符标题',
    )
    current = { entry, questions: [] }
    entries.push(current)
    continue
  }
  const question = line.match(/^\*\*[AB]\. (给假名选汉字|给汉字选假名)：(.+)\*\*$/)
  if (question) {
    assert(current, '孤立子题')
    sub = {
      subType: question[1] === '给假名选汉字' ? 'kana-to-kanji' : 'kanji-to-kana',
      prompt: question[2],
      options: [],
      answerKey: '',
      explanation: '',
    }
    current.questions.push(sub)
    continue
  }
  const option = line.match(/^- ([A-D])\. (.+?)( ✅)?$/)
  if (option) {
    assert(sub, '孤立选项')
    const isCorrect = Boolean(option[3])
    sub.options.push({ key: option[1], text: option[2], isCorrect, rationale: '由可信源解析提供' })
    if (isCorrect) sub.answerKey = option[1]
    continue
  }
  if (line.startsWith('解析：')) {
    assert(sub, '孤立解析')
    sub.explanation = line.slice(3).replace(/<br>/g, '\n')
  }
}
assert(entries.length > 0, '空可信源')
const pool = entries.map(({ entry }) => entry)
const seen = new Set()
const bank = []
for (const { entry, questions } of entries) {
  assert(!seen.has(entry.entryId), `重复词条: ${entry.entryId}`)
  seen.add(entry.entryId)
  try {
    validateQuestions(entry, questions, pool)
  } catch (err) {
    throw new Error(`${entry.entryId}: ${err.message}`)
  }
  for (const q of questions) {
    const toWritten = q.subType === 'kana-to-kanji'
    bank.push({
      id: `${entry.entryId}-${toWritten ? 'a' : 'b'}`,
      category: 'japanese3',
      groupId: `w${entry.lesson}`,
      groupTitle: `第${entry.lesson}课`,
      numberInGroup: entry.number,
      stem: `${toWritten ? '假名 → 汉字' : '汉字 → 假名'}｜${q.prompt}`,
      options: q.options.map(({ key, text }) => ({ key, text })),
      answerKey: q.answerKey,
      answerText: toWritten ? entry.written : entry.kana,
      translation: entry.translation,
      explanation: q.explanation,
      grammarPoints: [],
      tags: ['单词', `第${entry.lesson}课`, toWritten ? '选汉字' : '选假名'],
      source: {
        file: SOURCE,
        group: `第${entry.lesson}课`,
        position: bank.length + 1,
        pages: [entry.sourcePage],
      },
      status: 'ready',
      answerProvenance: 'generated',
      sourceNotes: [
        'OCR及出题：StepFun step-5-preview',
        `原PDF第${entry.sourcePage}页`,
        entry.notes,
      ].filter(Boolean),
      subType: q.subType,
      headword: `${entry.written}（${entry.kana}）—${entry.translation}`,
    })
  }
}
const groups = Object.fromEntries(
  Array.from({ length: 7 }, (_, i) => [
    `w${i + 37}`,
    bank.filter((q) => q.groupId === `w${i + 37}`).length,
  ]),
)
assert(
  Object.values(groups).every((n) => n > 0),
  '37–43课覆盖不完整',
)
const report = {
  source: SOURCE,
  entries: entries.length,
  questions: bank.length,
  groups,
  issues: [],
}
fs.writeFileSync(
  path.join(ROOT, 'public/japanese3-question-bank.json'),
  JSON.stringify(bank, null, 2) + '\n',
)
console.log(JSON.stringify(report, null, 2))

import assert from 'node:assert/strict'

export const SUB_TYPES = ['kana-to-kanji', 'kanji-to-kana']
const normalize = (s) => s.normalize('NFKC').replace(/\s+/g, '')
const kanaReading = (s) =>
  normalize(s).replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))

export function normalizeQuestion(entry, q) {
  const expected = q.subType === 'kana-to-kanji' ? entry.kana : entry.written
  // Only remove known question wrappers around the exact model-supplied word.
  const wrapped = q.prompt?.match(
    /^「(.+)」(?:の漢字表記はどれですか。|の読みはどれですか。|对应的写法是？|的读音是？)$/,
  )
  return wrapped?.[1] === expected ? { ...q, prompt: expected } : q
}

export function validateEntry(entry) {
  assert(entry.lesson >= 37 && entry.lesson <= 43, '课次超出37–43')
  assert(
    entry.entryId === `w${entry.lesson}-${String(entry.number).padStart(3, '0')}`,
    '词条ID/课次不符',
  )
  for (const key of ['written', 'kana', 'translation']) {
    assert(typeof entry[key] === 'string' && entry[key].trim(), `${key} 为空`)
  }
  assert(!/\p{Script=Han}/u.test(entry.kana), 'kana 含汉字')
  assert(Number.isInteger(entry.sourcePage), '缺少原始PDF页码')
}

export function validateQuestions(entry, questions, pool) {
  validateEntry(entry)
  assert(Array.isArray(questions) && questions.length === 2, '必须恰好两道双向题')
  assert.deepEqual(
    questions.map((q) => q.subType).sort(),
    [...SUB_TYPES].sort(),
    '双向题型不全/重复',
  )
  for (const q of questions) {
    const toWritten = q.subType === 'kana-to-kanji'
    assert(q.prompt === (toWritten ? entry.kana : entry.written), '题干不符词条')
    assert(Array.isArray(q.options) && q.options.length === 4, '选项数不是4')
    assert.deepEqual(q.options.map((o) => o.key).sort(), ['A', 'B', 'C', 'D'], '选项键异常')
    assert(
      q.options.every((o) => typeof o.text === 'string' && o.text.trim()),
      '选项为空',
    )
    assert(new Set(q.options.map((o) => normalize(o.text))).size === 4, '选项重复')
    const correct = q.options.filter((o) => o.isCorrect)
    assert(correct.length === 1 && correct[0].key === q.answerKey, '唯一答案/answerKey不符')
    assert(correct[0].text === (toWritten ? entry.written : entry.kana), '答案不符词条')
    assert(typeof q.explanation === 'string' && q.explanation.trim(), '缺少模型解析')
    for (const option of q.options) {
      assert(typeof option.rationale === 'string' && option.rationale.trim(), '缺少选项说明')
      assert(
        !/[A-D][项是为、．.)）]|选项[A-D]/.test(option.rationale),
        '选项说明依赖字母，洗牌会错位',
      )
      if (!toWritten) assert(!/\p{Script=Han}/u.test(option.text), '假名选项含汉字')
      if (option.isCorrect) continue
      if (!toWritten) {
        assert(kanaReading(option.text) !== kanaReading(entry.kana), '假名干扰项为等价读音')
      } else {
        const homophones = pool.filter(
          (e) =>
            normalize(e.written) === normalize(option.text) &&
            kanaReading(e.kana) === kanaReading(entry.kana),
        )
        assert(homophones.length === 0, '干扰项与答案同读音，需要消歧')
      }
    }
  }
}

export function displayExplanation(q) {
  // Refer to option text so explanations remain valid after frontend shuffling.
  const correct = q.options.find((o) => o.isCorrect)
  const others = q.options.filter((o) => !o.isCorrect)
  return `「${correct.text}」：${correct.rationale}\n\n其他选项：\n${others.map((o) => `「${o.text}」：${o.rationale}`).join('\n')}`
}

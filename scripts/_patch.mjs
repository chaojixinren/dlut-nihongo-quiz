import fs from 'fs'
const path = 'scripts/enrich-explanations.mjs'
let s = fs.readFileSync(path, 'utf-8')
// Remove stray } in the split regex
s = s.replace(/\(\?=\[A-E\]\[\\\.、）\)\]\)\}/, '(?=[A-E][\\.\\u3001\\uff09)])')
fs.writeFileSync(path, s)
console.log('done')
console.log(s.match(/const parts = .*/)?.[0])

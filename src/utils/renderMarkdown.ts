import { marked } from 'marked'

// Strip inline markdown for plain-text contexts (search, truncation)
export function stripMarkdown(md: string): string {
  return md
    .replace(/\*\*([^*]+?)\*\*/g, '$1')
    .replace(/\*([^*]+?)\*\*/g, '$1')
    .replace(/`([^`]+?)`/g, '$1')
    .replace(/\[([^\]]+?)\]\([^)]+?\)/g, '$1')
    .replace(/\n/g, ' ')
}

const mdCache = new Map<string, string>()

// Render markdown to safe HTML
export function renderMarkdown(md: string): string {
  const cached = mdCache.get(md)
  if (cached) return cached
  const result = marked.parse(md, { async: false }) as string
  mdCache.set(md, result)
  return result
}

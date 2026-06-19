import { marked } from 'marked'

// Strip inline markdown for plain-text contexts (search, truncation)
export function stripMarkdown(md: string): string {
  return md
    .replace(/\*\*([^*]+?)\*\*/g, '$1')
    .replace(/\*([^*]+?)\*/g, '$1')
    .replace(/`([^`]+?)`/g, '$1')
    .replace(/\[([^\]]+?)\]\([^)]+?\)/g, '$1')
    .replace(/\n/g, ' ')
}

// Render markdown to safe HTML
export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string
}

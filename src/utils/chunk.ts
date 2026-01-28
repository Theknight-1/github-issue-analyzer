export function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}


export function truncate(text: string, maxLength = 500) {
  if (!text) return "";
  return text.length > maxLength
    ? text.slice(0, maxLength) + "...(truncated)"
    : text;
}

export function truncateForMeta(text: string, maxChars: number) {
  const normalized = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (!normalized) return '';
  if (normalized.length <= maxChars) return normalized;

  const room = Math.max(1, maxChars - 1); // reserve for ellipsis
  let cut = normalized.slice(0, room);

  // Prefer ending on a word boundary.
  const withoutPartialWord = cut.replace(/\s+\S*$/, '').trim();
  if (withoutPartialWord.length >= Math.floor(maxChars * 0.6)) cut = withoutPartialWord;

  return `${cut}…`;
}


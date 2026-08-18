export function getChapterColor(chapter?: string) {
  if (chapter === 'justice') {
    return 'secondary';
  }
  if (chapter === 'inclusion') {
    return 'tertiary';
  }
  return 'primary';
}

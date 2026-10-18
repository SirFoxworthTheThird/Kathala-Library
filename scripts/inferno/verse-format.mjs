// Kathala recognizes multiline verse when every line is indented.
// Prefix exactly two spaces; decoding removes only that presentation prefix.
export const formatVerse = text => text.split('\n').map(line => `  ${line}`).join('\n')
export function sourceVerse(text) {
  return text.split('\n').map(line => {
    if (!line.startsWith('  ')) throw Error('Missing verse presentation prefix')
    return line.slice(2)
  }).join('\n')
}

export function webpDimensions(bytes) {
  if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') throw new Error('Not WebP')
  const chunk = bytes.toString('ascii', 12, 16)
  if (chunk === 'VP8 ') return [bytes.readUInt16LE(26) & 0x3fff, bytes.readUInt16LE(28) & 0x3fff]
  if (chunk === 'VP8L') return [1 + bytes[21] + ((bytes[22] & 0x3f) << 8), 1 + ((bytes[22] >> 6) | (bytes[23] << 2) | ((bytes[24] & 0xf) << 10))]
  if (chunk === 'VP8X') return [1 + bytes.readUIntLE(24, 3), 1 + bytes.readUIntLE(27, 3)]
  throw new Error(`Unsupported WebP chunk ${chunk}`)
}

export const webpWidth = bytes => webpDimensions(bytes)[0]
export const webpHeight = bytes => webpDimensions(bytes)[1]

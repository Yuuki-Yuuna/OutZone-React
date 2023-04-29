export const computedFileSize = (byte?: number | null) => {
  let size = '-'
  if (typeof byte == 'number') {
    if (byte < 1024) {
      size = byte + 'B'
    } else if (byte < 1024 ** 2) {
      size = (byte / 1024).toFixed(1) + 'K'
    } else if (byte < 1024 ** 3) {
      size = (byte / 1024 / 1024).toFixed(1) + 'M'
    } else {
      size = (byte / 1024 / 1024 / 1024).toFixed(1) + 'G'
    }
  }
  return size
}

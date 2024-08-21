const decodeUint8ArrayToBase64 = (uint8Array: Uint8Array) => {
  const binaryString = Array.from(uint8Array, function (byte) {
    return String.fromCharCode(byte)
  }).join('')
  return btoa(binaryString)
}

const addBase64Prefix = (base64: string): string =>
  `data:image/jpeg;base64,${base64}`

export { decodeUint8ArrayToBase64, addBase64Prefix }

const decodeUint8ArrayToBase64 = (uint8Array: Uint8Array) => {
  const binaryString = Array.from(uint8Array, function (byte) {
    return String.fromCharCode(byte)
  }).join('')
  return btoa(binaryString)
}

const convertBase64ToBinaryData = (base64Image: string): Uint8Array => {
  const base64Data = base64Image.split(',')[1]
  const binaryString = atob(base64Data)
  const binaryData = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++)
    binaryData[i] = binaryString.charCodeAt(i)
  return binaryData
}

const addBase64Prefix = (base64: string): string =>
  `data:image/jpeg;base64,${base64}`

export { addBase64Prefix, decodeUint8ArrayToBase64, convertBase64ToBinaryData }

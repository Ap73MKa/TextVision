const fromUint8ArrayToBase64 = (uint8Array: Uint8Array) => {
  const binaryString = Array.from(uint8Array, function (byte) {
    return String.fromCharCode(byte)
  }).join('')
  return btoa(binaryString)
}

const fromBase64ToBinaryData = (base64Image: string): Uint8Array => {
  const base64Data = base64Image.split(',')[1]
  const binaryString = atob(base64Data)
  const binaryData = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++)
    binaryData[i] = binaryString.charCodeAt(i)
  return binaryData
}

const fromFileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result)
      else reject(new Error('Failed to read file as a Data URL'))
    }
    reader.onerror = reject
  })

const fromBase64ToFile = async (
  base64: string,
  fileName?: string
): Promise<File> => {
  const res: Response = await fetch(base64)
  const blob: Blob = await res.blob()
  return new File([blob], fileName ?? 'untitled', { type: 'image/png' })
}

const addBase64Prefix = (base64: string): string =>
  `data:image/jpeg;base64,${base64}`

export {
  addBase64Prefix,
  fromBase64ToBinaryData,
  fromFileToBase64,
  fromUint8ArrayToBase64,
  fromBase64ToFile,
}

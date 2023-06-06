import { documentArrowUp } from 'solid-heroicons/solid'
import { Icon } from 'solid-heroicons'
import recognizeText from '@/utils/recognizeText'
import { RecordType } from '@/shared/RecordType'
import { addRecord } from '@/utils/database'
import { addRecordStore, setSelectedRecord } from '@/stores/recordsStore'
import { selectedLanguages } from '@/stores/languageStore'
import { toast } from 'solid-toast'
import { createSignal, onCleanup, onMount } from 'solid-js'
import { listen } from '@tauri-apps/api/event'
import { fs } from '@tauri-apps/api'

export default function BrowseButton() {
  const [isVisible, setIsVisible] = createSignal(false)
  const [isDrag, setIsDrag] = createSignal(false)

  const handleUpload = async (base64Data: string, fileName: string) => {
    const text = await toast.promise(recognizeText(base64Data), {
      loading: 'Loading',
      success: 'Success',
      error: 'An error occurred 😔',
    })
    const recordData: RecordType = {
      id: Date.now(),
      text: text,
      name: fileName,
      dataURL: base64Data,
      createDate: new Date(),
    }
    await addRecord(recordData)
    addRecordStore(recordData)
    setSelectedRecord(recordData)
  }

  function decodeUint8ArrayToBase64(uint8Array: Uint8Array) {
    const binaryString = Array.from(uint8Array, function (byte) {
      return String.fromCharCode(byte)
    }).join('')
    return btoa(binaryString)
  }

  // eslint-disable-next-line solid/reactivity
  listen('tauri://file-drop', async (event: { payload: string[] }) => {
    if (isVisible()) {
      setIsDrag(false)
      const [file_path] = event.payload
      const fileName = file_path.split(/[\\/]/).pop() as string
      const file = await fs.readBinaryFile(file_path)
      const base64Data = `data:image/jpeg;base64,${decodeUint8ArrayToBase64(
        file
      )}`
      await handleUpload(base64Data, fileName)
    }
  }).then()

  listen('tauri://file-drop-hover', () => {
    setIsDrag(true)
  }).then()

  listen('tauri://file-drop-cancelled', () => {
    setIsDrag(false)
  }).then()

  onCleanup(() => setIsVisible(false))
  onMount(() => setIsVisible(true))

  const handleFileChange = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file && selectedLanguages().length > 0) {
      const reader = new FileReader()
      reader.onload = async () => {
        console.log(reader.result as string)
        await handleUpload(reader.result as string, file.name)
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <div class="flex h-32 w-60 flex-col items-center justify-center gap-4 rounded-xl border border-gray-300 bg-gray-100 pr-4 text-gray-500 transition-colors hover:border-sky-900/[.20] hover:bg-sky-100 hover:text-sky-900">
      {isDrag() ? (
        <div class="w-full animate-pulse">
          <p class="pl-3 text-center text-2xl font-bold">Drop your file</p>
        </div>
      ) : (
        <label for="doc" class="flex w-full items-center">
          <Icon path={documentArrowUp} class="h-24 w-24" />
          <div>
            <p class="text-2xl font-bold">Browse file</p>
            <p class="text-sm">.jpg, .png, .web</p>
          </div>
          <input
            type="file"
            id="doc"
            name="doc"
            onChange={handleFileChange}
            accept="image/*,.png,.jpg,.web"
            hidden
          />
        </label>
      )}
    </div>
  )
}

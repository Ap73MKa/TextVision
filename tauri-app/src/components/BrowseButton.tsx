import { documentArrowUp } from 'solid-heroicons/solid'
import { Icon } from 'solid-heroicons'
import recognizeText from '@/utils/recognizeText'
import { RecordType } from '@/shared/RecordType'
import { addRecord } from '@/utils/database'
import { addRecordStore, setSelectedRecord } from '@/stores/recordsStore'
import { selectedLanguages } from '@/stores/languageStore'
import { toast } from 'solid-toast'

export default function BrowseButton() {
  const handleFileLoad = async (file: File) => {
    const reader = new FileReader()
    reader.onload = async () => {
      const imageData = reader.result as string
      const recognizePromise = recognizeText(imageData)
      const text = await toast.promise(recognizePromise, {
        loading: 'Loading',
        success: 'Success',
        error: 'An error occurred 😔',
      })
      const photoData: RecordType = {
        id: Date.now(),
        text: text,
        name: file.name,
        dataURL: imageData,
        createDate: new Date(),
      }
      await addRecord(photoData)
      addRecordStore(photoData)
      setSelectedRecord(photoData)
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file && selectedLanguages().length > 0) await handleFileLoad(file)
  }
  return (
    <div class="flex h-32 flex-col items-center justify-center gap-4 rounded-xl border border-gray-300 bg-gray-100 pr-4 text-gray-500 transition-colors hover:border-sky-900/[.20] hover:bg-sky-100 hover:text-sky-900">
      <label for="doc" class="flex items-center">
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
    </div>
  )
}

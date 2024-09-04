import { open } from '@tauri-apps/plugin-dialog'
import { readFile } from '@tauri-apps/plugin-fs'
import { type Component, createSignal } from 'solid-js'

import {
  addBase64Prefix,
  decodeUint8ArrayToBase64,
} from '~/shared/lib/image-decode'
import { Button, type ButtonProps } from '~/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/shared/ui/dialog'
import ImageEditor from '~/widgets/image-editor/image-editor'

const BrowserFileButton: Component<ButtonProps> = (props) => {
  // const browseImage = async () => {
  //   const toastId = 'browse-file'
  //   try {
  //     const file = await open({
  //       title: 'Browse image',
  //       filters: [{ name: 'Images', extensions: ['jpeg', 'png', 'web2'] }],
  //       multiple: false,
  //     })
  //     if (!file) return
  //     toast.loading('Loading...', { id: toastId })

  //     const result = await processPhoto(file.path)
  //     const blocks = processTextBlocks(result.data.blocks ?? [])

  //     const newRecordId = await db.records.add({
  //       name: file.name ?? 'unnamed',
  //       text: result.data.text,
  //       path: file.path,
  //       blocks: blocks,
  //       createDt: new Date(),
  //     })

  //     const newRecord = await db.records.get(newRecordId)
  //     if (newRecord) setSelectedRecord(newRecord)

  //     toast.success('Success', { id: toastId })
  //   } catch {
  //     toast.error('Error', { id: toastId })
  //   }
  // }

  const [imageContent, setImageContent] = createSignal<string>('')
  const [isDialogOpen, setIsDialogOpen] = createSignal<boolean>(false)

  const processPhoto = async (filePath: string): Promise<string> => {
    const content = await readFile(filePath)
    return addBase64Prefix(decodeUint8ArrayToBase64(content))
  }

  const browseImage = async () => {
    try {
      const file = await open({
        title: 'Browse image',
        filters: [{ name: 'Images', extensions: ['jpeg', 'png', 'web2'] }],
        multiple: false,
      })
      if (!file) return
      const content = await processPhoto(file.path)
      setImageContent(content)
      setIsDialogOpen(true)
      console.log(isDialogOpen())
    } catch {
      // pass
    }
  }

  // const processPhoto = async (filePath: string): Promise<RecognizeResult> => {
  //   const content = await readFile(filePath)
  //   const base64Data = addBase64Prefix(decodeUint8ArrayToBase64(content))
  //   return readTextFromImage(base64Data)
  // }

  // const processTextBlocks = (blocks: Block[]): TextBox[] =>
  //   blocks.map((block) => {
  //     return {
  //       boxText: block.text,
  //       width: Math.abs(block.bbox.x0 - block.bbox.x1),
  //       height: Math.abs(block.bbox.y0 - block.bbox.y1),
  //       x0: block.bbox.x0,
  //       y0: block.bbox.y0,
  //     }
  //   })

  // const readTextFromImage = async (
  //   base64Data: string
  // ): Promise<RecognizeResult> => {
  //   const worker = await createWorker('eng')
  //   const ret = await worker.recognize(base64Data)
  //   await worker.setParameters({ tessedit_pageseg_mode: PSM.SPARSE_TEXT })
  //   await worker.terminate()
  //   return ret
  // }

  return (
    <>
      <Button onClick={() => void browseImage()} {...props}>
        {props.children}
      </Button>
      <Dialog
        open={isDialogOpen()}
        onOpenChange={(value) => setIsDialogOpen(value)}
      >
        <DialogContent class="max-w-screen-lg">
          <DialogHeader>
            <DialogTitle>Image Editor</DialogTitle>
          </DialogHeader>
          <ImageEditor image={imageContent()} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BrowserFileButton

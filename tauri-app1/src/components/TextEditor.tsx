// @ts-expect-error Solid-codemirror .d.ts dismiss
import { createCodeMirror, createEditorControlledValue } from 'solid-codemirror'
import { selectedRecord, updateRecordStore } from '@/stores/recordsStore.ts'
import { EditorView, lineNumbers } from '@codemirror/view'
import { createEffect, createSignal } from 'solid-js'
import { RecordType } from '@/shared/RecordType.ts'
import { updateRecord } from '@/utils/database.ts'
import { debounce } from '@solid-primitives/scheduled'

export default function TextEditor() {
  const [editorRecordId, setEditorRecordId] = createSignal(selectedRecord()?.id)
  const [code, setCode] = createSignal(selectedRecord()?.fileText ?? '')
  const {
    ref: editorRef,
    editorView,
    createExtension,
  } = createCodeMirror({
    onValueChange: setCode,
  })
  createEffect(() => {
    setEditorRecordId(selectedRecord()?.id)
    setCode(selectedRecord()?.fileText ?? '')
  })
  createEditorControlledValue(editorView, code)
  createExtension(EditorView.lineWrapping)
  createExtension(() => lineNumbers())

  const updateRecordNow = async (record: RecordType) => {
    await updateRecord(record)
    updateRecordStore(record)
  }

  const debouncedUpdate = debounce(updateRecordNow, 600)

  createEffect(() => {
    const currentRecord = selectedRecord()
    if (!editorRecordId || !currentRecord) return
    if (currentRecord.fileText === code()) return
    if (currentRecord.id !== editorRecordId()) return
    debouncedUpdate({
      ...currentRecord,
      blocks: Array.from(currentRecord.blocks, (proxyObject) => ({
        ...proxyObject,
      })),
      fileText: code(),
    })
  })
  return (
    <div
      ref={editorRef}
      class="h-full w-full overflow-y-auto dark:bg-stone-900"
    />
  )
}

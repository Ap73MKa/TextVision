// @ts-expect-error Solid-codemirror .d.ts dismiss
import { createCodeMirror, createEditorControlledValue } from 'solid-codemirror'
import { selectedRecord } from '@/stores/recordsStore.ts'
import { EditorView, lineNumbers } from '@codemirror/view'
import { createEffect, createSignal } from 'solid-js'

export default function TextEditor() {
  const [code, setCode] = createSignal(selectedRecord()?.text ?? '')
  const [showLineNumber] = createSignal(true)
  const {
    ref: editorRef,
    editorView,
    createExtension,
  } = createCodeMirror({
    onValueChange: setCode,
  })
  createEffect(() => setCode(selectedRecord()?.text ?? ''))
  createEditorControlledValue(editorView, code)
  createExtension(EditorView.lineWrapping)
  createExtension(() => (showLineNumber() ? lineNumbers() : []))

  return (
    <div ref={editorRef} class="h-full w-full overflow-y-auto dark:bg-black" />
  )
}

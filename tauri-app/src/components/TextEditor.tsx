import { createCodeMirror } from 'solid-codemirror'
import { selectedRecord } from '@/stores/recordsStore.ts'
import { EditorView, lineNumbers } from '@codemirror/view'
import { createSignal } from 'solid-js'

export default function TextEditor() {
  const [showLineNumber] = createSignal(true)
  const { ref: editorRef, createExtension } = createCodeMirror({
    value: selectedRecord()?.text,
  })
  const lineWrapping = EditorView.lineWrapping
  createExtension(lineWrapping)
  createExtension(() => (showLineNumber() ? lineNumbers() : []))

  return <div ref={editorRef} class="flex h-full overflow-y-auto" />
}

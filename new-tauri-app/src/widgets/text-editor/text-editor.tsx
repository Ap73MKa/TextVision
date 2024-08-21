import type { Component } from 'solid-js'

type TextEditorProps = { text: string }

const TextEditor: Component<TextEditorProps> = (props) => {
  return (
    <textarea
      value={props.text}
      placeholder="Recognized text..."
      class="size-full resize-none bg-transparent focus:outline-none"
    />
  )
}

export default TextEditor

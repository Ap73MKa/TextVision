import {
  ColorModeProvider,
  ColorModeScript,
  cookieStorageManagerSSR,
} from '@kobalte/core'
import { JSXElement } from 'solid-js'

export default function ThemeProvider(props: { children: JSXElement }) {
  const storageManager = cookieStorageManagerSSR(document.cookie)
  return (
    <>
      <ColorModeScript storageType={storageManager.type} />
      <ColorModeProvider storageManager={storageManager}>
        {props.children}
      </ColorModeProvider>
    </>
  )
}

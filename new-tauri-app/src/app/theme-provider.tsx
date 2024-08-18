import {
  ColorModeProvider,
  ColorModeScript,
  createLocalStorageManager,
} from "@kobalte/core";
import type { ParentComponent } from "solid-js";

const ThemeProvider: ParentComponent = (props) => {
  const storageManager = createLocalStorageManager("vite-ui-theme");
  return (
    <>
      <ColorModeScript storageType={storageManager.type} />
      <ColorModeProvider storageManager={storageManager}>
        {props.children}
      </ColorModeProvider>
    </>
  );
};

export default ThemeProvider;

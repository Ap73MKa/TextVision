/* @refresh reload */
import { render } from "solid-js/web";
import { MainPage } from "~/pages/main";
import ThemeProvider from "./theme-provider";
import "./styles.css";

render(
  () => (
    <ThemeProvider>
      <MainPage />
    </ThemeProvider>
  ),
  document.getElementById("root") as HTMLElement,
);

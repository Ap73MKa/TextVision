/* @refresh reload */
import { render } from "solid-js/web";

import "@/app/styles.css";
import App from "./App";

render(() => <App />, document.getElementById("root") as HTMLElement);

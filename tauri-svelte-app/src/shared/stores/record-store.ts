import { writable } from "svelte/store";
import type { ImageRecord } from "../db";

const selectedRecord = writable<ImageRecord | undefined>(undefined)

export { selectedRecord }

import { uuidv4 } from "../utils/common"
import { readSyncedStorage, persistSyncedStorage } from "../utils/storage"

export const defaultPromptSetting = {
  cppSelectedPromptID: "default",
}

export type PromptSetting = typeof defaultPromptSetting
export async function readPromptSetting(): Promise<PromptSetting> {
  const setting = await readSyncedStorage(Object.keys(defaultPromptSetting))
  if (!setting) return defaultPromptSetting
  return setting as PromptSetting
}

export async function persistPromptSetting(setting: Partial<PromptSetting>) {
  await persistSyncedStorage(setting)
}

export const defaultPrompt = {
  id: "default",
  name: "Default",
  body: "",
  pattern: "{&temperature}{&max_tokens}\n{&prompt}\n{&context}",
  showOnToolbar: true,
  timecreated: "",
}

export const getPromptTemplate = (): Prompt => {
  return {
    id: uuidv4(),
    name: "Unnamed prompt",
    body: "",
    pattern: "{&temperature}{&max_tokens}\n{&prompt}\n{&context}",
    showOnToolbar: true,
    timecreated: new Date().toISOString(),
  }
}

export type Prompt = typeof defaultPrompt
export type PromptList = { [id: string]: Prompt }
export async function getPromptList(): Promise<PromptList> {
  const raw = await readSyncedStorage("cppPrompt")
  if (!raw || Object.keys(raw).length === 1) return {}
  return raw.cppPrompt as PromptList
}

export async function persistPromptList(list: PromptList) {
  const record = {cppPrompt: list}
  await persistSyncedStorage(record)
}

export async function readPrompt(id: string): Promise<Prompt | undefined> {
  const list = await getPromptList()
  return list[id]
}

export async function persistPrompt(prompt: Prompt) {
  const list = await getPromptList()
  list[prompt.id] = prompt
  await persistPromptList(list)
}

export async function destroyPrompt(id: string): Promise<PromptList> {
  const list = await getPromptList()
  delete list[id]
  await persistPromptList(list)
  return list
}
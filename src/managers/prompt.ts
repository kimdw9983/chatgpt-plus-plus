import { uuidv4 } from "../utils/common"
import { getSyncedStorage, setSyncedStorage } from "../utils/storage"

export const defaultPromptSetting = {
  cppSelectedPromptID: "default",
}

export type PromptSetting = typeof defaultPromptSetting
export async function getPromptSetting(): Promise<PromptSetting> {
  const setting = await getSyncedStorage(Object.keys(defaultPromptSetting))
  if (!setting) return defaultPromptSetting
  return setting as PromptSetting
}

export async function saveUserConfig(setting: Partial<PromptSetting>) {
  await setSyncedStorage(setting)
}

export const defaultPrompt = {
  id: "default",
  name: "Default",
  body: "",
  pattern: "{&temperature}{&max_tokens}\n{&prompt}\n{&context}",
  showOnToolbar: true
}

export const getPromptTemplate = (): Prompt => {
  return {
    id: uuidv4(),
    name: "Unnamed prompt",
    body: "",
    pattern: "{&temperature}{&max_tokens}\n{&prompt}\n{&context}",
    showOnToolbar: true
  }
}

export type Prompt = typeof defaultPrompt
export type PromptList = { [id: string]: Prompt }
export async function getPromptList(): Promise<PromptList> {
  const raw = await getSyncedStorage("cppPrompt")
  if (!raw) return {}
  return raw.cppPrompt as PromptList
}

export async function savePromptList(list: PromptList) {
  const record = {cppPrompt: list}
  await setSyncedStorage(record)
}

export async function getPrompt(id: string): Promise<Prompt | undefined> {
  const list = await getPromptList()
  return list[id]
}

export async function savePrompt(prompt: Prompt) {
  const list = await getPromptList()
  list[prompt.id] = prompt
  await savePromptList(list)
}

export async function destroyPrompt(id: string): Promise<PromptList> {
  const list = await getPromptList()
  delete list[id]
  await savePromptList(list)
  return list
}
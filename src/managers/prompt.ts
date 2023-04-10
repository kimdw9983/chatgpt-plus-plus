import { getSyncedStorage, setSyncedStorage } from "../utils/storage"

export const defaultPromptSetting = {
  cppSelectedPromptID: "default",
  cppShowOnToolbar: true,
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
}

export type Prompt = typeof defaultPrompt

export async function getPromptList(): Promise<Prompt[]> {
  const raw = await getSyncedStorage("cppPrompt") as Prompt[]
  if (!raw) return [defaultPrompt]
  return raw
}

export async function getPrompt(id: string): Promise<Prompt | undefined> {
  const raw = await getSyncedStorage("cppPrompt") as Prompt[]
  if (!raw) return undefined
  return raw.find(prompt => prompt.id === id)
}
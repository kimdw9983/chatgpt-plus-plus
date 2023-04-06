import { getSyncedStorage, setSyncedStorage } from "../utils/storage"

export const defaultUserConfig = {
  cppTemperature: 1,
  cppMaxTokens: 2048,
  cppPromptID: "empty",
}

export type UserConfig = typeof defaultUserConfig

export async function getUserConfig(): Promise<UserConfig> {
  const config = await getSyncedStorage(Object.keys(defaultUserConfig))
  if (!config) return defaultUserConfig
  return config as UserConfig
}

export async function saveUserConfig(config: Partial<UserConfig>) {
  await setSyncedStorage(config)
}
import { getSyncedStorage, setSyncedStorage } from "../utils/storage"

export const defaultUserConfig = {
  cppTemperature: 1,
  cppTemperatureEnabled: false,
  cppMaxTokens: 2048,
  cppMaxTokensEnabled: false,
  cppPromptID: "empty",
}

export type UserConfig = typeof defaultUserConfig

export async function getUserConfig(): Promise<UserConfig> {
  const config = await getSyncedStorage(Object.keys(defaultUserConfig)) as UserConfig
  if (!config) return defaultUserConfig
  return config
}

export async function saveUserConfig(config: Partial<UserConfig>) {
  await setSyncedStorage(config)
}
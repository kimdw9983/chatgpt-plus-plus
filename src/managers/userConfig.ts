import { readSyncedStorage, persistSyncedStorage } from "../utils/storage"

export const defaultUserConfig = {
  cppTemperature: 1,
  cppTemperatureEnabled: false,
  cppMaxTokens: 2048,
  cppMaxTokensEnabled: false,
  cppPromptID: "default",
  cppPresencePenalty: 0,
  cppPresencePenaltyEnabled: false,
  cppFrequencyPenalty: 0,
  cppFrequencyPenaltyEnabled: false,
  cppLanguage: "English",
  cppLanguageEnabled: false,
  //TODO: make UI/model for logit_bias, best_of, n, logprobs(what even is this?)
}

export type UserConfig = typeof defaultUserConfig

export async function getUserConfig(): Promise<UserConfig> {
  const config = await readSyncedStorage(Object.keys(defaultUserConfig)) as UserConfig
  if (!config) return defaultUserConfig
  return config
}

export async function saveUserConfig(config: Partial<UserConfig>) {
  await persistSyncedStorage(config)
}
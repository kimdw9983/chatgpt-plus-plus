import { UserConfig, defaultUserConfig } from './userConfig'
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
  pattern: "{&temperature}{&max_tokens}{&presence_penalty}{&frequency_penalty}Don't explain about parameters I set.\n{&prompt}{&language}\n{&context}",
  showOnToolbar: true,
  timecreated: "",
}

export const getPromptTemplate = (): Prompt => {
  const id = uuidv4()

  return {
    id: id,
    name: id,
    body: "",
    pattern: defaultPrompt.pattern,
    showOnToolbar: true,
    timecreated: new Date().toISOString(),
  }
}

export type Prompt = typeof defaultPrompt
export type PromptList = { [id: string]: Prompt }
export async function readPromptList(): Promise<PromptList> {
  const raw = await readSyncedStorage("cppPrompt")
  if (!raw || !raw.cppPrompt || Object.keys(raw.cppPrompt).length === 1) return {} 
  return raw.cppPrompt as PromptList
}

export async function persistPromptList(list: PromptList) {
  const record = {cppPrompt: list}
  await persistSyncedStorage(record)
}

export async function readPrompt(id: string): Promise<Prompt | undefined> {
  const list = await readPromptList()
  return list[id]
}

export async function persistPrompt(prompt: Prompt) {
  const list = await readPromptList()
  list[prompt.id] = prompt
  await persistPromptList(list)
}

export async function destroyPrompt(id: string): Promise<PromptList> {
  const list = await readPromptList()
  delete list[id]
  await persistPromptList(list)
  return list
}

export async function resolvePattern(prompt: Prompt): Promise<string> {
  const userConfig = await readSyncedStorage(Object.keys(defaultUserConfig)) as UserConfig
  const mapping: Record<string, string> = {
    "{&temperature}": userConfig.cppTemperatureEnabled ? `temperature ${userConfig.cppTemperature} ` : "",
    "{&max_tokens}": userConfig.cppMaxTokensEnabled? `max_tokens ${userConfig.cppMaxTokens} ` : "",
    "{&presence_penalty}": userConfig.cppPresencePenaltyEnabled? `presence_penalty ${userConfig.cppPresencePenalty} ` : "",
    "{&frequency_penalty}": userConfig.cppFrequencyPenaltyEnabled? `frequency_penalty ${userConfig.cppFrequencyPenalty} ` : "",
    "{&language}": userConfig.cppLanguageEnabled? `in ${userConfig.cppLanguage}` : "",
    "{&prompt}": prompt.body,
    "{&context}": "'Your message on chat'",
  }

  return Object.keys(mapping).reduce((str, keyword) => {
    return str.replaceAll(keyword, mapping[keyword])
  }, prompt.pattern)
}

export function sortBytimeCreated(a: Prompt, b: Prompt) {
  const defaultComesFirst = -1
  return (new Date(a.timecreated).getTime() || defaultComesFirst) - (new Date(b.timecreated).getTime() || defaultComesFirst)
}

export const languages_list = [
  "Afrikaans",
  "Albanian",
  "Amharic",
  "Arabic",
  "Aragonese",
  "Armenian",
  "Asturian",
  "Azerbaijani",
  "Basque",
  "Belarusian",
  "Bengali",
  "Bosnian",
  "Breton",
  "Bulgarian",
  "Catalan",
  "Central Kurdish",
  "Chinese",
  "Chinese (Hong Kong)",
  "Chinese (Simplified)",
  "Chinese (Traditional)",
  "Corsican",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "English",
  "English (Australia)",
  "English (Canada)",
  "English (India)",
  "English (New Zealand)",
  "English (South Africa)",
  "English (United Kingdom)",
  "English (United States)",
  "Esperanto",
  "Estonian",
  "Faroese",
  "Filipino",
  "Finnish",
  "French",
  "French (Canada)",
  "French (France)",
  "French (Switzerland)",
  "Galician",
  "Georgian",
  "German",
  "German (Austria)",
  "German (Germany)",
  "German (Liechtenstein)",
  "German (Switzerland)",
  "Greek",
  "Guarani",
  "Gujarati",
  "Hausa",
  "Hawaiian",
  "Hebrew",
  "Hindi",
  "Hungarian",
  "Icelandic",
  "Indonesian",
  "Interlingua",
  "Irish",
  "Italian",
  "Italian (Italy)",
  "Italian (Switzerland)",
  "Japanese",
  "Kannada",
  "Kazakh",
  "Khmer",
  "Korean",
  "Kurdish",
  "Kyrgyz",
  "Lao",
  "Latin",
  "Latvian",
  "Lingala",
  "Lithuanian",
  "Macedonian",
  "Malay",
  "Malayalam",
  "Maltese",
  "Marathi",
  "Mongolian",
  "Nepali",
  "Norwegian",
  "Norwegian Bokmål",
  "Norwegian Nynorsk",
  "Occitan",
  "Oriya",
  "Oromo",
  "Pashto",
  "Persian",
  "Polish",
  "Portuguese",
  "Portuguese (Brazil)",
  "Portuguese (Portugal)",
  "Punjabi",
  "Quechua",
  "Romanian",
  "Romanian (Moldova)",
  "Romansh",
  "Russian",
  "Scottish Gaelic",
  "Serbian",
  "Serbo",
  "Shona",
  "Sindhi",
  "Sinhala",
  "Slovak",
  "Slovenian",
  "Somali",
  "Southern Sotho",
  "Spanish",
  "Spanish (Argentina)",
  "Spanish (Latin America)",
  "Spanish (Mexico)",
  "Spanish (Spain)",
  "Spanish (United States)",
  "Sundanese",
  "Swahili",
  "Swedish",
  "Tajik",
  "Tamil",
  "Tatar",
  "Telugu",
  "Thai",
  "Tigrinya",
  "Tongan",
  "Turkish",
  "Turkmen",
  "Twi",
  "Ukrainian",
  "Urdu",
  "Uyghur",
  "Uzbek",
  "Vietnamese",
  "Walloon",
  "Welsh",
  "Western Frisian",
  "Xhosa",
  "Yiddish",
  "Yoruba",
  "Zulu"
]
import Browser from "webextension-polyfill"

export async function getSyncedStorage(obj: string[]): Promise<Record<string, any>> {
  const config = await Browser.storage.sync.get(obj)
  return config
}

export async function setSyncedStorage(obj: Record<string, any>) {
  await Browser.storage.sync.set(obj)
}
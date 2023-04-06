import Browser from "webextension-polyfill"

export async function getSyncedStorage(obj: string[]): Promise<Record<string, any>> {
  return await Browser.storage.sync.get(obj)
}

export async function setSyncedStorage(obj: Record<string, any>) {
  await Browser.storage.sync.set(obj)
}
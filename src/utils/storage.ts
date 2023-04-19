import Browser from "webextension-polyfill"

export async function readSyncedStorage(obj: string | string[]): Promise<Record<string, any>> {
  return await Browser.storage.sync.get(obj)
}

export async function persistSyncedStorage(obj: Record<string, any>) {
  await Browser.storage.sync.set(obj)
}

export async function testRemoveSyncedStorage(obj: string | string[]): Promise<void> {
  await Browser.storage.sync.remove(obj)
}
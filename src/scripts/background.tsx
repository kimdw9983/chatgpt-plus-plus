import Browser from "webextension-polyfill"

Browser.runtime.onInstalled.addListener(() => [
  Browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    if (changeInfo.url) {
      Browser.tabs.sendMessage(id, { action: "uiPatch" })
    }
  })
])
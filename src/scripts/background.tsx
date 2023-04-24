import Browser from "webextension-polyfill"

const url = "https://chat.openai.com"

Browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  if (!tab || !tab.url || !tab.url.startsWith(url) || changeInfo.status !== 'complete') return
  Browser.tabs.sendMessage(id, { action: "uiPatch" })
})
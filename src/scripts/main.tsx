import Browser from "webextension-polyfill"
import { patch } from "../managers/uiPatch"

window.onload = () => patch()
Browser.runtime.onMessage.addListener((request) => {
  if (request.action === "uiPatch") patch()
})
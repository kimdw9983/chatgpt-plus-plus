import Browser from "webextension-polyfill"
import { waitForPatch } from "../managers/uiPatch"

window.onload = () => waitForPatch()
Browser.runtime.onMessage.addListener((request) => {
  if (request.action === "uiPatch") waitForPatch()
})
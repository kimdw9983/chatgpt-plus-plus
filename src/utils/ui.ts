export const toolbarButtonRight = 36
export const toolbarButtonWidth = 28

export function getInputClassName(className: string): string {
  return className.replace("relative", "absolute").replace(/md:py-3/g, "").replace("flex-grow", "").replace("w-full", "").replace("flex-col", "") + " cpp-toolbar"
}

export function getToolbarWidth(inputContainer: HTMLElement): string {
  return window.getComputedStyle(inputContainer).width
}

export function calculateToolbarPosition(inputContainer: HTMLElement): string {
  return -Number(getToolbarWidth(inputContainer).replace("px", "")) + toolbarButtonRight + toolbarButtonWidth + "px"
}
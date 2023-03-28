export function getInputClassName(className: string): string {
  return className.replace("relative", "absolute").replace(/md:py-3/g, "") + " cpp-toolbar"
}

export function getToolbarWidth(inputContainer: HTMLElement): string {
  return window.getComputedStyle(inputContainer).width
}

export function calculateToolbarPosition(inputContainer: HTMLElement): string {
  return -Number(getToolbarWidth(inputContainer).replace("px", "")) + 36 + 24 + 4 + "px"
}
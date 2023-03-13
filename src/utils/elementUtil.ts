export function getElement(query: string) : HTMLElement {
  return document.querySelector(query) as HTMLElement
}

export function getRootElement(): HTMLDivElement {
  return document.querySelector('div[id="__next"]') as HTMLDivElement
}

export function getInput() : HTMLTextAreaElement {
  return document.querySelector('cpp-textarea') as HTMLTextAreaElement
}

export function getSubmit() : HTMLButtonElement {
  return document.querySelector('cpp-submit') as HTMLButtonElement
}
export function getElement(query: string) : HTMLElement | null {
  return document.querySelector(query)
}

export function getInput() : HTMLTextAreaElement | null {
  return document.querySelector('cpp-textarea')
}

export function getSubmit() : HTMLButtonElement | null {
  return document.querySelector('cpp-submit')
}
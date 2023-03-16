export function getElement(query: string) : HTMLElement {
  return document.querySelector(query) as HTMLElement
}

export function getChatgptRoot(): HTMLDivElement {
  return document.querySelector('div#__next') as HTMLDivElement
}

export function getChatgptInput() : HTMLTextAreaElement { //TODO: log error as this inidcates patch failure
  return document.querySelector('chatgpt-textarea') as HTMLTextAreaElement
}

export function getChatgptSubmit() : HTMLButtonElement {
  return document.querySelector('chatgpt-submit') as HTMLButtonElement
}
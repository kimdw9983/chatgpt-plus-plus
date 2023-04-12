export const uiUtils = {
  toolbarButtonRight: 36,
  toolbarButtonWidth: 28,
  getToolbarWidth(inputContainer: HTMLElement): string {
    return window.getComputedStyle(inputContainer).width
  },
  calculateToolbarPosition(inputContainer: HTMLElement): string {
    return -Number(this.getToolbarWidth(inputContainer).replace("px", "")) + this.toolbarButtonRight + this.toolbarButtonWidth + "px"
  },

  /**
   * Returns ChatGPT-themed box element className
   * 
   * @returns {string} ChatGPT-themed className
   */
  getBoxClassName(): string {
    return "flex border border-black/10 dark:border-gray-900/50 dark:text-white bg-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
  },
  getBoxBorder(): string {
    return "border border-black/10 dark:border-gray-900/50 rounded-md"
  },
}

//Direct svg sources for mdi icons that ChatGPT uses
export const svg = {
  modification() {
    return (
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    )
  },

  trashcan() {
    return (
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
      </svg>
    )
  },

  visible() {
    return ( 
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z"/>
      </svg>
    )
  },

  invisible() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1024 1024">
        <path fill="currentColor" d="M508 624a112 112 0 0 0 112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43zm370.72-458.44L836 122.88a8 8 0 0 0-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 0 0 0 11.31L155.25 889a8 8 0 0 0 11.31 0l712.16-712.12a8 8 0 0 0 0-11.32zM332 512a176 176 0 0 1 258.88-155.28l-48.62 48.62a112.08 112.08 0 0 0-140.92 140.92l-48.62 48.62A175.09 175.09 0 0 1 332 512z"/>
        <path fill="currentColor" d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 0 1 445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5z"/>
      </svg>
    )
  },

  questionMark() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="text-gray-900 dark:text-gray-200">
        <path fill="currentColor" d="M12.025 16q-.6 0-1.012-.425t-.363-1q.075-1.05.5-1.825t1.35-1.6q1.025-.9 1.563-1.563t.537-1.512q0-1.025-.687-1.7T12 5.7q-.8 0-1.363.338t-.912.837q-.35.5-.862.675t-.988-.025q-.575-.25-.787-.825t.087-1.075Q7.9 4.5 9.125 3.75T12 3q2.625 0 4.038 1.462t1.412 3.513q0 1.25-.537 2.138t-1.688 2.012q-.85.8-1.2 1.3t-.475 1.15q-.1.625-.525 1.025t-1 .4ZM12 22q-.825 0-1.413-.588T10 20q0-.825.588-1.413T12 18q.825 0 1.413.588T14 20q0 .825-.588 1.413T12 22Z"/>
      </svg>
    )
  },

  crossMark() {
    return (
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900 dark:text-gray-200" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    )
  },

  plusMark() {
    return (
      <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    )
  },

  instruction() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="text-gray-900 dark:text-gray-200">
        <path fill="currentColor" d="M11 14.17L8.83 12L11 9.83L9.59 8.41L6 12l3.59 3.59zm3.41 1.42L18 12l-3.59-3.59L13 9.83L15.17 12L13 14.17z"/>
        <path fill="currentColor" d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04a2.008 2.008 0 0 0-1.44 1.19c-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55c.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75s-.75-.34-.75-.75s.34-.75.75-.75zM19 15v4H5V5h14v10z"/>
      </svg>
    )
  },

  settings() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
        <path fill="currentColor" d="m9.25 22l-.4-3.2q-.325-.125-.613-.3t-.562-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2h-5.5Zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Z"/>
      </svg>
    )
  }
}
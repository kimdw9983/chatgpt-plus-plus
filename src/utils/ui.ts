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
    return "flex border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
  },

  
}
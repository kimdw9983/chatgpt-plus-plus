import { render } from "preact"
import { StateUpdater, useEffect, useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"

interface DialogTitleProps {
  closeDialog: () => void
  title?: string
}

function DialogTitle(props: DialogTitleProps) {
  return (
    <div className="flex w-full flex-row items-center justify-between border-b py-3 px-4 dark:border-gray-700">
      { props?.title && (<span class="text-base font-semibold sm:text-base">{ props.title }</span>) }
      <button className="text-gray-700 opacity-50 transition hover:opacity-75 dark:text-white" onClick={ props.closeDialog }>❌</button>
    </div>
  )
}

interface DialogProps {
  namespace: string
  state: {isVisible: boolean, setVisible: StateUpdater<boolean>}
  title?: string
  chilren?: JSX.Element
}

function Dialog(props: DialogProps): JSX.Element {
  function closeDialog() {
    props.state.setVisible(false)
  }

  return (<>{props.state.isVisible && (<>
  <div className="fixed w-full h-full inset-0 bg-gray-500/90 transition-opacity dark:bg-gray-800/90 opacity-100" />
  <div className="fixed inset-0 overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 !p-0">
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-gray-900 sm:my-8 sm:w-full !my-0 flex min-h-screen w-full flex-col items-center justify-center !rounded-none !py-0 px-4 pt-5 pb-4 sm:p-6 bg-transparent dark:bg-transparent opacity-100 translate-y-0 sm:scale-100">
        <div className="flex h-full flex-col items-center justify-start">
          <div className="relative">
            <div className="grow justify-center bg-white dark:bg-gray-900 rounded-md flex flex-col items-start overflow-hidden border shadow-md dark:border-gray-700">
              <DialogTitle closeDialog={ closeDialog } title={ props.title } />
              { props.chilren }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>)}</>)
}

function getDialogRoot(): HTMLDivElement {
  let cppDialogRoot = document.querySelector<HTMLDivElement>("#cpp-dialog-root")
  if (!cppDialogRoot) {
    cppDialogRoot = document.createElement('div')
    cppDialogRoot.id = "cpp-dialog-root"
    cppDialogRoot.className = "fixed w-full h-full inset-0"
    cppDialogRoot.style.zIndex = "500"

    document.body.appendChild(cppDialogRoot)
  }
  return cppDialogRoot
}

interface DialogState { [key: string]: {isVisible: boolean, setVisible: StateUpdater<boolean>} }
var dialogStates: DialogState = {}
interface PromptEditProps {
  namespace: string
  title?: string
  body?: JSX.Element
}

function checkVisibility() {
  const cppDialogRoot = getDialogRoot()
  if (!cppDialogRoot) return

  let shouldShow = true
  for (const k in dialogStates) {
    if(dialogStates[k].isVisible) continue
    shouldShow = false
    break
  }
  cppDialogRoot.style.display = shouldShow ? "" : "none"
}

function registerDialog(namespace: string) {
  const [isVisible, setVisible] = useState<boolean>(false)
  
  useEffect(() => {
    dialogStates[namespace] = { isVisible, setVisible }
    checkVisibility()  
  }, [isVisible])

  return { isVisible, setVisible }
}

export default function CppDialog(props: PromptEditProps) {
  const cppDialogRoot = getDialogRoot()
  const { isVisible, setVisible } = registerDialog(props.namespace)

  function openDialog() {
    setVisible(true)
    render(<Dialog namespace={ props.namespace } state={{ isVisible, setVisible }} />, cppDialogRoot)
  }

  return (
    <button onClick={ openDialog }>
      open
    </button>
  )
}
import { render } from "preact"
import { StateUpdater, useEffect, useRef, useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"
import svg from "../../assets/svg"

interface DialogTitleProps {
  closeDialog: () => void
  title?: string
}

function DialogTitle(props: DialogTitleProps) {
  return (
    <div className="flex w-full flex-row items-center justify-between border-b py-3 px-4 dark:border-gray-700">
      { props?.title && (<span class="text-base font-semibold sm:text-base">{ props.title }</span>) }
      <button className="text-gray-700 opacity-50 transition hover:opacity-75 dark:text-white" onClick={ props.closeDialog }>
        <svg.crossMark />
      </button>
    </div>
  )
}

interface DialogState { [key: string]: {isVisible: boolean, setVisible: StateUpdater<boolean>} }
var dialogStates: DialogState = {}

interface DialogProps {
  namespace: string
  title?: string
  body?: JSX.Element
  isVisible: boolean
  setVisible: StateUpdater<boolean>
  onVisibleChange: (isVisible: boolean) => void
  closeOnClickOutside?: boolean | Function
  width?: string
}

function Dialog(props: DialogProps): JSX.Element {
  function closeDialog() {
    props.setVisible(false)
  }

  function clickOutside(){
    if (typeof props.closeOnClickOutside === "function" && props.closeOnClickOutside())closeDialog()
    else if (typeof props.closeOnClickOutside === "boolean" && props.closeOnClickOutside) closeDialog()
  }

  useEffect(() => {
    if (props.onVisibleChange) props.onVisibleChange(props.isVisible)
  }, [props.isVisible])

  return (<>{ props.isVisible && (
  <div className="relative" style={{ zIndex: 500 }}>
    <div className="fixed inset-0 bg-gray-500/90 dark:bg-gray-800/90" style={{ zIndex: 510 }} onClick={ clickOutside }>
      <div className="grid-cols-[10px_minmax(300px,_100%)_10px] md:grid-cols-[60px_minmax(300px,_100%)_60px] grid h-full w-full grid-rows-[minmax(10px,_1fr)_auto_minmax(10px,_1fr)] md:grid-rows-[minmax(20px,_1fr)_auto_minmax(20px,_1fr)] overflow-y-auto">
        <div className="relative col-auto col-start-2 row-auto row-start-2 w-full rounded-lg text-left shadow-xl transition-all left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900" style={{ width: props.width }}>
          <DialogTitle closeDialog={ closeDialog } title={ props.title } />
          { props.body }
        </div>
      </div>
    </div>
  </div>)}</>)
}

function getDialogRoot(): HTMLDivElement {
  let cppDialogRoot = document.querySelector<HTMLDivElement>("#cpp-dialog-root")
  if (!cppDialogRoot) {
    cppDialogRoot = document.createElement('div')
    cppDialogRoot.id = "cpp-dialog-root"
    cppDialogRoot.className = "absolute inset-0"
    cppDialogRoot.style.zIndex = "500"

    document.body.appendChild(cppDialogRoot)
  }
  return cppDialogRoot
}
interface cppDialogProps {
  namespace: string //Namespace to prevent dialog collisions
  title?: string
  children?: JSX.Element
  buttonText: string | JSX.Element
  closeOnClickOutside?: boolean | Function
  width?: string
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

function useDialogState(namespace: string) {
  const [isVisible, setVisible] = useState<boolean>(false)
  dialogStates[namespace] = { isVisible, setVisible }
  
  useEffect(() => { checkVisibility() }, [isVisible])

  return { isVisible, setVisible }
}

export default function CppDialog(props: cppDialogProps) {
  const cppDialogRoot = getDialogRoot()
  const { isVisible, setVisible } = useDialogState(props.namespace)
  const onVisibleChangeRef = useRef<(isVisible: boolean) => void>()

  function onVisibilityChange(isVisible: boolean) {
    if (onVisibleChangeRef.current) onVisibleChangeRef.current(isVisible)
  }

  function openDialog() {
    setVisible(true)
  }

  useEffect(() => {
    if (!cppDialogRoot || !cppDialogRoot?.childNodes || !cppDialogRoot?.childNodes?.length) {
      render((
        <Dialog 
          namespace={ props.namespace } 
          isVisible={ isVisible }
          setVisible={ setVisible }
          onVisibleChange = {(cb) => (onVisibilityChange(cb))}
          title={ props.title }
          body={ props.children }
          width={ props.width }
          closeOnClickOutside={ props.closeOnClickOutside } />), cppDialogRoot)
    } else {
      onVisibilityChange(isVisible)
    }
  })

  return (
    <button onClick={ openDialog }>
      { props.buttonText }
    </button>
  )
}
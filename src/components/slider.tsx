import { JSX } from "preact"
import { StateUpdater, useEffect, useRef, useState } from "preact/hooks"

interface Props {
  min: number
  max: number
  step?: number
  context: { value: number, setValue: StateUpdater<number> }
  enabled?: boolean
  onChange?: (e: any) => void
  inputStyle?: JSX.CSSProperties
  inputClassName?: string
  containerStyle?: JSX.CSSProperties
  containerClassName?: string
  tickLabels?: Array<string>
}

export default function Slider(props: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)
  const [disabled, setDisabled] = useState<boolean>(props?.enabled !== undefined ? !props.enabled : false)

  useEffect(() => {
    setDisabled(props?.enabled !== undefined ? !props.enabled : false)
    if (inputRef.current) {
      console.log(inputRef.current, "present")
      inputRef.current.disabled = props?.enabled !== undefined ? !props.enabled : false
    }
  }, [props?.enabled])

  const onChange = props.onChange ? props.onChange : (e: any) => {
    const value = Number(e.target.value)
    props.context.setValue(value)
  }
  
  const containerDefaultClass = "flex flex-col items-center w-full"
  const containerClassName = `${containerDefaultClass} ${props?.containerClassName}`
  const inputDefaultClass = "h-1 w-full rounded-full bg-gray-300 outline-none appearance-none"
  const inputClassName = `${inputDefaultClass} ${props?.inputClassName ? props.inputClassName : ''}`
  const defaultInputStyle = {}
  const inputStyle = Object.assign({}, defaultInputStyle, props?.inputStyle)

  let ticks: JSX.Element | null = null
  if (props.tickLabels) {
    const labels: Array<JSX.Element> = []
    for(let i = 0; i < props.tickLabels.length; i++) {
      labels.push(<span className={"pointer-events-none select-none"}>{ props.tickLabels[i] }</span>)
    }
    ticks = <div className="flex mt-1 justify-between w-full text-sm">{ labels }</div>
  }

  return (
    <div className={ containerClassName } style={ props?.containerStyle }>
      <input type="range" min={ props.min } max={ props.max } step={ props?.step } value={ props.context.value } onChange={ onChange } className={ inputClassName } style={ inputStyle } ref={ inputRef } />
      { ticks }
    </div>
  )
}


import { JSX } from "preact"
import { StateUpdater } from "preact/hooks"

interface Props {
  min: number
  max: number
  step?: number
  context: { value: number, setValue: StateUpdater<number> }
  onChange?: (e: any) => void
  inputStyle?: JSX.CSSProperties
  inputClassName?: string
  containerStyle?: JSX.CSSProperties
  containerClassName?: string
  tickLabels?: Array<string>
}

export default function Slider(props: Props): JSX.Element {
  const onChange = props.onChange ? props.onChange : (e: any) => {
    const value = Number(e.target.value)
    props.context.setValue(value)
  }
  
  const containerDefaultClass = "flex flex-col items-center w-full"
  const containerClassName = `${containerDefaultClass} ${props?.containerClassName}`
  const inputDefaultClass = "slider appearance-none h-1 w-full rounded-full bg-gray-300 dark:bg-gray-300 outline-none thumb:p-2 thumb:bg-white dark:thumb:bg-gray-500 thumb:shadow-md thumb:appearance-none thumb:outline-none thumb:rounded-full thumb:focus:outline-none thumb:hover:bg-white thumb:hover:shadow-lg transition-all duration-200"
  const inputClassName = `${inputDefaultClass} ${props?.inputClassName}`

  let ticks: JSX.Element | null = null
  if (props.tickLabels) {
    const labels: Array<JSX.Element> = []
    for(let i = 0; i < props.tickLabels.length; i++) {
      labels.push(<span className={"pointer-events-none select-none"}>{ props.tickLabels[i] }</span>)
    }
    ticks = <div className="flex justify-between w-full text-sm">{ labels }</div>
  }


  return (
    <div className={ containerClassName } style={ props?.containerStyle }>
      <input type="range" min={ props.min } max={ props.max } step={ props?.step } value={ props.context.value } onChange={ onChange } className={ inputClassName } style={ props?.containerStyle }/>
      { ticks }
    </div>
  )
}


import { JSX } from "preact"
import { useNumber, Number } from "../hooks/numberContext"

interface Props {
  defaultValue: number
  min: number
  max: number
  context: Number
  onChange?: (e: any) => void
  class?: string
}

export default function Slider(props: Props): JSX.Element {
  const onChange = props.onChange ? props.onChange : (e: any) => {
    console.log(e.target.value)
    props.context.setNumber(e.target.value)
  }

  const defaultClass = "slider appearance-none h-1 w-full rounded-full bg-gray-300 dark:bg-gray-300 outline-none thumb:p-2 thumb:bg-white dark:thumb:bg-gray-500 thumb:shadow-md thumb:appearance-none thumb:outline-none thumb:rounded-full thumb:focus:outline-none thumb:hover:bg-white thumb:hover:shadow-lg transition-all duration-200"
  const className = `${defaultClass} ${props?.class}`

  return (
    <div>
      <input type="range" min={ props.min } max={ props.max } value={ props.defaultValue } onChange={ onChange } className={ className }/>
    </div>
  )
}


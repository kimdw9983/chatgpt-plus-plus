import { JSX } from "preact"
import { StateUpdater } from "preact/hooks"

interface Props {
  min: number
  max: number
  step?: number
  context: { value: number, setValue: StateUpdater<number> }
  onChange?: (e: any) => void
  class?: string
}

export default function Slider(props: Props): JSX.Element {
  const onChange = props.onChange ? props.onChange : (e: any) => {
    const value = Number(e.target.value)
    props.context.setValue(value)
  }

  const defaultClass = "slider appearance-none h-1 w-full rounded-full bg-gray-300 dark:bg-gray-300 outline-none thumb:p-2 thumb:bg-white dark:thumb:bg-gray-500 thumb:shadow-md thumb:appearance-none thumb:outline-none thumb:rounded-full thumb:focus:outline-none thumb:hover:bg-white thumb:hover:shadow-lg transition-all duration-200"
  const className = `${defaultClass} ${props?.class}`

  return (
    <div>
      <input type="range" min={ props.min } max={ props.max } step={ props?.step } value={ props.context.value } onChange={ onChange } className={ className }/>
    </div>
  )
}


import { JSX } from "preact"
import { StateUpdater } from "preact/hooks"

interface Props {
  type: string
  min?: number
  max?: number
  step?: number
  context: { value: any, setValue: StateUpdater<any> }
  onChange?: (e: any) => void
  inputStyle?: JSX.CSSProperties
  inputClassName?: string
  label?: JSX.Element
}
 
export default function InputBox(props: Props): JSX.Element {
  const onChange = props.onChange ? props.onChange : (e: any) => {
    const value = e.target.value
    props.context.setValue(value)
  }

  const defaultClassName = "p-0 text-sm text-gray-900"
  const className = `${defaultClassName} ${props.inputClassName}`
  const step = props.step ? props.step : ""

  return (<>
    { props.label }
    <input type={ props.type } min={ props.min } max={ props.max } step={ step } value={ props.context.value } onChange={ onChange } className={ className } style={ props.inputStyle } />
  </>)
}
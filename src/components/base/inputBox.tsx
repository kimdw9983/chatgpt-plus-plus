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
  labelStyle?: JSX.CSSProperties
  labelClassName?: string
  labelText?: string
  enabled?: boolean
}
 
export default function InputBox(props: Props) {
  const onChange = props?.onChange ? props.onChange : (e: any) => {
    let value = props.type == "checkbox" ? !!e.target.checked : e.target.value
    props.context.setValue(value)
  }

  const disabled = props?.enabled !== undefined ? !props.enabled : false
  const defaultInputClassName = `p-0 text-sm text-gray-900 ${ disabled ? "bg-gray-100 dark:bg-gray-600": "" }`
  const InputClassName = `${defaultInputClassName} ${props.inputClassName}`
  const defaultLabelClassName = "ml-1 text-sm"
  const LabelClassName = `${defaultLabelClassName} ${props.labelClassName}`
  const step = props.step ? props.step : ""

  return (<div>
    <input type={ props.type } min={ props.min } max={ props.max } step={ step } value={ props.context.value } checked={ props.context.value } onChange={ onChange } className={ InputClassName } style={ props.inputStyle } disabled={ disabled } />
    <label className={ LabelClassName } style={ props.labelStyle }>{ props.labelText }</label>
  </div>)
}
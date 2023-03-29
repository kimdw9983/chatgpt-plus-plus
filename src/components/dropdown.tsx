import { JSX } from "preact"

interface Props {
  value: string | number
  onChange: () => void
  options: Array<{ value: string | number, label: string }>
}

export default function Dropdown(props: Props): JSX.Element {
  return (
    <select value={ props.value } onChange={ props.onChange }>
      {props.options.map(({ value, label }) => {
        <option key={ value } value={ value }>{ label }</option>
      })}
    </select>
  )
}
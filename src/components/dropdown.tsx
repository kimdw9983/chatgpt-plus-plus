import { JSX } from "preact"

interface Props {
  value: string | number
  desc?: string | HTMLElement
  onChange: (e: any) => void
  options: Array<{ value: string | number, label: string }>
  class?: string
}

export default function Dropdown(props: Props): JSX.Element {
  const defaultClass = "shadow-sm px-4 pr-8 sm:text-sm focus:outline-none border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
  const className = `${defaultClass} ${props?.class}`

  return (
    <div className="relative block">
      { props?.desc }
      <select className={ className } value={ props.value } onChange={ props.onChange }>
        { props.options.map(({ value, label }) => (
          <option key={ value } value={ value }>{ label }</option>
        )) }
      </select>
    </div>
  )
}
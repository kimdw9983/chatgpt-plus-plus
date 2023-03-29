import { JSX } from "preact"

interface Props {
  defaultValue: number
  min: number
  max: number
  onChange: (e: any) => void
}

export default function Slider(props: Props): JSX.Element {
  return (
    <div class="w-full">
      <input type="range" min={ props.min } max={ props.max } value={ props.defaultValue } onChange={ props.onChange }
      className="slider appearance-none h-3 w-full rounded-full bg-gray-300 dark:bg-gray-700 outline-none thumb:p-2 thumb:bg-white dark:thumb:bg-gray-500 thumb:shadow-md thumb:appearance-none thumb:outline-none thumb:rounded-full thumb:focus:outline-none thumb:hover:bg-white thumb:hover:shadow-lg transition-all duration-200"/>
    </div>
  )
}


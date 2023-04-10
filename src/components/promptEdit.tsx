import { JSX } from "preact/jsx-runtime"

interface PromptEditProps {
  ContainerStyle?: JSX.CSSProperties
  ContainerClassName?: string
}

export default function PromptEdit(props: PromptEditProps) {
  const ContainerStyle = props.ContainerStyle? props.ContainerStyle : {}
  const ContainerClassName = `${props.ContainerClassName}`

  return( 
    <div className={ ContainerClassName } style={ ContainerStyle }>

    </div>
  )
}
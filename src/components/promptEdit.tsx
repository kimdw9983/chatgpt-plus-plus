import { useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"

interface PromptEditProps {
  ContainerStyle?: JSX.CSSProperties
  ContainerClassName?: string
}

function PromptBox(props: { essential?: boolean }) {

}

function PromptList() {
  const [selectedPrompt, setSelectedPromptID] = useState<string>('default')


  return (
    <div>
      <div className="overflow-auto">
        
      </div>
    </div>
  )
}

export default function PromptEdit(props: PromptEditProps) {
  const ContainerStyle = props.ContainerStyle? props.ContainerStyle : {}
  const ContainerClassName = `${props.ContainerClassName}`

  return( 
    <div className={ ContainerClassName } style={ ContainerStyle }>
      
    </div>
  )
}
import { Component, JSX } from "preact"

interface Props {
  popup: JSX.Element
  style?: JSX.CSSProperties
}

interface State {
  hover: boolean
}

class HoverButton extends Component<Props, State> {
  state = { 
    hover: false,
  }
  
  onMouseEnter = () => {
    if (this.state.hover === false) {
      this.setState({ hover: true })
    }
  }

  onMouseOver = () => {
    if (this.state.hover === false) {
      this.setState({ hover: true })
    }
  }

  onMouseLeave = () => {
    if (this.state.hover === true) {
      this.setState({ hover: false })
    }
  }

  render(props: Props, state: State) {
    return (
      <div className={state.hover ? "hover" : "not-hover"} style={props?.style} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseOver={this.onMouseOver}>
        { state.hover === true && props.popup }
      </div>
    )
  }
}

export default HoverButton
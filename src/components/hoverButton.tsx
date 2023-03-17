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

  render() {
    return (
      <div className={this.state.hover ? "hover" : "not-hover"} style={this.props?.style} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseOver={this.onMouseOver}>
        { this.state.hover === true && this.props.popup }
      </div>
    )
  }
}

export default HoverButton
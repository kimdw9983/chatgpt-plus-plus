import { Component, createRef, JSX } from "preact"
import { shallowCompare } from "../utils/common"

interface Props {
  popup: JSX.Element
}

interface State {
  hover: boolean
  isMounted: boolean
}

class HoverButton extends Component<Props, State> {
  ref = createRef()
  state = { 
    hover: false,
    isMounted: false
  }
  
  componentWillUnmount = () => {
    this.setState({ isMounted: false })
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
      <div className={this.state.hover ? "hover" : "not-hover"} style={{ width: '80px', height: '80px'}} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseOver={this.onMouseOver}>
        { this.state.hover === true && this.props.popup }
      </div>
    )
  }
}

export default HoverButton
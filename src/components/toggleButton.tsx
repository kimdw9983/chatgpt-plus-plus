import { Component, JSX } from "preact"

interface Props {
  popup: JSX.Element
  style?: JSX.CSSProperties
}

interface State {
  clicked: boolean
}

class toggleButton extends Component<Props, State> {
  state = { 
    clicked: false 
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  render() {
    return (
      <button onClick={this.handleClick} style={this.props?.style}>
        { this.state.clicked === true && this.props.popup }
      </button>
    )
  }
}

export default toggleButton
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

  render(props: Props, state: State) {
    return (
      <button onClick={this.handleClick} style={props?.style}>
        { state.clicked === true && props.popup }
      </button>
    )
  }
}

export default toggleButton
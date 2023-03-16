import { Component } from "preact"

interface Props {
}

interface State {
  clicked: boolean
}


class MyButton extends Component<Props, State> {
  state = { 
    clicked: false 
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.clicked ? 'Clicked' : 'Unclicked'}
      </button>
    )
  }
}

export default MyButton
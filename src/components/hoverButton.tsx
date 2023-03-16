import { Component, createRef } from "preact"
import { shallowCompare } from "../utils/common"

interface Props {
  // render: (hover: boolean) => any;
}

interface State {
  hover: boolean
  // isMounted: boolean
}

class HoverButton extends Component<Props, State> {
  // ref = createRef()
  state = { 
    hover: false,
    // isMounted: false
  }
  
  // shouldComponentUpdate(nextProps: Props, nextState: State) {
  //   return !shallowCompare(nextProps, this.props) || !shallowCompare(nextState, this.state)
  // }
  
  // componentDidMount() {
  //   this.setState({ isMounted : true })
  //   setTimeout(() => {
  //     if (this.state.isMounted) {
  //       this.setState({ hover: !!this.isHovered() })
  //     }
  //   }, 1)
  // }
  
  // componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {
  //   setTimeout(() => {
  //     if (this.state.isMounted) {
  //       this.setState({ hover: !!this.isHovered() })
  //     }
  //   }, 1)
  // }
  
  // componentWillUnmount() {
  //   this.setState({ isMounted: false })
  // }

  // isHovered() {
  //   return this.ref.current && this.ref.current.matches(':hover')
  // }
  
  onMouseEnter() {
    if (this.state.hover === false) {
      this.setState({ hover: true })
    }
  }

  onMouseOver() {
    if (this.state.hover === false) {
      this.setState({ hover: true })
    }
  }

  onMouseLeave() {
    if (this.state.hover === true) {
      this.setState({ hover: false })
    }
  }

  render() {
    return (
      <div style={{ width: '80px', height: '80px'}} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseOver={this.onMouseOver}>
        { this.state.hover }
      </div>
    )
  }
}

export default HoverButton
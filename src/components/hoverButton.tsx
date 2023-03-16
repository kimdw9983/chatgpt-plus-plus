import { Component } from "preact"
import { shallowCompare } from "../utils/common"

interface Props {
  render: (hover: boolean) => any;
}

interface State {
  hover: boolean
  isMounted: boolean
}

class HoverButton extends Component<Props, State> {
  elementRef: HTMLElement | null = null
  constructor() {
    super()
    this.state = { 
      hover: false, 
      isMounted: false,
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !shallowCompare(nextProps, this.props) || !shallowCompare(nextState, this.state)
  }
  
  componentDidMount() {
    this.setState({ isMounted : true })
    setTimeout(() => {
      if (this.state.isMounted) {
        this.setState({ hover: !!this.isHovered() })
      }
    }, 1)
  }
  
  componentDidUpdate(prevProps: Props, prevState: State, snapshot: any) {
    setTimeout(() => {
      if (this.state.isMounted) {
        this.setState({ hover: !!this.isHovered() })
      }
    }, 1)
  }
  
  componentWillUnmount() {
    this.elementRef = null
    this.setState({ isMounted: false })
  }
  
  isHovered() {
    return this.elementRef && this.elementRef.matches(':hover')
  }
  
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
      <div className={this.state.hover ? 'hover' : 'not-hover'} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseOver={this.onMouseOver}>
        { this.props.render(this.state.hover) }
      </div>
    )
  }
}

export default HoverButton
export default class Basecomponents {
  props;
  state;
  constructor(props) {
    this.props = props;
  }
  render() {}
  setState(newState) {
    this.state = newState;
    this.render();
  }
}

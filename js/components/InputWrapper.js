import Basecomponents from "../Basecomponents.js";

export default class InputWrapper extends Basecomponents {
  render() {
    let $formgroup = document.createElement("div");
    $formgroup.classList.add("form-group");
    let $label = document.createElement("label");
    $label.classList.add("form-label");
    $label.innerHTML = this.props.label;
    let $input = document.createElement("input");
    $input.classList.add("form-control");
    $input.type = this.props.type;
    $input.placeholder = this.props.placeholder;
    $input.value = this.props.value;
    let $message = document.createElement("span");
    $message.classList.add("form-message");
    $message.innerHTML = this.props.message;
    $formgroup.append($label, $input, $message);
    $input.onblur = this.props.onblur;
    $message.classList.add("invalid");
    return $formgroup;
  }
}

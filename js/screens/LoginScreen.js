import validateEmail from "../../ultis.js";
import InputWrapper from "../components/InputWrapper.js";
import { login } from "../../models/users.js";

export default class Login extends InputWrapper {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
        password: "",
      },
      messegeError: {
        email: "",
        password: "",
      },
    };
  }
  handleInput(fieldName, filedValue) {
    let tmpState = this.state;

    if (fieldName == "email" && filedValue) {
      if (!validateEmail(filedValue)) {
        tmpState.messegeError[fieldName] = "Email is false";
        tmpState.data[fieldName] = filedValue.trim();
      } else {
        tmpState.data[fieldName] = filedValue.trim();
      }
    }
    if (fieldName == "password") {
      if (filedValue.trim().length < 6) {
        tmpState.messegeError[fieldName] =
          "The minimum length of password is 6 characters";
      }
    }
    if (filedValue.trim() == "") {
      tmpState.messegeError[fieldName] = "Invalid" + " " + fieldName;
    } else {
      tmpState.messegeError[fieldName] = "";
    }
    tmpState.data[fieldName] = filedValue.trim();

    this.setState(tmpState);
  }

  render() {
    let $container = document.getElementById("contentLogin");
    $container.classList.add("main");

    let $form = document.createElement("form");
    $form.classList.add("form");
    let $formoff = document.createElement("i");
    $formoff.className = "fas fa-times";
    $formoff.onclick = function () {
      $container.style.display = "none";
    };
    let $heading = document.createElement("h1");
    $heading.className = "heading";
    $heading.innerHTML = "Login";
    let $spacer = document.createElement("div");
    $spacer.classList.add("spacer");
    let $button = document.createElement("button");
    $button.classList.add("form-submit");
    $button.innerHTML = "Login";

    let $email = new InputWrapper({
      label: "Email",
      type: "email",
      message: this.state.messegeError.email,
      value: this.state.data.email,
      placeholder: "example@gmail.com",
      onblur: (event) => {
        this.handleInput("email", event.target.value);
      },
    });
    let $password = new InputWrapper({
      label: "Password",
      type: "password",
      message: this.state.messegeError.password,
      value: this.state.data.password,
      placeholder: "123456",
      onblur: (event) => {
        this.handleInput("password", event.target.value);
      },
    });

    let isPassed = true;

    for (const key in this.state.data) {
      if (!this.state.data[key]) {
        isPassed = false;
      }
    }

    for (const key in this.state.messegeError) {
      if (this.state.messegeError[key]) {
        isPassed = false;
      }
    }

    if (isPassed) {
      $button.disabled = false;
      $button.style.backgroundColor = "#f33a58";
    } else {
      $button.disabled = true;
      $button.style.backgroundColor = "rgb(255 99 71 / 50%)";
      $button.style.cursor = "default";
    }
    $form.onsubmit = (event) => {
      event.preventDefault();
      login(this.state.data.email, this.state.data.password);
      let tmpState = this.state;
      tmpState = {
        data: {
          email: "",
          password: "",
        },
        messegeError: {
          email: "",
          password: "",
        },
      };
      this.setState(tmpState);
      return;
    };

    $form.append(
      $formoff,
      $heading,
      $spacer,
      $email.render(),
      $password.render(),
      $button
    );

    $container.innerHTML = "";
    $container.append($form);
    return $container;
  }
}

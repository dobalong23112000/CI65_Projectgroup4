import validateEmail from "../../ultis.js";
import InputWrapper from "../components/InputWrapper.js";

export default class Register extends InputWrapper {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
      messegeError: {
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
    };
  }
  handleInput(fieldName, filedValue) {
    let tmpState = this.state;
    if (filedValue.trim() == "") {
      tmpState.messegeError[fieldName] = "Invalid" + " " + fieldName;
    } else {
      tmpState.messegeError[fieldName] = "";
    }
    tmpState.data[fieldName] = filedValue.trim();
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
    if (fieldName == "confirmpassword") {
      if (filedValue != this.state.data.password) {
        tmpState.messegeError[fieldName] = "Password is incorrect";
      }
    }

    this.setState(tmpState);
  }

  render() {
    let $container = document.getElementById("content");
    $container.classList.add("main");

    let $divmain = document.createElement("div");
    $divmain.classList.add("main");
    let $form = document.createElement("form");
    $form.classList.add("form");
    
    let $heading = document.createElement("h1");
    $heading.classList.add = "heading";
    $heading.innerHTML = "Đăng kí";
    let $spacer = document.createElement("div");
    $spacer.classList.add("spacer");
    let $button = document.createElement("button");
    $button.classList.add("form-submit");
    $button.innerHTML = "Đăng ký";

    let $name = new InputWrapper({
      label: "Name",
      type: "text",
      message: this.state.messegeError.name,
      value: this.state.data.name,
      placeholder: "Username",
      onblur: (event) => {
        this.handleInput("name", event.target.value);
        $container.removeChild($divmain);
      },
    });
    let $email = new InputWrapper({
      label: "Email",
      type: "email",
      message: this.state.messegeError.email,
      value: this.state.data.email,
      placeholder: "example@gmail.com",
      onblur: (event) => {
        this.handleInput("email", event.target.value);
        $container.removeChild($divmain);
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
        $container.removeChild($divmain);
      },
    });
    let $confirmpassword = new InputWrapper({
      label: "Password Confirmation",
      type: "password",
      placeholder: "123456",
      message: this.state.messegeError.confirmpassword,
      value: this.state.data.confirmpassword,
      onblur: (event) => {
        this.handleInput("confirmpassword", event.target.value);
        $container.removeChild($divmain);
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
      //   register(
      //     this.state.data.name,
      //     this.state.data.email,
      //     this.state.data.password
      //   );
      return;
    };

    $form.append(
      $heading,
      $spacer,
      $name.render(),
      $email.render(),
      $password.render(),
      $confirmpassword.render(),
      $button
    );

    $divmain.append($form);
    $container.append($divmain);
    return $container;
  }
}

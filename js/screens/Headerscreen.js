import Basecomponents from "../Basecomponents.js";

export default class Headerscreen extends Basecomponents {
  render() {
    let $head = document.createElement("nav");
    let $main = document.querySelector("#main");
    let $contentLogin = document.querySelector("#contentLogin");
    let $contentRegister = document.querySelector("#contentRegister");
    console.log($main);
    $head.classList.add("head");
    $head.innerHTML = `<a href="" onclick="loadsong()">
    <img src="./img/Logo/LogoMP3.png" alt="">
      </a>
      <input type="search" placeholder="Tìm kiếm bài hát ..." />
      <a href="#" id="login">Đăng nhập</a>
      <h3>/</h3>
      <a href="#" id="register">Đăng ký</a>`;
    let $header = document.querySelector(".header");
    let $Btnregister = $head.querySelector("#register");
    $Btnregister.onclick = function () {
      $contentRegister.style.display = "";
      $contentLogin.style.display = "none";
    };
    let $Btnlogin = $head.querySelector("#login");
    $Btnlogin.onclick = function () {
      $contentLogin.style.display = "";
    };

    $header.append($head);
    $main.append($header);
    return $main;
  }
}

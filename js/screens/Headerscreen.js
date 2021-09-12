import Basecomponents from "../Basecomponents.js";

export default class Headerscreen extends Basecomponents {
  render() {
    let $head = document.createElement("nav");
    let $main = document.querySelector("#main");
    console.log($main);
    $head.classList.add("head");
    $head.innerHTML = `<a href="" onclick="loadsong()">
        <img src="#" />
      </a>
      <input type="search" placeholder="Tìm kiếm bài hát ..." />
      <a href="#" id="login">Đăng nhập</a>
      <h3>/</h3>
      <a href="#" id="register">Đăng ký</a>`;
    let $header = document.querySelector(".header");
    let $Btnregister = $head.querySelector("#register");
    $Btnregister.onclick = function () {
      let $content = document.querySelector("#content");
      $content.style.display = "flex";
      $main.style.opacity = "0.5";
    };

    $header.append($head);
    $main.append($header);
    return $main;
  }
}

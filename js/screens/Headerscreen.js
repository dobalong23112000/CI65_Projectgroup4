import { getCurrentUser } from "../../models/users.js";
import Basecomponents from "../Basecomponents.js";
import listmusicscreen from "./Listmusic.js";

export default class Headerscreen extends listmusicscreen {
  constructor(props) {
    super(props);
    this.state = [];
  }
  render() {
    let $content = document.querySelector("#content");
    let $head = document.createElement("nav");
    let $main = document.querySelector("#main");
    let $contentLogin = document.querySelector("#contentLogin");
    let $contentRegister = document.querySelector("#contentRegister");

    $head.classList.add("head");
    $head.innerHTML = `<a href="" onclick="loadsong()">
    <img src="./img/Logo/LogoMP3.png" alt="">
      </a>
      <div class="input">
      <input class="search"  type="search" placeholder="Tìm kiếm bài hát ..." />
      <i id="search" class="fas fa-search"></i>
      </div>
      <div class="rightheaderuser">
  
  </div>
      <div class="rightheader">
      <a href="#" id="login">Đăng nhập</a>
      <h3>/</h3>
      <a href="#" id="register">Đăng ký</a></div>
      
      `;
    let $righheaderUser = $head.querySelector(".rightheaderuser");
    let $righheader = $head.querySelector(".rightheader");
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        $righheaderUser.style.display = "flex";
        $righheaderUser.innerHTML = `  <h2>Hello, ${user.displayName}</h2>
        <button id="btnlogout">Logout</button>`;
        let $btnLogout = $righheaderUser.querySelector("#btnlogout");
        $btnLogout.onclick = (e) => {
          firebase.auth().signOut();
        };
        $righheader.style.display = "none";
      } else {
        $righheaderUser.style.display = "none";
        $righheader.style.display = "flex";
      }
    });

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
    let $input = $head.querySelector(".search");
    let $search = $head.querySelector("#search");
    let tmpState = this.state;
    $search.onclick = async (e) => {
      let getData = await db.collection("Listmusic").get();
      tmpState = [];
      let isSearch = true;
      $header.removeChild($header.firstChild);
      getData.forEach((element) => {
        if (
          element.data().singer.includes($input.value) ||
          $input.value == element.data().namesong
        ) {
          tmpState.push(element.data());
          isSearch = false;
        }
      });
      if (isSearch) {
        console.log("Khong tim thay bai hat");
      }
      this.setState(tmpState);
    };
    let _newList = new listmusicscreen(this.state);
    $content.innerHTML = "";
    $content.append(_newList.render());

    $header.prepend($head);

    $main.append($header, $content);
    return $main;
  }
}

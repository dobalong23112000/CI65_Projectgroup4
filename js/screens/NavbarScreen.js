import Basecomponents from "../Basecomponents.js";

export default class NavbarScreen extends Basecomponents {
  render() {
    let $header = document.querySelector(".header");
    let $foot = document.createElement("nav");
    $foot.classList.add("foot");
    let $addsong = document.querySelector("#addsong");
    $foot.innerHTML = `<a href="">HOME</a>
        <a href="" >PLAYLIST</a>
        <a href="">BXH</a>
        <a id="listfavourite" href="#/listfavourite" data-navigo>FAVOURITE SONG</a>
        <a href="">SETTINGS</a>
        <button class="button"  type="button">UPLOAD</button>`;
    let $btnUpload = $foot.querySelector(".button");
    let $listfavou = $foot.querySelector("#listfavourite");
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        $btnUpload.style.cursor = "pointer";
        $btnUpload.style.display = "";
        $listfavou.style.display = "";
      } else {
        $btnUpload.style.display = "none";
        $listfavou.style.display = "none";
      }
    });
    $btnUpload.onclick = () => {
      $addsong.style.display = "";
    };

    $header.append($foot);
    return $header;
  }
}

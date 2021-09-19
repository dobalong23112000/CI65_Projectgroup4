import Basecomponents from "../Basecomponents.js";

export default class NavbarScreen extends Basecomponents {
  render() {
    let $header = document.querySelector(".header");
    let $foot = document.createElement("nav");
    $foot.classList.add("foot");
    let $addsong = document.querySelector("#addsong");
    $foot.innerHTML = `<a href="">Home</a>
        <a href="" >Playlist</a>
        <a href="">BXH</a>
        <a href="">Favourite Song</a>
        <a href="">Khac</a>
        <button class="button"  type="button" >Upload</button>`;
    let $btnUpload = $foot.querySelector(".button");
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        $btnUpload.disabled = false;
        $btnUpload.style.cursor = "pointer";
        $btnUpload.style.backgroundColor = "rgba(255, 99, 71, 0.863)";
      } else {
        $btnUpload.disabled = true;
        $btnUpload.style.cursor = "default";
        $btnUpload.style.backgroundColor = "#555";
      }
    });
    $btnUpload.onclick = () => {
      $addsong.style.display = "";
    };

    $header.append($foot);
    return $header;
  }
}

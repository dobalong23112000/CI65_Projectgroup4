import Basecomponents from "../Basecomponents.js";

export default class NavbarScreen extends Basecomponents {
  render() {
    let $header = document.querySelector(".header");
    let $foot = document.createElement("nav");
    $foot.classList.add("foot");
    let $addsong = document.querySelector("#addsong");
    $foot.innerHTML = `<a href="">Xếp hạng</a>
        <a href="" >Việt Nam</a>
        <a href="">US-UK</a>
        <a href="" >Nhạc Hoa</a>
        <a href="">Hàn Quốc</a>
        <button class="button"  type="button" >Upload</button>`;
    let $btnUpload = $foot.querySelector(".button");
    $btnUpload.onclick = () => {
      $addsong.style.display = "";
    };

    $header.append($foot);
    return $header;
  }
}

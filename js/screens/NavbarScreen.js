import Basecomponents from "../Basecomponents.js";

export default class NavbarScreen extends Basecomponents {
  render() {
    let $header = document.querySelector(".header");
    let $foot = document.createElement("nav");
    $foot.classList.add("foot");
    $foot.innerHTML = `<a href="">Xếp hạng</a>
        <a href="" >Việt Nam</a>
        <a href="">US-UK</a>
        <a href="" >Nhạc Hoa</a>
        <a href="">Hàn Quốc</a>
        <button type="submit">Upload</button>`;
    $header.append($foot);
    return $header;
  }
}

import BaseComponents from "../Basecomponents.js";

export default class Songwrapper extends BaseComponents {
  constructor(props) {
    super(props);
    this.state = "music";
  }
  render() {
    let $music = document.createElement("div");

    let $img = document.createElement("img");
    $img.src = this.props.img;
    let $name = document.createElement("h3");
    $name.innerHTML = this.props.name;
    $music.onclick = this.props.onclick;
    $music.classList.add("music");
    $music.append($img, $name);
    return $music;
  }
}

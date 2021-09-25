import Basecomponents from "../Basecomponents.js";
import quickPlayer from "../screens/Quick-player.js";
export class trowfavourite extends Basecomponents {
  constructor(props) {
    super(props);
    this.state = "";
  }
  render() {
    let tr = document.createElement("tr");
    let tdImage = document.createElement("td");
    tdImage.innerHTML = `<img src="${this.props.img}" alt="">`;
    let tdNamesong = document.createElement("td");
    tdNamesong.innerHTML = `${this.props.namesong}`;
    let tdSinger = document.createElement("td");
    tdSinger.innerHTML = `${this.props.singer}`;
    let tdPlay = document.createElement("td");
    tdPlay.innerHTML = `<i class='bx bx-play-circle' id="play">`;
    let $play = tdPlay.querySelector("#play");
    $play.onclick = (e) => {
      this.handleOnclick(this.props);
    };
    let $audio = document.createElement("audio");
    $audio.src = "";
    tdPlay.append($audio);
    let tdfavou = document.createElement("td");
    tdfavou.innerHTML = `<i class='bx bxs-heart' id="like" >`;
    let tddelete = document.createElement("td");
    tddelete.innerHTML = `<i class='bx bxs-trash' id="delete" ></i>`;
    tr.append(tdImage, tdNamesong, tdSinger, tdPlay, tdfavou, tddelete);
    return tr;
  }
  async handleOnclick(infoSong) {
    let audioUrl = await storageRef.child(`${infoSong.audio}`).getDownloadURL();
    let _player = new quickPlayer({
      name: infoSong.namesong,
      img: infoSong.img,
      audio: audioUrl,
    }).render();
  }
}

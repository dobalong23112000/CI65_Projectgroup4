import Songwrapper from "../components/Song.js";

import quickPlayer from "./Quick-player.js";
import Headerscreen from "./Headerscreen.js";

export default class listmusicscreen extends Songwrapper {
  constructor(props) {
    super(props);
    this.state = "";
  }
  render() {
    let $listmusic = document.createElement("div");
    $listmusic.classList.add("listmusic");
    if (this.props.length == 0) {
      db.collection("Listmusic")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let song = new Songwrapper({
              name: doc.data().namesong,
              img: doc.data().img,
              audio: doc.data().audio,
              onclick: (e) => {
                let $active = $listmusic.querySelector(".active");
                if ($active) {
                  $active.classList.remove("active");
                }
                this.setState("active");
                e.target.closest(".music").classList.add(this.state);
                this.handleOnclick(doc.data());
              },
            });
            $listmusic.append(song.render());
          });
        });
    } else {
      for (let i = 0; i < this.props.length; i++) {
        let song = new Songwrapper({
          name: this.props[i].namesong,
          img: this.props[i].img,
          audio: this.props[i].audio,
          onclick: (e) => {
            this.handleOnclick(this.props[i]);
          },
        });
        $listmusic.append(song.render());
      }
    }

    return $listmusic;
  }
  async handleOnclick(infoSong) {
    let audioUrl = await storageRef.child(`${infoSong.audio}`).getDownloadURL();
    let _player = new quickPlayer({
      name: infoSong.namesong,
      img: infoSong.img,
      audio: audioUrl,
    }).render();
    console.log(infoSong.audio);
  }
}

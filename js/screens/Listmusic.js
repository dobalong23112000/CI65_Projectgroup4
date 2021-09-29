import Songwrapper from "../components/Song.js";

import quickPlayer from "./Quick-player.js";
import Headerscreen from "./Headerscreen.js";
import MusicPlayer from "../components/MusicPlayer.js";
import CommentScreen from "./CommentScreen.js";
import RatingScreen from "./Ratingscreen.js";

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
              singer: doc.data().singer,
              name: doc.data().namesong,
              img: doc.data().img,
              audio: doc.data().audio,
              onclick: (e) => {
                this.handleOnclick(doc);
              },
            });
            $listmusic.append(song.render());
          });
        });
    } else {
      console.log(this.props);
      for (let i = 0; i < this.props.length; i++) {
        let song = new Songwrapper({
          id: this.props[i].id,
          singer: this.props[i].data().singer,
          name: this.props[i].data().namesong,
          img: this.props[i].data().img,
          audio: this.props[i].data().audio,
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
    let audioUrl = await storageRef
      .child(`${infoSong.data().audio}`)
      .getDownloadURL();
    let _content = document.querySelector("#content");
    _content.innerHTML = "";
    let _comment = new CommentScreen({
      id: infoSong.id,
    }).render();
    let _player = new MusicPlayer({
      id: infoSong.id,
      name: infoSong.data().namesong,
      img: infoSong.data().img,
      genre: infoSong.data().genre,
      singer: infoSong.data().singer,
      audioUrl: infoSong.data().audio,
      audio: audioUrl,
    }).render();
    let _rating = new RatingScreen({
      id: infoSong.id,
    }).render();
  }
}

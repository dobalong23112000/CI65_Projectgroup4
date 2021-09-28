import Basecomponents from "../Basecomponents.js";

export default class MusicPlayer extends Basecomponents {
  render() {
    console.log(this.props);
    let $musicplayer = document.createElement("div");
    $musicplayer.className = "musicplayer";
    let $content = document.querySelector("#content");
    let $dashboard = document.createElement("div");
    $dashboard.classList.add("dashboard");
    let $left_dashboard = document.createElement("div");
    $left_dashboard.classList.add("left");
    let img_left = document.createElement("img");
    img_left.src = this.props
      ? this.props.img
      : "https://st3.depositphotos.com/3581215/18899/v/1600/depositphotos_188994514-stock-illustration-vector-illustration-male-silhouette-profile.jpg";
    $left_dashboard.append(img_left);
    let $right_dashboard = document.createElement("div");
    $right_dashboard.classList.add("right");
    let $tiltle = document.createElement("h1");
    $tiltle.innerHTML = this.props
      ? `${this.props.name}- ${this.props.singer}`
      : "Unknown";
    let $genre = document.createElement("h3");
    $genre.innerHTML = this.props ? `Genre: ${this.props.genre}` : " Unknown";
    let $control = document.createElement("div");
    $control.classList.add("middle");
    $control.innerHTML = `<div class="btn btn-repeat">
    <i class="fas fa-redo"></i>
  </div>
  <div class="btn btn-prev">
    <i class="fas fa-step-backward"></i>
  </div>
  <div class="btn btn-toggle-play">
    <i class="fas fa-pause"></i>
  </div>
  <div class="btn btn-next">
    <i class="fas fa-step-forward"></i>
  </div>
  <div class="btn btn-volume-up">
  <i class="fas fa-volume-up" ></i>
 
  </div>`;
    let $audio = document.createElement("audio");
    $audio.src = this.props ? this.props.audio : "";
    $audio.play();
    let $timeduration = document.createElement("div");
    let $timecurrent = document.createElement("div");
    $timecurrent.innerHTML = `00:00`;
    $audio.onloadedmetadata = function () {
      $timeduration.innerHTML = `${Math.floor(
        $audio.duration / 60
      )}:${Math.floor(
        ($audio.duration / 60 - Math.floor($audio.duration / 60)) * 60
      )}`;
    };

    let $duration = document.createElement("div");
    $duration.classList.add("duration");
    $duration.innerHTML = `<input type="range" min="0" max="100" value="0" step="1" id="duration_slider">`;
    $duration.prepend($timecurrent);
    $duration.append($timeduration);
    let $box = document.createElement("div");
    $box.classList.add("box");
    let $like = document.createElement("div");
    $like.innerHTML = `<i class="fas fa-heart"></i> Like`;
    let $report = document.createElement("div");
    $report.innerHTML = `<i class="fas fa-flag"></i> Report`;
    let $share = document.createElement("div");
    $share.innerHTML = `<i class="fas fa-share"></i> Share`;
    let $btnplay = $control.querySelector(".btn-toggle-play");
    let $btnrepeat = $control.querySelector(".btn-repeat");
    let $pause = $btnplay.querySelector(".fas");
    let isRepeat = false;
    let $btnvolume = $control.querySelector(".btn-volume-up");
    let $volume = $btnvolume.querySelector(".fas ");
    $volume.onclick = (e) => {
      if ($volume.className === "fas fa-volume-up") {
        $volume.classList.replace("fa-volume-up", "fa-volume-mute");
        $audio.volume = 0.0;
      } else {
        $volume.classList.replace("fa-volume-mute", "fa-volume-up");
        $audio.volume = 1.0;
      }
    };
    $btnrepeat.onclick = handleRepeat;
    $btnplay.onclick = handlePlay;
    let $progress = $duration.querySelector("#duration_slider");
    $audio.ontimeupdate = function () {
      let presentTime = ($audio.currentTime / $audio.duration) * 100;
      $progress.value = presentTime;
      let minutes = `0${Math.floor($audio.currentTime / 60)}`;
      let seconds = `0${Math.floor($audio.currentTime % 60)}`;

      $timecurrent.innerHTML = `${minutes.substr(-2)}:${seconds.substr(-2)}`;
    };
    $progress.oninput = function (e) {
      $audio.currentTime = (e.target.value / 100) * $audio.duration;
      $timecurrent.innerHTML = $audio.currentTime;
      let minutes = `0${Math.floor($audio.currentTime / 60)}`;
      let seconds = `0${Math.floor($audio.currentTime % 60)}`;

      $timecurrent.innerHTML = `${minutes.substr(-2)}:${seconds.substr(-2)}`;
    };
    $audio.onended = function () {
      $pause.classList.replace("fa-pause", "fa-play");
      if (isRepeat) {
        $pause.classList.replace("fa-play", "fa-pause");
        $audio.play();
      }
    };
    function handlePlay(e) {
      if ($pause.className === "fas fa-pause") {
        $audio.pause();
        $pause.classList.replace("fa-pause", "fa-play");
      } else {
        $audio.play();
        $pause.classList.replace("fa-play", "fa-pause");
      }
    }
    function handleRepeat(e) {
      let $repeat = e.target.parentElement.querySelector(".fas");

      if ($repeat.className !== "fas fa-redo repeat") {
        $repeat.classList.add("repeat");

        isRepeat = true;
      } else {
        $repeat.classList.remove("repeat");
        isRepeat = false;
      }
    }
    let $icon = $like.querySelector(".fas");
    if (auth.currentUser) {
      db.collection("users")
        .get()
        .then((e) => {
          e.forEach((doc) => {
            if (auth.currentUser.email == doc.data().email) {
              for (let i = 0; i < doc.data().favouritelist.length; i++) {
                if (doc.data().favouritelist[i].id == this.props.id) {
                  $icon.style.color = "red";
                  // $icon.disabled = true;
                }
              }
            }
          });
        });
    }

    $like.onclick = async (e) => {
      if (!auth.currentUser) {
        alert("Dang nhap de them bai hat yeu thich");
      } else {
        $icon.style.color = "red";
        let users = await db.collection("users").get();
        for (let user of users.docs) {
          if (user.data().email == auth.currentUser.email) {
            user.ref.update({
              favouritelist: firebase.firestore.FieldValue.arrayUnion({
                id: this.props.id,
                audio: this.props.audioUrl,
                img: this.props.img,
                namesong: this.props.name,
                singer: this.props.singer,
              }),
            });
          }
        }
      }
    };
    $box.append($like, $share, $report);
    $right_dashboard.append($control, $duration, $audio);
    $dashboard.append($left_dashboard, $right_dashboard);
    $musicplayer.innerHTML = "";
    $musicplayer.append($tiltle, $genre, $dashboard, $box);
    $content.prepend($musicplayer);

    return $content;
  }
}

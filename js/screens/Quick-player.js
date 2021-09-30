import BaseComponents from "../BaseComponents.js";

export default class quickPlayer extends BaseComponents {
  render() {
    let $cdthumb = document.createElement("div");
    $cdthumb.classList.add("cdthumb");
    $cdthumb.innerHTML = `<img src="${this.props.img}" alt="" />
        <h3>${this.props.name}</h3>`;
    let $control = document.createElement("div");
    $control.classList.add("control");
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
    let $btnplay = $control.querySelector(".btn-toggle-play");
    let $btnrepeat = $control.querySelector(".btn-repeat");
    let $pause = $btnplay.querySelector(".fas");
    let isRepeat = false;
    let $btnvolume = $control.querySelector(".btn-volume-up");
    let $volume = $btnvolume.querySelector(".fas ");
    $volume.onclick = (e) => {
      console.log(e.target);
      if ($volume.className === "fas fa-volume-up") {
        $volume.classList.replace("fa-volume-up", "fa-volume-mute");
        $audio.volume = 0.0;
      } else {
        $volume.classList.replace("fa-volume-mute", "fa-volume-up");
        $audio.volume = 1.0;
      }
    };

    let $progress = document.createElement("input");
    $progress.id = "progress";
    $progress.classList.add("progress");
    $progress.type = "range";
    $progress.min = "0";
    $progress.max = "100";
    $progress.value = "0";
    $progress.step = "1";
    let $audio = document.createElement("audio");
    $audio.id = "audio";
    $audio.src = `${this.props.audio}`;
    $audio.play();
    $btnrepeat.onclick = handleRepeat;
    $btnplay.onclick = handlePlay;
    $audio.ontimeupdate = function () {
      let presentTime = ($audio.currentTime / $audio.duration) * 100;
      $progress.value = presentTime;
    };
    $progress.oninput = function (e) {
      $audio.currentTime = (e.target.value / 100) * $audio.duration;
    };
    $audio.onended = function () {
      $pause.classList.replace("fa-pause", "fa-play");
      if (isRepeat) {
        console.log("reapeat");
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
    let $player = document.querySelector("#player");
    $player.setAttribute(
      "style",
      "background-color: #021f32;position: fixed;height: 110px; bottom: 0px;left: 0;right: 0; padding-top:10px"
    );
    console.log($player);
    $player.innerHTML = "";
    $player.append($cdthumb, $control, $progress, $audio);

    return $player;
  }
}

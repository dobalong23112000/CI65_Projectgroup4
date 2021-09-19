import InputWrapper from "../components/InputWrapper.js";

export default class AddSong extends InputWrapper {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        namesong: "",
        author: "",
        singer: "",
        genre: "difference",
        audio: "",
        img: "",
      },
      messegeError: {
        namesong: "",
        author: "",
        singer: "",
        genre: "",
        audio: "",
        img: "",
      },
    };
  }
  handleAddSong(fieldName, filedValue) {
    let tmpState = this.state;
    if (filedValue.trim() == "") {
      tmpState.messegeError[fieldName] = "Invalid";
    } else {
      tmpState.messegeError[fieldName] = "";
      tmpState.data[fieldName] = filedValue;
    }

    this.setState(tmpState);
  }
  async upLoadSong(file) {
    let thisRef = storageRef.child(file.name);
    await thisRef.put(file);
    console.log("THanh cong");
  }
  handleBtnonclick = async (e) => {
    e.preventDefault();
    console.log(this.state);

    await db.collection("Listmusic").add(this.state.data);
    let tmpState = this.state;
    tmpState = {
      data: {
        namesong: "",
        author: "",
        singer: "",
        genre: "difference",
        audio: "",
        img: "",
      },
      messegeError: {
        namesong: "",
        author: "",
        singer: "",
        genre: "",
        audio: "",
        img: "",
      },
    };
    this.setState(tmpState);
  };
  render() {
    let $container = document.querySelector("#addsong");
    let $form = document.createElement("form");
    $form.classList.add("form");
    let $formoff = document.createElement("i");
    $formoff.className = "fas fa-times";
    $formoff.onclick = function () {
      $container.style.display = "none";
    };
    let $heading = document.createElement("h1");
    $heading.className = "heading";
    $heading.innerHTML = "Add Song";
    let $spacer = document.createElement("div");
    $spacer.classList.add("spacer");
    let _namesong = new InputWrapper({
      label: "Name song",
      type: "text",
      message: this.state.messegeError.namesong,
      value: this.state.data.namesong,
      placeholder: "",
      onblur: (e) => {
        this.handleAddSong("namesong", e.target.value);
      },
    });
    let _singername = new InputWrapper({
      label: "Singer Name",
      type: "text",
      message: this.state.messegeError.singer,
      value: this.state.data.singer,
      placeholder: "",
      onblur: (e) => {
        this.handleAddSong("singer", e.target.value);
      },
    });
    let _authorname = new InputWrapper({
      label: "Author Name",
      type: "text",
      message: this.state.messegeError.author,
      value: this.state.data.author,
      placeholder: "",
      onblur: (e) => {
        this.handleAddSong("author", e.target.value);
      },
    });
    let _img = new InputWrapper({
      label: "img",
      type: "text",
      message: this.state.messegeError.img,
      value: this.state.data.img,
      placeholder: "",
      onblur: (e) => {
        this.handleAddSong("img", e.target.value);
      },
    });
    let $formgroupgenre = document.createElement("div");
    $formgroupgenre.classList.add("form-group");
    let $labelgenre = document.createElement("label");
    $labelgenre.classList.add("form-label");
    $labelgenre.innerHTML = "Music Genre";
    let $selectgenre = document.createElement("select");
    $selectgenre.classList.add("form-control");
    $selectgenre.onchange = (e) => {
      this.handleAddSong("genre", e.target.value);
      console.log(e.target.value);
    };
    $selectgenre.innerHTML = `<option value="hiphop">Hip Hop</option>
    <option value="pop">Pop</option>
    <option value="country">Country</option>
    <option value="difference">Difference</option>`;
    $selectgenre.value = this.state.data.genre;
    let $messagegenre = document.createElement("span");
    $messagegenre.classList.add("form-message");
    $messagegenre.innerHTML = this.state.messegeError.genre;
    $messagegenre.classList.add("invalid");
    $formgroupgenre.append($labelgenre, $selectgenre, $messagegenre);
    let $formgroupaudio = document.createElement("div");
    $formgroupaudio.classList.add("form-group");
    let $labelaudio = document.createElement("label");
    $labelaudio.classList.add("form-label");
    $labelaudio.innerHTML = "Music File";

    let $inputaudio = document.createElement("input");
    $inputaudio.classList.add("form-control");
    $inputaudio.type = "file";
    $inputaudio.accept = ".mp3";
    let $messageaudio = document.createElement("span");
    $messageaudio.classList.add("form-message");
    let $input = document.createElement("input");
    $inputaudio.style.position = "absolute";
    $inputaudio.style.marginTop = "24px";
    $inputaudio.style.width = "40%";
    $inputaudio.style.opacity = "0";
    $inputaudio.classList.add("form-control");
    $input.type = "text";
    $input.classList.add("form-control");
    $input.value = this.state.data.audio;
    $formgroupaudio.append($labelaudio, $inputaudio, $input, $messageaudio);
    $inputaudio.onchange = (e) => {
      this.upLoadSong(e.target.files[0]);
      this.handleAddSong("audio", e.target.files[0].name);
    };

    let $button = document.createElement("button");
    $button.classList.add("form-submit");
    $button.innerHTML = "+ Add music";
    $button.disabled = true;
    $button.onclick = this.handleBtnonclick;
    let isPassed = true;
    for (let key in this.state.messegeError) {
      if (this.state.messegeError[key]) {
        isPassed = false;
      }
    }
    for (let key in this.state.data) {
      if (!this.state.data[key]) {
        isPassed = false;
      }
    }

    if (isPassed) {
      $button.disabled = false;
      $button.style.backgroundColor = "#f33a58";
    } else {
      $button.disabled = true;
      $button.style.backgroundColor = "rgb(255 99 71 / 50%)";
      $button.style.cursor = "default";
    }
    $form.append(
      $formoff,
      $heading,
      $spacer,
      _namesong.render(),
      _singername.render(),
      _authorname.render(),
      _img.render(),
      $formgroupgenre,
      $formgroupaudio,

      $button
    );

    $container.innerHTML = "";
    $container.append($form);

    return $container;
  }
}

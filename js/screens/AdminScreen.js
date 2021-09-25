import { trowfavourite } from "../components/trowfavourite.js";

export class AdminScreen extends trowfavourite {
  render() {
    let $content = document.querySelector("#content");
    let table = document.createElement("table");
    table.classList.add("content-table");
    let thead = document.createElement("thead");
    let thImg = document.createElement("th");
    thImg.innerHTML = `Img`;
    let thNamesong = document.createElement("th");
    thNamesong.innerHTML = `Tên bài hát`;
    let thSinger = document.createElement("th");
    thSinger.innerHTML = `Ca sĩ`;
    let thPlay = document.createElement("th");
    thPlay.innerHTML = `Play`;
    let thFavou = document.createElement("th");
    thFavou.innerHTML = `Yêu Thích`;
    let thDelete = document.createElement("th");
    thDelete.innerHTML = `xóa`;
    thead.append(thImg, thNamesong, thSinger, thPlay, thFavou, thDelete);
    let tbody = document.createElement("tbody");
    db.collection("Listmusic")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let _list = new trowfavourite({
            namesong: doc.data().namesong,
            singer: doc.data().singer,
            audio: doc.data().audio,
            img: doc.data().img,
          }).render();
          let $delete = _list.querySelector("#delete");
          $delete.onclick = async (e) => {
            await db.collection("Listmusic").doc(doc.id).delete();
            this.setState();
          };
          tbody.append(_list);
        });

        table.append(thead, tbody);
      });
    $content.innerHTML = ``;
    $content.append(table);
    return $content;
  }
}

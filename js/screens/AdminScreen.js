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
            let getData = await db.collection("users").get();
            getData.forEach((element) => {
              // console.log(element.data().favouritelist);
              for (let i = 0; i < element.data().favouritelist.length; i++) {
                if (element.data().favouritelist[i].id == doc.id) {
                  element.ref.update({
                    favouritelist: firebase.firestore.FieldValue.arrayRemove({
                      id: element.data().favouritelist[i].id,
                      audio: element.data().favouritelist[i].audio,
                      img: element.data().favouritelist[i].img,
                      namesong: element.data().favouritelist[i].namesong,
                      singer: element.data().favouritelist[i].singer,
                    }),
                  });
                }
              }
            });
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

import { trowfavourite } from "../components/trowfavourite.js";

export class FavouriteScreen extends trowfavourite {
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
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        try {
          querySnapshot.forEach((doc) => {
            if (auth.currentUser.email == doc.data().email) {
              for (let i = 0; i < doc.data().favouritelist.length; i++) {
                let _list = new trowfavourite({
                  namesong: doc.data().favouritelist[i].namesong,
                  singer: doc.data().favouritelist[i].singer,
                  audio: doc.data().favouritelist[i].audio,
                  img: doc.data().favouritelist[i].img,
                }).render();
                let $delete = _list.querySelector("#delete");
                $delete.onclick = async (e) => {
                  console.log(doc.ref);
                  await doc.ref.update({
                    favouritelist: firebase.firestore.FieldValue.arrayRemove({
                      audio: doc.data().favouritelist[i].audio,
                      img: doc.data().favouritelist[i].img,
                      namesong: doc.data().favouritelist[i].namesong,
                      singer: doc.data().favouritelist[i].singer,
                    }),
                  });
                  this.setState();
                };
                tbody.append(_list);
              }
            }
          });

          table.append(thead, tbody);
        } catch (e) {
          alert("Dang nhap de truy cap  ");
        }
      });
    $content.innerHTML = ``;
    $content.append(table);

    return table;
  }
}

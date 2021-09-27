import Basecomponents from "../Basecomponents.js";

export default class CommentScreen extends Basecomponents {
  render() {
    let $comment = document.createElement("div");
    let $content = document.querySelector("#content");
    $comment.classList.add("comment");
    let $titlecomment = document.createElement("h3");
    $titlecomment.innerHTML = "Comments";
    $titlecomment.style =
      "    font-size: 22px;width: 70%;margin: 100px auto 20px;color: black;";
    $comment.innerHTML = `<form action="#">
    
     <div class="textarea">
            <textarea  cols="30" placeholder="Write something ......" ></textarea>
        </div>
        <div class="btn">
            <button id="btn-comment"><i class="fas fa-paper-plane"></i></button>
     </div>
</form>`;
    let $listcomment = document.createElement("div");
    $listcomment.classList.add("listcomment");
    let $ulcomment = document.createElement("ul");
    let btnComment = $comment.querySelector(".fa-paper-plane");
    let $inputtextarea = $comment.querySelector("textarea");
    btnComment.onclick = async (e) => {
      e.preventDefault();
      if (auth.currentUser) {
        if ($inputtextarea.value.trim()) {
          let getData = await db.collection("Listmusic").get();
          getData.forEach(async (doc) => {
            if (doc.id == this.props.id) {
              await doc.ref.update({
                Comments: firebase.firestore.FieldValue.arrayUnion({
                  username: auth.currentUser.displayName,
                  useremail: auth.currentUser.email,
                  comment: $inputtextarea.value.trim(),
                }),
              });
            }
          });
          $content.removeChild($titlecomment);
          $content.removeChild($comment);
          this.setState();
        }
      }
    };
    $listcomment.append($ulcomment);
    db.collection("Listmusic")
      .get()
      .then((e) => {
        e.forEach((doc) => {
          if (this.props.id == doc.id) {
            for (let i = doc.data().Comments.length - 1; i >= 0; i--) {
              let $li = document.createElement("li");
              $li.innerHTML = `<label title="${
                doc.data().Comments[i].useremail
              }"> <b>${doc.data().Comments[i].username} :</b> </label> </br>${
                doc.data().Comments[i].comment
              }`;
              $ulcomment.append($li);
            }
          }
        });
        $comment.append($listcomment);
        $content.insertBefore($comment, document.querySelector(".listmusic"));
        $content.insertBefore($titlecomment, $comment);
      });
    if (!auth.currentUser) {
      $comment.style.display = "none";
    } else {
      $comment.style.display = "";
    }
    return $content;
  }
}

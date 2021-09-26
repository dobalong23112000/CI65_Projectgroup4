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
    btnComment.onclick = async (e) => {
      e.preventDefault();
      if (!auth.currentUser) {
        alert("Dang nhap de comment");
      } else {
        let $inputtextarea = $comment.querySelector("textarea");
        if ($inputtextarea.value.trim()) {
          let getData = await db.collection("Listmusic").get();

          getData.forEach((doc) => {
            if (doc.id == this.props.id) {
              doc.ref.update({
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
            doc.data().Comments.forEach((element) => {
              let $li = document.createElement("li");
              $li.innerHTML = `<label title="${element.useremail}"> <b>${element.username} :</b> </label> </br>${element.comment}`;
              $ulcomment.append($li);
            });
          }
        });
      });
    $comment.append($listcomment);
    $content.insertBefore($comment, document.querySelector(".listmusic"));
    $content.insertBefore($titlecomment, $comment);

    return $content;
  }
}

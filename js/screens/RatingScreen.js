import Basecomponents from "../Basecomponents.js";

export default class RatingScreen extends Basecomponents {
  render() {
    let $musicplayer = document.querySelector(".musicplayer");
    let $content = document.querySelector("#content");
    let $rating = document.createElement("div");
    $rating.className = "rating-wrap";
    $rating.innerHTML = ` 
    <h3>Đánh giá :   </h3>
    <div class="center" style="margin-left: 10px">
    <div class="rating">
      <input type="radio" id="star5" name="rating" value="5" /><label
        for="star5"
        class="full"
        title="Awesome"
      ></label>
      <input type="radio" id="star4" name="rating" value="4" /><label
        for="star4"
        class="full"
      ></label>
      <input type="radio" id="star3" name="rating" value="3" /><label
        for="star3"
        class="full"
      ></label>
      <input type="radio" id="star2" name="rating" value="2" /><label
        for="star2"
        class="full"
      ></label>
      <input type="radio" id="star1" name="rating" value="1" /><label
        for="star1"
        class="full"
      ></label>
    </div>
  </div>
  <h3 id="rating-value"></h3>
  <h5 id="commentrating" style="font-weight: lighter;text-align: center;line-height: 25px; margin-left: 10px;"></h5>
  `;
    let star = $rating.querySelectorAll("input");
    let showValue = $rating.querySelector("#rating-value");

    let that = this;
    db.collection("users")
      .get()
      .then(async (e) => {
        let isRated = false;
        let ratetb = 0;
        let count = 0;
        e.forEach((doc) => {
          doc.data().rating.forEach(async (element) => {
            if (element.idmusic == that.props.id && element.rate) {
              ratetb += parseInt(element.rate);
              count += 1;
            }
          });
        });
        let getDataList = await db.collection("Listmusic").get();
        getDataList.docs.forEach((doc) => {
          if (doc.id == that.props.id) {
            doc.ref.update({
              rating: parseInt(ratetb / count),
            });
          }
        });
        e.forEach((doc) => {
          if (doc.data().email == auth.currentUser.email) {
            doc.data().rating.forEach((element) => {
              if (element.idmusic == that.props.id) {
                isRated = true;
              }
            });
            if (isRated) {
              showValue.innerHTML = `${parseInt(ratetb / count)}/5`;
              $rating.querySelector(
                "#commentrating"
              ).innerHTML = `(Đã đánh giá)`;
              showValue.style.backgroundColor = "cornsilk";
              star[Math.abs(parseInt(ratetb / count) - 5)].checked = true;
              for (let i = 0; i < star.length; i++) {
                star[i].disabled = true;
              }
            } else {
              for (let i = 0; i < star.length; i++) {
                star[i].addEventListener("click", async function () {
                  i = this.value;
                  showValue.innerHTML = i + "/5";
                  showValue.style.backgroundColor = "cornsilk";
                  await doc.ref.update({
                    rating: firebase.firestore.FieldValue.arrayUnion({
                      idmusic: that.props.id,
                      rate: i,
                    }),
                  });
                  $musicplayer.removeChild($rating);
                  that.setState();
                });
              }
            }
          }
        });
      });

    if (!auth.currentUser) {
      $rating.style.display = "none";
    }
    $musicplayer.append($rating);
    return $musicplayer;
  }
}

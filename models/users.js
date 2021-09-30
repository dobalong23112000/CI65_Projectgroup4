export async function register(name, email, password) {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    let user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name,
      })
      .then((e) => {
        db.collection("users").add({
          name: name,
          email: email,
          password: password,
          favouritelist: [],
          rating: [],
        });
      });
    firebase.auth().signOut();
    alert("Dang ki thanh cong");
  } catch (error) {
    alert("Email cua ban da ton tai");
  }
}
export async function login(email, password) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    alert("Dang nhap thanh cong");

    let $login = document.querySelector("#contentLogin");
    $login.style.display = "none";
    window.location.reload();
  } catch (error) {
    alert(error.message);
  }
}

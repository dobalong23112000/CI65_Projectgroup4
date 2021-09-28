export async function register(name, email, password) {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    let user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    });
    db.collection("users").add({
      name: name,
      email: email,
      password: password,
      favouritelist: [],
    });
    firebase.auth().signOut();
    alert("Dang ki thanh cong");
  } catch (error) {
    alert("Dang ky khong thanh cong");
  }
}
export async function login(email, password) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    alert("Dang nhap thanh cong");

    let $login = document.querySelector("#contentLogin");
    $login.style.display = "none";
  } catch (error) {
    alert(error.message);
  }
}
export function getCurrentUser() {}
export function updateUser() {}
export function logout() {}

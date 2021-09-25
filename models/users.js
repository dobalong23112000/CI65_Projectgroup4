export async function register(name, email, password) {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    let user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name,
    });
    firebase.auth().signOut();
    alert("Dang ki thanh cong");
  } catch (error) {
    console.log(error.message);
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

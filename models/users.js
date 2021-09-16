export async function register(name, email, password) {
  try {
    await auth.createUserWithEmailAndPassword(email, password); // xay ra hien tuong bat dong bo

    alert("Dang ki thanh cong");
  } catch (error) {
    console.log(error.message);
  }
}
export async function login(email, password) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    alert("Dang nhap thanh cong");
  } catch (error) {
    alert(error.message);
  }
}
export function getCurrentUser() {}
export function updateUser() {}
export function logout() {}

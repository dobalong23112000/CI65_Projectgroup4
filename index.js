import Modal from "./js/components/Modal.js";
import AddSong from "./js/screens/AddSong.js";
import Headerscreen from "./js/screens/Headerscreen.js";
import listmusicscreen from "./js/screens/Listmusic.js";
import Login from "./js/screens/LoginScreen.js";
import NavbarScreen from "./js/screens/NavbarScreen.js";
import quickPlayer from "./js/screens/Quick-player.js";
import Register from "./js/screens/RegisterScreen.js";

let _header = new Headerscreen().render();
let _navbar = new NavbarScreen().render();
let _container = new Register().render();
let _login = new Login().render();
let _modal = new AddSong().render();

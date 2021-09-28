import MusicPlayer from "./js/components/MusicPlayer.js";
import { AdminScreen } from "./js/screens/AdminScreen.js";
import { FavouriteScreen } from "./js/screens/FavouriteScreen.js";
import Login from "./js/screens/LoginScreen.js";

let router = new Navigo(null, true, "#");
let $main = document.getElementById("main");
let $content = document.getElementById("content");

router
  .on("/listfavourite", function () {
    $content.innerHTML = "";
    let _favouritescreen = new FavouriteScreen().render();
  })
  .resolve();
router
  .on("/adminscreen", function () {
    $content.innerHTML = "";
    let _adminscreen = new AdminScreen().render();
  })
  .resolve();

router
  .on("/musicplayer", function () {
    $main.innerHTML = "";
    let _musicplayer = new MusicPlayer().render();
  })
  .resolve();

window.router = router;

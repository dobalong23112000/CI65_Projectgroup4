let $btn = document.querySelector("#btn");
let $sidebar = document.querySelector(".sidebar");
let $navList = document.querySelector(".nav_list");
// let $admin = document.querySelector(".bxs-user-circle");
// let $listMusic = document.querySelector(".bxs-playlist");
// let $setting = document.querySelector(".bxs-cog");

$btn.onclick = function(){
    $sidebar.classList.toggle("active")
}
$navList.onclick = function(){
    $sidebar.classList.toggle("active")
}
// $admin.onclick = function(){
//     $sidebar.classList.toggle("active")
// }
// $listMusic.onclick = function(){
//     $sidebar.classList.toggle("active")
// }
// $setting.onclick = function(){
//     $sidebar.classList.toggle("active")
// }


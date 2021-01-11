
var mySong = document.getElementById("mysong");
var icon = document.getElementById("icon");

icon.onclick = function(){
    if(mySong.paused){
        mySong.play();
        icon.src = "img/pause.png";
    }else{
        mySong.pause();
        icon.src = "img/play.png"
    }
}

const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
     auth.signOut();

     window.location.href = "index.html";
     alert("logged out");

});

const signup = document.querySelector("#signup");
signup.addEventListener("click", (e) => {
    e.preventDefault();
     auth.signOut();
     window.location.href = "creat.html";
     alert("logged out");
});

const connect = document.querySelector("#connect");
connect.addEventListener("click", (e) => {
    e.preventDefault();
     
     window.location.href = "connect.html";

});
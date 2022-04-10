var player;
var computer ;
document.getElementById("Xbutton").onclick = function(){
    player='x';
    computer = 'o';
    document.getElementById("choice").style.display = "none";
    document.getElementsByClassName("flex-container")[0].style.display="flex";
    document.getElementById("Restart").style.display = "block";
    return "x";

}


document.getElementById("Obutton").onclick = function(){
    player='o';
    computer = 'x';
    document.getElementById("choice").style.display = "none";
    document.getElementsByClassName("flex-container")[0].style.display="flex";
    document.getElementById("Restart").style.display = "block";
}

    
// .
var tab = ["", "", "", "", "", "", "", "", ""];
var elements = document.getElementsByClassName("flex-item");
function association () {
    for (let i=0 ;i < 9; i++) {
        elements[i].innerHTML = tab[i];
    }
}

var restartButton=document.getElementById("Restart");

function handleRestart() {
    tab = ["", "", "", "", "", "", "", "", ""];
    for (let i=0 ;i < 9; i++) {
        elements[i].innerHTML = '';
    }
    document.getElementById("choice").style.display = "block" ;
    document.getElementById("Restart").style.display = "none" ;
    document.getElementsByClassName("flex-container")[0].style.display="none";
    alert(`player ${player} has won`);
}

function freeCase () {
    var ind;
    var tabModified = [] ;
    var val;
    
    for (let i=0 ;i < 9; i++) {
        tab[i] = elements[i].innerHTML ;
    }
    for (let i=0; i<9; i++) {
        if (!tab[i]) {
            tabModified.push(i);
        }    
    }
    ind = Math.floor((Math.random() * (tabModified.length - 1 )));
    val = tabModified[ind];
    return val;
    
    
}  
function handleX() {
    var val1;
    this.innerHTML=player;
    val1 = freeCase();
    association();
    setTimeout(function(){
        elements[val1].innerHTML=computer;
    },500);

    for (let i=0 ;i < 9; i++) {
        tab[i] = elements[i].innerHTML ;
    }
    
}
restartButton.addEventListener("click", handleRestart);

for (var i=0 ;i < 9; i++) {
    elements[i].addEventListener("click",handleX);
}


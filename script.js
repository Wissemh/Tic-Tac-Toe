// global variables
var player=["",0];
var computer=["",0] ;
var winner ; 
var restartButton=document.getElementById("Restart");
var tab = ["", "", "", "", "", "", "", "", ""];
var elements = document.getElementsByClassName("flex-item");
function associationElementsToTab () {
    for (let i=0 ;i < 9; i++) {
        elements[i].innerHTML = tab[i];
    }
}
function associationTabToElements() {
    for (let i=0 ;i < 9; i++) {
        tab[i] = elements[i].innerHTML ;
    }
}

// Initialisation des scores 
if(!player[1]){document.getElementById("PlayerScore").innerHTML = 0;}
if(!computer[1]){document.getElementById("ComputerScore").innerHTML = 0;}

// Changement des styles et des variables après choix des symboles
document.getElementById("Xbutton").onclick = function(){
    player[0]="x";
    computer[0] = "o";
    document.getElementById("choice").style.display = "none";
    document.getElementsByClassName("flex-container")[0].style.display="flex";
    document.getElementById("Restart").style.display = "block";
    document.getElementById("score").style.display = "none";
}
document.getElementById("Obutton").onclick = function(){
    player[0]="o";
    computer[0] = "x";
    document.getElementById("choice").style.display = "none";
    document.getElementsByClassName("flex-container")[0].style.display="flex";
    document.getElementById("Restart").style.display = "block";
    document.getElementById("score").style.display = "none";

}
// Recherche de gagnat
function checkWinner() {
    if ((tab[0]==player[0] && tab[1]==player[0] && tab[2] == player[0] ) || 
        (tab[3]==player[0] && tab[4]==player[0] && tab[5] == player[0] ) || 
        (tab[6]==player[0] && tab[7]==player[0] && tab[8] == player[0] ) || 
        (tab[0]==player[0] && tab[3]==player[0] && tab[6] == player[0] ) ||
        (tab[1]==player[0] && tab[4]==player[0] && tab[7] == player[0] ) || 
        (tab[2]==player[0] && tab[5]==player[0] && tab[8] == player[0] ) || 
        (tab[0]==player[0] && tab[4]==player[0] && tab[8] == player[0] ) || 
        (tab[2]==player[0] && tab[4]==player[0] && tab[6] == player[0] ))  
        {
            winner = player[0] ;
            player[1] = player[1]+1;    
            if(player[1]) { document.getElementById("PlayerScore").innerHTML = player[1];}
            handleRestart();   
        }
    else if ((tab[0]==computer[0] && tab[1]==computer[0] && tab[2] == computer[0] ) || 
    (tab[3]==computer[0] && tab[4]==computer[0] && tab[5] == computer[0] ) || 
    (tab[6]==computer[0] && tab[7]==computer[0] && tab[8] == computer[0] ) || 
    (tab[0]==computer[0] && tab[3]==computer[0] && tab[6] == computer[0] ) ||
    (tab[1]==computer[0] && tab[4]==computer[0] && tab[7] == computer[0] ) || 
    (tab[2]==computer[0] && tab[5]==computer[0] && tab[8] == computer[0] ) || 
    (tab[0]==computer[0] && tab[4]==computer[0] && tab[8] == computer[0] ) || 
    (tab[2]==computer[0] && tab[4]==computer[0] && tab[6] == computer[0] ))
    {
        winner = computer[0] ;
        computer[1] = computer[1]+1;
        if(computer[1]) { document.getElementById("ComputerScore").innerHTML = computer[1];}
        handleRestart();
    }
    else if ((tab[0] && tab[1] && tab[2]) && 
    (tab[3] && tab[4] && tab[5]  ) && 
    (tab[6] && tab[7] && tab[8] ) && 
    (tab[0] && tab[3] && tab[6]  ) &&
    (tab[1] && tab[4] && tab[7]  ) && 
    (tab[2] && tab[5] && tab[8]  ) )
    {
        handleRestart();
    }
}
//fonction de Restart
function handleRestart() {
    winner=undefined;
    computer[0]=null;
    player[0]=null;
    tab = ["", "", "", "", "", "", "", "", ""];
    for (let i=0 ;i < 9; i++) {
        elements[i].innerHTML = '';
        elements[i].style.cursor="pointer";
    }
    document.getElementById("choice").style.display = "block" ;
    document.getElementById("Restart").style.display = "none" ;
    document.getElementsByClassName("flex-container")[0].style.display="none";
    document.getElementById("score").style.display = "block";
}
// Recherche d'une case vide pour placer un element de l'adversaire  
/* Principe : l'ordinateur verfie premièrement si la case centrale est vide si oui , il y place son element
sinon il parcours les lignes et verfie si une case sur deux est vide (il ne verifie pas si elle est pleine par ses elements ou par les elements de l'adversaire, si oui il y place son element)
sinon il parcours les colonnes et refait le même travail
pas de traitement pour les diagonales 
sinon il le place aléatoirement
*/
function freeCase ()
{
    var ind;
    var tabModified = [] ;
    var val=undefined;
    if(!winner)
    {
        for (let i=0 ;i < 9; i++) {
        tab[i] = elements[i].innerHTML ;
    }
    }
    var tableauLigne=[];
    for(let i =0; i<7; i=i+3) {
        tableauLigne.push([[i,i+1,i+2],[i,i+2,i+1],[i+1,i+2,i]]);
    }
    var tableauColonne=[]; 

    for(let j = 0; j<3; j++) {
        tableauColonne.push([[j,j+3,j+6],[j,j+6,j+3],[j+3,j+6,j]]);
    }
    
    for (let i=0; i<9; i++)
    {
        if (!tab[i]) {
            tabModified.push(i);
        }    
    }
    if (tabModified.length )
    {   // priorité d'emplacement dans la case centrale 
        if (!tab[4]) {val=4;} 
        //Recherche si une case / deux vide dans une ligne puis une colonne 
        else if (testLigne(tableauLigne)) {
        val=testLigne(tableauLigne);}
        else if (testColonne(tableauColonne)) {
            val=testColonne(tableauColonne);}
        // sinon emplacement aléatoire
        else {
           ind = Math.floor((Math.random() * (tabModified.length - 1 )));
            val = tabModified[ind];
      }
    }
    
    return val;
}
function handleX() {
    this.style.cursor="not-allowed"
    if(!this.innerHTML){
        var val1;
        this.innerHTML=player[0];
        associationTabToElements();
        associationElementsToTab(); 
        checkWinner();   
        if (winner) {return;}
        else 
        {val1 = freeCase();
            setTimeout(function(){
            elements[val1].innerHTML=computer[0];
            associationTabToElements();
            associationElementsToTab();  
            checkWinner();  
            elements[val1].style.cursor = "not-allowed";
            },500); 

        } 
        associationElementsToTab();
    }

}
restartButton.addEventListener("click", handleRestart);
for (var i=0 ;i < 9; i++) {
    elements[i].addEventListener("click",handleX);
}
//tableau des indices sur une même ligne
function testLigne(tableau) {
    for (let j=0;j<3;j++) {
        if ((tab[tableau[j][0]]) && (tab[tableau[j][1]]) && ((tab[tableau[j][0]])==(tab[tableau[j][1]])) && !(tab[tableau[j][2]])) 
        {
            return tab[tableau[j][2]];
        }
    }
}
//tableau des indices sur une même colonne
function testColonne(tableauC) {
    for (let j=0;j<3;j++) {
        if ((tab[tableauC[j][0]]) && (tab[tableauC[j][1]])&& ((tab[tableauC[j][0]]) == (tab[tableauC[j][1]])) && !(tab[tableauC[j][2]])) 
        {
            return tab[tableauC[j][2]];
        }
    }
}

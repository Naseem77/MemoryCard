let hasFlippedCard = false;
let first, second;
let gameLock = false;
const cards = document.querySelectorAll(".memory-card");

(function shuffleCards(){
    cards.forEach(item => {
        let randomNum = Math.floor(Math.random() * 12);
        item.style.order = randomNum;
    })
})();



function checkCardFlip() {
    if (gameLock == true){
        return;
    } 
    if (this === first) return; //checking if its the same card as the first card
    this.classList.add('flip');//mark the flipped cards
    
    if(!hasFlippedCard){
        hasFlippedCard = true;
        first = this;
        return;
    } 
        second = this;

    checkForMatch();
}

function checkForMatch(){
    first.dataset.num === second.dataset.num ? disableCards() : flipBackCards();
}
function flipBackCards(){// no match between cards flip 
    gameLock = true;
    setTimeout(() => {
        first.classList.remove('flip');
        second.classList.remove('flip');
        resetGame();
    }, 1500);
}
function disableCards(){//found a match between cards
    first.removeEventListener('click',checkCardFlip);
    second.removeEventListener('click',checkCardFlip);
    first.classList.add("found");
    second.classList.add("found");
    resetGame();
}

function resetGame(){
    [hasFlippedCard, gameLock] = [false,false];
    [first, second] = [null, null];
    newGame();
}
function newGame(){
    const resetCards = document.querySelectorAll(".memory-card");
    let count = 0;
    resetCards.forEach(item =>{
        if (item.classList.contains("found")){
            count++;
        }
    })
    if (count == 12){ 
        setTimeout(() => {
            let val = confirm("Congrats you have found all the cards!! press ok to restart the game");
            val ? location.reload() : true;
        },1000)
    }
}
cards.forEach((item) => item.addEventListener('click', checkCardFlip));


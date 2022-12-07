const secretPhrases = ["ramtin", "parsa", "milad", "benyamin", "mom"];
let randomItem =  "";
let clicked = [];
let result = "";
let mistakes = 0;

function selectRandomItem () {
    randomItem = secretPhrases[Math.floor(Math.random() * secretPhrases.length)];
    document.getElementById("letters").addEventListener("click", buttonHandler);
    window.addEventListener("keydown", keyHandler)
    console.log(randomItem);
};

function setUnderLine() {
    let splitedWords = randomItem.split("");
    let mappedswords = splitedWords.map(letter => (clicked.indexOf(letter) >= 0 ? letter : "_"));
    result = mappedswords.join("");
    document.getElementById("clue").innerHTML = `<p>${result}</p>`
};

function checkIfWon() {
    if (randomItem === result) {
        document.getElementById("gameover").querySelector("p").style.display = "block";
        document.getElementById("image").querySelector("img").src = "assets/winner.png"
    }
}

function checkIfLost () {
    if (mistakes === 6) {
        document.getElementById("gameover").querySelector("p").style.display = "block";
        document.getElementById("clue").innerHTML = `<P>Random word is ${randomItem}</P>`
    }
}

function UpdateHangmanPic () {
    const image = document.getElementById("image").querySelector("img");
    image.src = `assets/hangman${mistakes}.png`
}

function letterHandler (letter) {
    letter = letter.toLowerCase();
    clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
    document.getElementById(letter.toUpperCase()).className = "used";
    if (randomItem.indexOf(letter) >= 0) {
        setUnderLine();
        checkIfWon();
    } else if (randomItem.indexOf(letter) === -1) {
        mistakes++;
        checkIfLost();
        UpdateHangmanPic();
    }
}


function buttonHandler (event) {
    letterHandler(event.target.id)
}

function keyHandler (event) {
    letterHandler(event.key)
}

selectRandomItem();
setUnderLine();

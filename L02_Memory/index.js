"use strict";
var Memory;
(function (Memory) {
    let startField;
    let gameField;
    let inputField;
    let amountField;
    let playerField;
    let playerNames = [];
    let playerScores = [];
    let activePlayer = 0;
    let activePlayerText;
    let activePlayerContainer;
    let playerText = [];
    let amountOFCardPairs;
    let cards = [];
    let firstCardIndex = -1;
    let secondCardIndex = -1;
    let isClickable = true;
    window.addEventListener("load", init);
    function init() {
        startField = document.querySelector("div[name=startField]");
        gameField = document.querySelector("div.gameField");
        inputField = document.querySelector("div[name=inputField]");
        amountField = document.querySelector("input[name=amountOfCardPairs]");
        playerField = document.querySelector("div[name=playerField]");
        activePlayerText = document.querySelector("span[name=activePlayer]");
        activePlayerContainer = document.querySelector("div[name=activePlayerContainer]");
        activePlayerContainer.style.display = "none";
        document.querySelector("button[name=addButton]")?.addEventListener("click", addInputField);
        document.querySelector("button[name=removeButton]")?.addEventListener("click", removeInputField);
        document.querySelector("button[name=startButton]")?.addEventListener("click", startGamePressed);
        addInputField();
        addInputField();
        console.log(startField);
        console.log(gameField);
        console.log(inputField);
        console.log(playerScores);
        console.log(firstCardIndex);
        console.log(secondCardIndex);
        console.log(activePlayer);
        console.log(playerField);
        console.log("_________________________________");
    }
    function addInputField() {
        if (inputField.childElementCount < 4) {
            let newInput = document.createElement("input");
            newInput.placeholder = "player " + (inputField.childElementCount + 1);
            inputField.appendChild(newInput);
        }
    }
    function removeInputField() {
        if (inputField.childElementCount > 2) {
            inputField.removeChild(inputField.lastChild);
        }
    }
    function startGamePressed() {
        for (let i = 0; i < inputField.childElementCount; i++) {
            let child = inputField.children[i];
            if (child.value == "") {
                alert("You must enter a name for every Player!");
                playerNames = [];
                return;
            }
            else {
                playerNames.push(child.value);
                playerScores.push(0);
            }
        }
        amountOFCardPairs = Number(amountField.value);
        if (amountOFCardPairs == null || amountOFCardPairs < 5 || amountOFCardPairs > 25) {
            alert("Please enter a valid amount of Cards.");
            amountOFCardPairs = 0;
            return;
        }
        startGame();
    }
    function startGame() {
        generateCards();
        spawnCards();
        makeCardsVisible();
        startField.style.display = "none";
        activePlayerContainer.style.display = "block";
        genrateUI();
        setTimeout(makeCardsInvisible, cards.length * 150);
    }
    function genrateUI() {
        for (let player of playerNames) {
            playerText.push(generatePlayer(player));
        }
        updateUI();
    }
    function generatePlayer(_name) {
        let playerDiv = document.createElement("div");
        let playerText = document.createElement("span");
        playerDiv.appendChild(playerText);
        playerField.appendChild(playerDiv);
        return playerText;
    }
    function makeCardsVisible() {
        for (let i = 0; i < gameField.childElementCount; i++) {
            makeCardVisible(i);
        }
    }
    function makeCardVisible(_index) {
        let element = gameField.children[_index].children[0];
        element.style.display = "flex";
    }
    function makeCardsInvisible() {
        for (let i = 0; i < gameField.childElementCount; i++) {
            makeCardInvisible(i);
        }
    }
    function makeCardInvisible(_index) {
        let element = gameField.children[_index].children[0];
        element.style.display = "none";
    }
    function spawnCards() {
        for (let card of cards) {
            document.querySelector("div.gameField")?.appendChild(card);
        }
    }
    function generateCards() {
        let deck = generateShuffledDeck();
        for (let i = 0; i < deck.length; i++) {
            cards.push(createCard(String(deck[i]), i));
        }
    }
    function generateShuffledDeck() {
        let deck = [];
        for (let i = 1; i <= amountOFCardPairs; i++) {
            deck.push(i);
            deck.push(i);
        }
        return shuffle(deck);
    }
    function shuffle(_deck) {
        let temp = [];
        for (let i = _deck.length; i > 0; i--) {
            let rnd = Math.floor(Math.random() * _deck.length);
            temp.push(_deck[rnd]);
            _deck.splice(rnd, 1);
        }
        return temp;
    }
    function createCard(_value, _index) {
        let newCard = document.createElement("div");
        newCard.classList.add("card");
        let cardText = document.createElement("span");
        newCard.appendChild(cardText);
        cardText.innerText = _value;
        newCard.addEventListener("click", () => {
            clickedOnCard(_index);
        });
        return newCard;
    }
    function clickedOnCard(_index) {
        if (isClickable) {
            makeCardVisible(_index);
            if (firstCardIndex == -1) {
                firstCardIndex = _index;
            }
            else if (secondCardIndex == -1) {
                secondCardIndex = _index;
                compareValues();
            }
            else {
                console.log("Ups, something went wrong");
            }
        }
    }
    function compareValues() {
        isClickable = false;
        let firstCard = gameField.children[firstCardIndex].children[0];
        let secondCard = gameField.children[secondCardIndex].children[0];
        if (firstCard.innerText == secondCard.innerText) {
            right();
        }
        else {
            wrong();
        }
        let temp = 0;
        for (let score of playerScores) {
            temp += score;
        }
        if (temp == amountOFCardPairs) {
            endGame();
        }
    }
    function right() {
        playerScores[activePlayer]++;
        isClickable = true;
        firstCardIndex = -1;
        secondCardIndex = -1;
        updateUI();
    }
    function wrong() {
        setTimeout(() => {
            makeCardInvisible(firstCardIndex);
            makeCardInvisible(secondCardIndex);
            nextTurn();
        }, 2000);
    }
    function nextTurn() {
        isClickable = true;
        firstCardIndex = -1;
        secondCardIndex = -1;
        if (activePlayer < playerScores.length - 1) {
            activePlayer++;
        }
        else {
            activePlayer = 0;
        }
        updateUI();
    }
    function updateUI() {
        for (let i = 0; i < playerNames.length; i++) {
            playerText[i].innerText = playerNames[i] + ": " + playerScores[i];
        }
        activePlayerText.innerText = playerNames[activePlayer];
    }
    function endGame() {
        isClickable = false;
        startField.style.display = "none";
        activePlayerContainer.style.display = "none";
        playerField.style.display = "none";
        gameField.style.display = "none";
        let againButton = document.createElement("button");
        againButton.innerText = "Again!";
        againButton.addEventListener("click", () => {
            location.reload();
        });
        let winner = "";
        let temp = 0;
        for (let i = 0; i < playerNames.length; i++) {
            if (playerScores[i] > temp) {
                temp = playerScores[i];
                winner = playerNames[i];
            }
        }
        let winnerText = document.createElement("p");
        winnerText.innerText = "Winner is: " + winner;
        document.body.appendChild(againButton);
        document.body.appendChild(winnerText);
    }
})(Memory || (Memory = {}));
//# sourceMappingURL=index.js.map
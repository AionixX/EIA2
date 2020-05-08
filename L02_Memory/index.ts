namespace Memory {

    let startField: HTMLDivElement;
    let gameField: HTMLDivElement;
    let inputField: HTMLDivElement;
    let amountField: HTMLInputElement;
    let playerField: HTMLDivElement;

    let playerNames: string[] = [];
    let playerScores: number[] = [];
    let activePlayer: number = 0;
    let activePlayerText: HTMLSpanElement;
    let activePlayerContainer: HTMLDivElement;
    let playerText: HTMLSpanElement[] = [];

    let amountOFCardPairs: number;

    let cards: HTMLDivElement[] = [];

    let firstCardIndex: number = -1;
    let secondCardIndex: number = -1;

    let isClickable: boolean = true;

    window.addEventListener("load", init);

    function init(): void {
        startField = <HTMLDivElement>document.querySelector("div[name=startField]");
        gameField = <HTMLDivElement>document.querySelector("div.gameField");
        inputField = <HTMLDivElement>document.querySelector("div[name=inputField]");
        amountField = <HTMLInputElement>document.querySelector("input[name=amountOfCardPairs]");
        playerField = <HTMLDivElement>document.querySelector("div[name=playerField]");
        activePlayerText = <HTMLSpanElement>document.querySelector("span[name=activePlayer]");
        activePlayerContainer = <HTMLDivElement>document.querySelector("div[name=activePlayerContainer]");
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

    function addInputField(): void {
        if (inputField.childElementCount < 4) {
            let newInput: HTMLInputElement = document.createElement("input");
            newInput.placeholder = "player " + (inputField.childElementCount + 1);
            inputField.appendChild(newInput);
        }
    }
    function removeInputField(): void {
        if (inputField.childElementCount > 2) {
            inputField.removeChild(<Node>inputField.lastChild);
        }
    }
    function startGamePressed(): void {
        for (let i: number = 0; i < inputField.childElementCount; i++) {
            let child: HTMLInputElement = <HTMLInputElement>inputField.children[i];
            if (child.value == "") {
                alert("You must enter a name for every Player!");
                playerNames = [];
                return;
            } else {
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
    function startGame(): void {
        generateCards();
        spawnCards();
        makeCardsVisible();
        startField.style.display = "none";
        activePlayerContainer.style.display = "block";
        genrateUI();
        setTimeout(makeCardsInvisible, cards.length * 150);
    }
    function genrateUI(): void {
        for (let player of playerNames) {
            playerText.push(generatePlayer(player));
        }
        updateUI();
    }
    function generatePlayer(_name: string): HTMLSpanElement {
        let playerDiv: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        let playerText: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");
        playerDiv.appendChild(playerText);
        playerField.appendChild(playerDiv);
        return playerText;
    }

    function makeCardsVisible(): void {
        for (let i: number = 0; i < gameField.childElementCount; i++) {
            makeCardVisible(i);
        }
    }
    function makeCardVisible(_index: number): void {
        let element: HTMLSpanElement = <HTMLSpanElement>gameField.children[_index].children[0];
        element.style.display = "flex";
    }
    function makeCardsInvisible(): void {
        for (let i: number = 0; i < gameField.childElementCount; i++) {
            makeCardInvisible(i);
        }
    }
    function makeCardInvisible(_index: number): void {
        let element: HTMLSpanElement = <HTMLSpanElement>gameField.children[_index].children[0];
        element.style.display = "none";
    }
    function spawnCards(): void {
        for (let card of cards) {
            document.querySelector("div.gameField")?.appendChild(card);
        }
    }
    function generateCards(): void {
        let deck: number[] = generateShuffledDeck();
        for (let i: number = 0; i < deck.length; i++) {
            cards.push(createCard(String(deck[i]), i));
        }
    }
    function generateShuffledDeck(): number[] {
        let deck: number[] = [];
        for (let i: number = 1; i <= amountOFCardPairs; i++) {
            deck.push(i);
            deck.push(i);
        }
        return shuffle(deck);
    }

    function shuffle(_deck: number[]): number[] {
        let temp: number[] = [];
        for (let i: number = _deck.length; i > 0; i--) {
            let rnd: number = Math.floor(Math.random() * _deck.length);
            temp.push(_deck[rnd]);
            _deck.splice(rnd, 1);
        }
        return temp;
    }
    function createCard(_value: string, _index: number): HTMLDivElement {
        let newCard: HTMLDivElement = document.createElement("div");
        newCard.classList.add("card");
        let cardText: HTMLSpanElement = document.createElement("span");
        newCard.appendChild(cardText);

        cardText.innerText = _value;

        newCard.addEventListener("click", () => {
            clickedOnCard(_index);
        });

        return newCard;
    }

    function clickedOnCard(_index: number): void {
        if (isClickable) {
            makeCardVisible(_index);
            if (firstCardIndex == -1) {
                firstCardIndex = _index;
            } else if (secondCardIndex == -1) {
                secondCardIndex = _index;
                compareValues();
            } else {
                console.log("Ups, something went wrong");
            }
        }
        
    }

    function compareValues(): void {
        isClickable = false;
        let firstCard: HTMLSpanElement = <HTMLSpanElement>gameField.children[firstCardIndex].children[0];
        let secondCard: HTMLSpanElement = <HTMLSpanElement>gameField.children[secondCardIndex].children[0];
        if (firstCard.innerText == secondCard.innerText) {
            right();
        } else {
            wrong();
        }
        let temp: number = 0;
        for (let score of playerScores) {
            temp += score;
        }
        if (temp == amountOFCardPairs) {
            endGame();
        }
    }
    function right(): void {
        playerScores[activePlayer]++;
        isClickable = true;
        firstCardIndex = -1;
        secondCardIndex = -1;
        updateUI();
    }
    function wrong(): void {
        setTimeout(() => {
            makeCardInvisible(firstCardIndex);
            makeCardInvisible(secondCardIndex);
            nextTurn();
        },         2000);
        
    }
    function nextTurn(): void {
        isClickable = true;
        firstCardIndex = -1;
        secondCardIndex = -1;
        if (activePlayer < playerScores.length - 1) {
            activePlayer++;
        } else {
            activePlayer = 0;
        }

        updateUI();
    }
    function updateUI(): void {
        for (let i: number = 0; i < playerNames.length; i++) {
            playerText[i].innerText = playerNames[i] + ": " + playerScores[i];
        }
        activePlayerText.innerText = playerNames[activePlayer];
    }
    function endGame(): void {
        isClickable = false;
        startField.style.display = "none";
        activePlayerContainer.style.display = "none";
        playerField.style.display = "none";
        gameField.style.display = "none";

        let againButton: HTMLButtonElement = document.createElement("button");
        againButton.innerText = "Again!";
        againButton.addEventListener("click", () => {
            location.reload();
        });

        let winner: string = "";
        let temp: number = 0;
        for (let i: number = 0; i < playerNames.length; i++) {
            if (playerScores[i] > temp) {
                temp = playerScores[i];
                winner = playerNames[i];
            }
        }
        let winnerText: HTMLParagraphElement = document.createElement("p");
        winnerText.innerText = "Winner is: " + winner;
        document.body.appendChild(againButton);
        document.body.appendChild(winnerText);
    }

}
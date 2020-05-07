namespace WordMemory {

    let word: string;
    let shuffledWord: string;
    let actualIndex: number = 0;
    let isInvisible: boolean = false;
    let waitPerChar: number = 500;

    let uncheckedField: HTMLDivElement;
    let againButton: HTMLButtonElement;
    let gameOverField: HTMLHeadingElement;

    window.addEventListener("load", init);

    function init(): void {
        document.querySelector("button[name=startButton]")?.addEventListener("click", startGame);
        uncheckedField = <HTMLDivElement>document.querySelector("div.uncheckedField");
        gameOverField = <HTMLHeadingElement>document.querySelector("h2[name=gameOverField]");
        gameOverField.style.display = "none";
        againButton = <HTMLButtonElement>document.querySelector("button[name=againButton]");
        againButton.addEventListener("click", again);
        againButton.style.display = "none";
    }
    function again(): void {
        location.reload();
    }

    function startGame(): void {
        word = getWord();
        if (word.length < 2) {
            alert("You have to enter a Word with at least 2 Characters!");
            return;
        }
        let startField: HTMLDivElement = <HTMLDivElement>document.querySelector("div[name=startField]");
        startField.style.display = "none";
        shuffledWord = shuffleCards(word);
        spawnCards(shuffledWord);
        setTimeout(makeCardsInvisible, word.length * waitPerChar);
    }

    function getWord(): string {
        let input: HTMLInputElement = <HTMLInputElement>document.querySelector("input[name=wordInput]");
        return input.value;
    }

    function spawnCards(_word: string): void {
        for (let i: number = 0; i < _word.length; i++) {
            spawnCard(_word.charAt(i), i);
        }
    }
    function spawnCard(_char: string, _index: number): void {
        let container: HTMLDivElement = document.createElement("div");
        container.classList.add("cardUnchecked");

        let text: HTMLSpanElement = document.createElement("span");
        text.innerText = _char;

        container.appendChild(text);
        container.addEventListener("click", () => {
            cardSelected(_char, _index);
        });
        uncheckedField.appendChild(container);
    }
    function makeCardsInvisible(): void {
        for (let i: number = 0; i < uncheckedField.childElementCount; i++) {
            let child: HTMLElement = <HTMLElement>uncheckedField.children[i].children[0];
            child.style.display = "none";
        }
        isInvisible = true;
    }
    function makeCardsVisible(): void {
        for (let i: number = 0; i < uncheckedField.childElementCount; i++) {
            let child: HTMLElement = <HTMLElement>uncheckedField.children[i].children[0];
            child.style.display = "flex";
        }
        isInvisible = false;
    }
    function shuffleCards(_word: string): string {
        let temp: string = "";
        for (let i: number = _word.length; i > 0; i--) {
            let rnd: number = Math.floor(Math.random() * _word.length);
            temp += _word.charAt(rnd);
            _word = removeCharacterAtIndex(_word, rnd);
        }
        return temp;
    }
    function removeCharacterAtIndex(_word: string, _index: number): string {
        if (_word.length <= 1) {
            return "";
        }
        if (_index == 0) {
            return _word.slice(1, _word.length);
        }
        if (_index == _word.length - 1) {
            return _word.slice(0, _word.length - 1);
        }

        return _word.slice(0, _index) + _word.slice(_index + 1, _word.length); 
    }
    

    function cardSelected(_value: string, _index: number): void {
        if (isInvisible == true) {
            if (_value == word.charAt(actualIndex)) {
                rightAnswer(_index);
                actualIndex++;
                if (actualIndex == word.length) {
                    isInvisible = false;
                    againButton.style.display = "flex";
                    gameOverField.style.display = "flex";
                    gameOverField.innerText = "You Won!";
                }
            } else {
                wrongAnswer(_index);
                makeCardsVisible();
                
            }
        }
    }

    function rightAnswer(_index: number): void {
        for (let i: number = 0; i < uncheckedField.childElementCount; i++) {
            if (i == _index) {
                let child: HTMLElement = <HTMLElement>uncheckedField.children[i];
                child.classList.add("green");
                let text: HTMLElement = <HTMLElement>uncheckedField.children[i].children[0];
                text.style.display = "flex";
            }
        }
    }

    function wrongAnswer(_index: number): void {
        for (let i: number = 0; i < uncheckedField.childElementCount; i++) {
            if (i == _index) {
                let child: HTMLElement = <HTMLElement>uncheckedField.children[i];
                child.classList.add("red");
            }
        }
        againButton.style.display = "flex";
        gameOverField.innerText = "You Lose!";
        isInvisible = false;
    }
    
}
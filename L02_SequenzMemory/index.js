"use strict";
var WordMemory;
(function (WordMemory) {
    let word;
    let shuffledWord;
    let actualIndex = 0;
    let isInvisible = false;
    let waitPerChar = 500;
    let uncheckedField;
    let againButton;
    let gameOverField;
    window.addEventListener("load", init);
    function init() {
        document.querySelector("button[name=startButton]")?.addEventListener("click", startGame);
        uncheckedField = document.querySelector("div.uncheckedField");
        gameOverField = document.querySelector("h2[name=gameOverField]");
        gameOverField.style.display = "none";
        againButton = document.querySelector("button[name=againButton]");
        againButton.addEventListener("click", again);
        againButton.style.display = "none";
    }
    function again() {
        location.reload();
    }
    function startGame() {
        word = getWord();
        if (word.length < 2) {
            alert("You have to enter a Word with at least 2 Characters!");
            return;
        }
        let startField = document.querySelector("div[name=startField]");
        startField.style.display = "none";
        shuffledWord = shuffleCards(word);
        spawnCards(shuffledWord);
        setTimeout(makeCardsInvisible, word.length * waitPerChar);
    }
    function getWord() {
        let input = document.querySelector("input[name=wordInput]");
        return input.value;
    }
    function spawnCards(_word) {
        for (let i = 0; i < _word.length; i++) {
            spawnCard(_word.charAt(i), i);
        }
    }
    function spawnCard(_char, _index) {
        let container = document.createElement("div");
        container.classList.add("cardUnchecked");
        let text = document.createElement("span");
        text.innerText = _char;
        container.appendChild(text);
        container.addEventListener("click", () => {
            cardSelected(_char, _index);
        });
        uncheckedField.appendChild(container);
    }
    function makeCardsInvisible() {
        for (let i = 0; i < uncheckedField.childElementCount; i++) {
            let child = uncheckedField.children[i].children[0];
            child.style.display = "none";
        }
        isInvisible = true;
    }
    function makeCardsVisible() {
        for (let i = 0; i < uncheckedField.childElementCount; i++) {
            let child = uncheckedField.children[i].children[0];
            child.style.display = "flex";
        }
        isInvisible = false;
    }
    function shuffleCards(_word) {
        let temp = "";
        for (let i = _word.length; i > 0; i--) {
            let rnd = Math.floor(Math.random() * _word.length);
            temp += _word.charAt(rnd);
            _word = removeCharacterAtIndex(_word, rnd);
        }
        return temp;
    }
    function removeCharacterAtIndex(_word, _index) {
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
    function cardSelected(_value, _index) {
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
            }
            else {
                wrongAnswer(_index);
                makeCardsVisible();
            }
        }
    }
    function rightAnswer(_index) {
        for (let i = 0; i < uncheckedField.childElementCount; i++) {
            if (i == _index) {
                let child = uncheckedField.children[i];
                child.classList.add("green");
                let text = uncheckedField.children[i].children[0];
                text.style.display = "flex";
            }
        }
    }
    function wrongAnswer(_index) {
        for (let i = 0; i < uncheckedField.childElementCount; i++) {
            if (i == _index) {
                let child = uncheckedField.children[i];
                child.classList.add("red");
            }
        }
        againButton.style.display = "flex";
        gameOverField.innerText = "You Lose!";
        isInvisible = false;
    }
})(WordMemory || (WordMemory = {}));
//# sourceMappingURL=index.js.map
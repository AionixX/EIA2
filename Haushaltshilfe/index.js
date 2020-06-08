"use strict";
var Haushaltshilfe;
(function (Haushaltshilfe) {
    let Shops;
    (function (Shops) {
        Shops[Shops["None"] = 0] = "None";
        Shops[Shops["Aldi"] = 1] = "Aldi";
        Shops[Shops["Lidl"] = 2] = "Lidl";
        Shops[Shops["Edeka"] = 3] = "Edeka";
        Shops[Shops["Rewe"] = 4] = "Rewe";
        Shops[Shops["M\u00FCller"] = 5] = "M\u00FCller";
    })(Shops = Haushaltshilfe.Shops || (Haushaltshilfe.Shops = {}));
    Haushaltshilfe.workList = [
        {
            workTask: "wipe",
            price: 10,
            amount: 1
        }, {
            workTask: "mowing",
            price: 8,
            amount: 1
        }
    ];
    Haushaltshilfe.articleList = [
        {
            articleName: "Brot",
            amount: 1,
            price: 1.5,
            preferredShop: "None",
            unitType: [
                {
                    unitName: "Stück",
                    unitFactor: 1
                },
                {
                    unitName: "Gramm",
                    unitFactor: 0.01
                }
            ]
        },
        {
            articleName: "Wasser",
            amount: 1,
            price: 0.5,
            preferredShop: "None",
            unitType: [
                {
                    unitName: "Flasche",
                    unitFactor: 1.5
                },
                {
                    unitName: "Liter",
                    unitFactor: 1
                }
            ]
        }
    ];
    //#endregion
    window.addEventListener("load", init);
    let shoppingList = [];
    let workingList = [];
    let bankList = [];
    let addArticleButton;
    let articleListContainer;
    let addWorkButton;
    let workListContainer;
    let addBankButton;
    let bankListContainer;
    let shoppingCartDiv;
    let submitButton;
    function init() {
        getReferences();
        addEventListeners();
    }
    function getReferences() {
        addArticleButton = document.querySelector("#addArticleButton");
        articleListContainer = document.querySelector("#articleList");
        addWorkButton = document.querySelector("#addWorkButton");
        workListContainer = document.querySelector("#workList");
        addBankButton = document.querySelector("#addBankButton");
        bankListContainer = document.querySelector("#bankList");
        shoppingCartDiv = document.querySelector("#shoppingCart");
        submitButton = document.querySelector("#submitButton");
    }
    function addEventListeners() {
        addArticleButton.addEventListener("click", addArticle);
        addWorkButton.addEventListener("click", addWork);
        addBankButton.addEventListener("click", addBank);
        submitButton.addEventListener("click", submit);
    }
    /*
    let formData: FormData = new FormData(form);
      let query: URLSearchParams = new URLSearchParams(<any>formData);
      alert(query.toString());
      await fetch("https://cocktailbar-eia2.herokuapp.com?" + query.toString());
      */
    async function submit() {
        let tasks = {
            articles: shoppingList,
            work: workingList,
            bank: bankList
        };
        //let form: HTMLFormElement = <HTMLFormElement>document.querySelector("form");
        //let formData: FormData = new FormData(form);
        /*let query: URLSearchParams = new URLSearchParams(<any>tasks);
        alert(query.toString());
        await fetch("http:localhost:5001?" + query.toString());*/
        await fetch("https://haushaltshilfe.herokuapp.com", {
            method: "POST",
            body: JSON.stringify(tasks)
        });
    }
    function addBank() {
        let taskContainer = createTaskContainer();
        let bankSelect = createBankSelect();
        let amountInput = createAmountInput();
        let priceBefore = document.createElement("span");
        let price = document.createElement("span");
        let priceAfter = document.createElement("span");
        let deleteButton = document.createElement("button");
        amountInput.step = "5";
        priceBefore.innerText = " =  ";
        priceAfter.innerText = " €";
        deleteButton.innerText = "Delete";
        taskContainer.appendChild(bankSelect);
        taskContainer.appendChild(amountInput);
        taskContainer.appendChild(priceBefore);
        taskContainer.appendChild(price);
        taskContainer.appendChild(priceAfter);
        taskContainer.appendChild(deleteButton);
        bankListContainer.appendChild(taskContainer);
        let newBank = {
            bankTask: bankSelect.value,
            amount: parseFloat(amountInput.value)
        };
        bankList.push(newBank);
        updateBank();
        taskContainer.addEventListener("change", updateBank);
        deleteButton.addEventListener("click", deleteBank);
        function deleteBank() {
            taskContainer.remove();
            for (let i = 0; i < workingList.length; i++) {
                if (bankList[i] === newBank) {
                    bankList.splice(i, 1);
                }
            }
            console.log(bankList);
        }
        function updateBank() {
            price.innerText = parseFloat(amountInput.value).toFixed(2);
            newBank.bankTask = bankSelect.value;
            newBank.amount = parseFloat(amountInput.value);
            updateShoppingCart();
        }
    }
    function createBankSelect() {
        let bankSelect = document.createElement("select");
        let optionGet = createOption("Get Money");
        bankSelect.appendChild(optionGet);
        let optionBring = createOption("Bring Money");
        bankSelect.appendChild(optionBring);
        return bankSelect;
    }
    function addWork() {
        let taskContainer = createTaskContainer();
        let workSelect = createWorkSelect();
        let amountInput = createAmountInput();
        let priceBefore = document.createElement("span");
        let price = document.createElement("span");
        let priceAfter = document.createElement("span");
        let deleteButton = document.createElement("button");
        amountInput.step = "1";
        priceBefore.innerText = " =  ";
        priceAfter.innerText = " €";
        deleteButton.innerText = "Delete";
        taskContainer.appendChild(workSelect);
        taskContainer.appendChild(amountInput);
        taskContainer.appendChild(priceBefore);
        taskContainer.appendChild(price);
        taskContainer.appendChild(priceAfter);
        taskContainer.appendChild(deleteButton);
        workListContainer.appendChild(taskContainer);
        let newWork = {
            workTask: workSelect.value,
            price: parseFloat(price.innerText),
            amount: parseFloat(amountInput.value)
        };
        workingList.push(newWork);
        updateWork();
        taskContainer.addEventListener("change", updateWork);
        deleteButton.addEventListener("click", deleteWork);
        function deleteWork() {
            taskContainer.remove();
            for (let i = 0; i < workingList.length; i++) {
                if (workingList[i] === newWork) {
                    workingList.splice(i, 1);
                }
            }
            console.log(workingList);
        }
        function updateWork() {
            let work = getWork(workSelect);
            price.innerText = (work.price * parseFloat(amountInput.value)).toFixed(2);
            newWork.workTask = workSelect.value;
            newWork.price = parseFloat(price.innerText);
            newWork.amount = parseFloat(amountInput.value);
            updateShoppingCart();
        }
    }
    function getWork(_workSelect) {
        let work = Haushaltshilfe.workList[0];
        Haushaltshilfe.workList.forEach(element => {
            if (element.workTask == _workSelect.value) {
                work = element;
            }
        });
        return work;
    }
    function createWorkSelect() {
        let workSelect = document.createElement("select");
        Haushaltshilfe.workList.forEach(element => {
            let option = createOption(element.workTask);
            workSelect.appendChild(option);
        });
        return workSelect;
    }
    function addArticle() {
        let taskContainer = createTaskContainer();
        let articleSelect = createArticleSelect();
        let amountInput = createAmountInput();
        let unitInput = createSelect();
        let preferredShopSelect = createShopSelect();
        let priceBefore = document.createElement("span");
        let priceElement = document.createElement("span");
        let priceAfter = document.createElement("span");
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.type = "button";
        deleteButton.addEventListener("click", deleteArticle);
        priceBefore.innerText = " = ";
        priceAfter.innerText = " €";
        taskContainer.appendChild(articleSelect);
        taskContainer.appendChild(amountInput);
        taskContainer.appendChild(unitInput);
        taskContainer.appendChild(preferredShopSelect);
        taskContainer.appendChild(priceBefore);
        taskContainer.appendChild(priceElement);
        taskContainer.appendChild(priceAfter);
        taskContainer.appendChild(deleteButton);
        articleListContainer.appendChild(taskContainer);
        let newArticle = {
            articleName: articleSelect.value,
            amount: parseFloat(amountInput.value),
            price: parseFloat(priceElement.innerText),
            unitType: [getUnit(getArticle(articleSelect), unitInput)],
            preferredShop: preferredShopSelect.value
        };
        articleSelect.addEventListener("change", updateUnits);
        taskContainer.addEventListener("change", updateArticle);
        shoppingList.push(newArticle);
        updateUnits();
        updateArticle();
        //<--------------------------------------------------------------------- Closures ------------------------------------------------------>
        function updateArticle() {
            let article = getArticle(articleSelect);
            let unit = getUnit(article, unitInput);
            priceElement.innerText = (article.price * unit.unitFactor * parseFloat(amountInput.value)).toFixed(2);
            newArticle.articleName = article.articleName;
            newArticle.amount = parseFloat(amountInput.value);
            newArticle.price = parseFloat(priceElement.innerText);
            newArticle.unitType = [unit];
            newArticle.preferredShop = preferredShopSelect.value;
            updateShoppingCart();
        }
        function updateUnits() {
            while (unitInput.firstChild) {
                unitInput.firstChild.remove();
            }
            getArticle(articleSelect).unitType.forEach(element => {
                fillSelect(unitInput, element.unitName);
            });
        }
        function deleteArticle() {
            taskContainer.remove();
            for (let i = 0; i < shoppingList.length; i++) {
                if (shoppingList[i] === newArticle) {
                    shoppingList.splice(i, 1);
                }
            }
        }
        //<--------------------------------------------------------------------- Closures end -------------------------------------------------->
    }
    function updateShoppingCart() {
        clearShoppingCart();
        if (shoppingList.length > 0) {
            let shoppingSpan = document.createElement("span");
            shoppingSpan.innerHTML = "Shopping (" + shoppingList.length + " Elements) : " + getShoppingCosts() + " € <br/>";
            shoppingSpan.setAttribute("price", getShoppingCosts().toString());
            let shoppingFee = document.createElement("span");
            shoppingFee.innerHTML = "Fee: 10.00 €<br/><br/>";
            shoppingFee.setAttribute("price", "10");
            shoppingCartDiv.appendChild(shoppingSpan);
            shoppingCartDiv.appendChild(shoppingFee);
        }
        if (workingList.length > 0) {
            let workingSpan = document.createElement("span");
            workingSpan.innerHTML = "Work (" + workingList.length + " Elements) : " + getWorkingCosts() + " € <br/><br/>";
            workingSpan.setAttribute("price", getWorkingCosts().toString());
            shoppingCartDiv.appendChild(workingSpan);
        }
        if (bankList.length > 0) {
            let bankSpan = document.createElement("span");
            bankSpan.innerHTML = "Bank (" + bankList.length + " Elements) <br/>";
            let bankFee = document.createElement("span");
            bankFee.innerHTML = "Fee: " + (bankList.length * 5).toFixed(2) + "€<br/><br/>";
            bankFee.setAttribute("price", "10");
            shoppingCartDiv.appendChild(bankSpan);
            shoppingCartDiv.appendChild(bankFee);
        }
        let allCosts = 0;
        for (let element of shoppingCartDiv.children) {
            let price = element.getAttribute("price");
            if (price) {
                allCosts += parseFloat(price);
            }
        }
        if (allCosts > 0) {
            let total = document.createElement("span");
            total.innerHTML = "<strong>Total: " + allCosts + " €</strong>";
            shoppingCartDiv.appendChild(total);
        }
    }
    function getShoppingCosts() {
        let costs = 0;
        shoppingList.forEach(element => {
            costs += element.price;
        });
        return costs;
    }
    function getWorkingCosts() {
        let costs = 0;
        workingList.forEach(element => {
            costs += element.price;
        });
        return costs;
    }
    function clearShoppingCart() {
        while (shoppingCartDiv.firstChild)
            shoppingCartDiv.firstChild.remove();
    }
    function createTaskContainer() {
        let container = document.createElement("div");
        return container;
    }
    function createArticleSelect() {
        let select = document.createElement("select");
        Haushaltshilfe.articleList.forEach(element => {
            let option = document.createElement("option");
            option.innerText = element.articleName;
            select.appendChild(option);
        });
        return select;
    }
    function createAmountInput() {
        let input = document.createElement("input");
        input.min = "0";
        input.step = "0.1";
        input.type = "number";
        input.value = "1";
        return input;
    }
    function createOption(_option) {
        let option = document.createElement("option");
        option.innerText = _option;
        return option;
    }
    function createSelect() {
        let select = document.createElement("select");
        return select;
    }
    function fillSelect(_select, _option) {
        _select.appendChild(createOption(_option));
    }
    function createShopSelect() {
        let select = document.createElement("select");
        for (let element in Shops) {
            let option = document.createElement("option");
            if (!isNaN(Number(element))) {
                option.innerText = Shops[element];
                select.appendChild(option);
            }
        }
        return select;
    }
    function getArticle(_articleSleect) {
        let article = Haushaltshilfe.articleList[0];
        Haushaltshilfe.articleList.forEach(element => {
            if (element.articleName == _articleSleect.value) {
                article = element;
            }
        });
        return article;
    }
    function getUnit(_article, _unitInput) {
        let unit = Haushaltshilfe.articleList[0].unitType[0];
        _article.unitType.forEach(element => {
            if (element.unitName == _unitInput.value) {
                unit = element;
            }
        });
        return unit;
    }
})(Haushaltshilfe || (Haushaltshilfe = {}));
//# sourceMappingURL=index.js.map
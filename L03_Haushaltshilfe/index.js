"use strict";
var HaushaltshilfeOld;
(function (HaushaltshilfeOld) {
    window.addEventListener("load", init);
    let contentContainer;
    let totalCosts;
    const TASKS = [
        "Auswählen",
        "Einkaufen",
        "Haushaltsarbeiten",
        "Bank"
    ];
    const HAUSHALTSARBEITEN = [
        "Rasenmähen",
        "Post",
        "Wischen",
        "Staubsaugen"
    ];
    const EINHEITEN = [
        "Gramm",
        "Liter",
        "Packung",
        "Stück"
    ];
    let Preise;
    (function (Preise) {
        Preise[Preise["Einkaufen"] = 10] = "Einkaufen";
        Preise[Preise["Rasenm\u00E4hen"] = 10] = "Rasenm\u00E4hen";
        Preise[Preise["Post"] = 5] = "Post";
        Preise[Preise["Wischen"] = 7] = "Wischen";
        Preise[Preise["Staubsaugen"] = 5] = "Staubsaugen";
        Preise[Preise["Bank"] = 5] = "Bank";
    })(Preise || (Preise = {}));
    class ShoppingElement {
        constructor(name, price, amount, shop) {
            this.elementName = name;
            this.elementPrice = price;
            this.elementAmount = amount;
            if (shop) {
                this.wantedFromShop = shop;
            }
            else {
                this.wantedFromShop = "-";
            }
        }
    }
    const ARTICLES = [
        new ShoppingElement("Brot", [0.02, 1, 1, 2], 1),
        new ShoppingElement("Wasser", [0.01, 1, 9, 1.5], 1),
        new ShoppingElement("Salz", [0.005, 1, 2, 2], 1),
        new ShoppingElement("Sahne", [0.01, 5, 2, 2], 1)
    ];
    function init() {
        contentContainer = document.querySelector("div[name=Content]");
        document.querySelector("button[name=AddButton]")?.addEventListener("click", AddTask);
        CreateTotalCostsDiv();
    }
    function CreateTotalCostsDiv() {
        totalCosts = document.createElement("div");
        totalCosts.innerText = "Gesamt: 0€";
        document.body.appendChild(totalCosts);
    }
    function UpdateCosts() {
        let amount = 0;
        let elements = document.querySelectorAll(".totalCosts");
        console.log(elements);
        elements.forEach(function (node) {
            console.log(node.innerText);
            console.log(totalCosts);
            amount += Number.parseFloat(node.innerText);
        });
        totalCosts.innerText = "Gesamt: " + amount + "€";
    }
    function AddTask() {
        let task = CreateTaskDiv();
        let dropDown = CreateTaskDropDown();
        dropDown.addEventListener("change", () => {
            UpdateTask(task, dropDown);
        });
        task.appendChild(dropDown);
        let deleteButton = CreateDeleteButton();
        deleteButton.addEventListener("click", () => {
            DeleteTask(task);
        });
        task.appendChild(deleteButton);
        contentContainer.appendChild(task);
    }
    function DeleteTask(task) {
        task.remove();
        UpdateCosts();
    }
    function UpdateTask(task, dropDown) {
        ClearTask(task);
        console.log(dropDown.value);
        switch (dropDown.value) {
            case "Einkaufen":
                task.appendChild(CreateShoppingDiv());
                break;
            case "Haushaltsarbeiten":
                task.appendChild(CreateWorkDiv());
                break;
            case "Bank":
                task.appendChild(CreateBankDiv());
                break;
        }
        UpdateCosts();
    }
    function CreateShoppingDiv() {
        let shoppingDiv = document.createElement("div");
        let articleSelector = CreateArticleSelector();
        shoppingDiv.appendChild(articleSelector);
        let articleList = CreateList();
        shoppingDiv.appendChild(articleList);
        let priceTable = CreateShoppingPriceTable();
        priceTable.id = "priceTable";
        shoppingDiv.appendChild(priceTable);
        articleSelector.addEventListener("change", () => {
            AddItemToList(articleList, articleSelector, shoppingDiv);
        });
        return shoppingDiv;
    }
    function CreateShoppingPriceTable() {
        let priceTable = document.createElement("div");
        let shoppingCosts = document.createElement("div");
        shoppingCosts.id = "ShoppingCosts";
        priceTable.appendChild(shoppingCosts);
        let shoppingFee = document.createElement("div");
        shoppingFee.id = "ShoppingFee";
        priceTable.appendChild(shoppingFee);
        let totalCosts = document.createElement("div");
        totalCosts.id = "totalCosts";
        let textBefore = document.createElement("span");
        textBefore.innerText = "Gesamt: ";
        totalCosts.appendChild(textBefore);
        let totalCostsAmount = document.createElement("span");
        totalCostsAmount.classList.add("totalCosts");
        totalCosts.appendChild(totalCostsAmount);
        let textAfter = document.createElement("span");
        textAfter.innerText = " €";
        totalCosts.appendChild(textAfter);
        priceTable.appendChild(totalCosts);
        return priceTable;
    }
    function UpdatePriceTable(articleList, shoppingDiv) {
        let totalAmount = 0;
        for (let i = 0; i < articleList.children.length; i++) {
            for (let x = 0; x < articleList.children[i].children.length; x++) {
                if (articleList.children[i].children[x].id == "price") {
                    let el = articleList.children[i].children[x];
                    totalAmount += Number.parseFloat(el.innerText);
                }
            }
        }
        for (let i = 0; i < shoppingDiv.children.length; i++) {
            if (shoppingDiv.children[i].id == "priceTable") {
                let priceTable = shoppingDiv.children[i];
                for (let x = 0; x < priceTable.children.length; x++) {
                    if (priceTable.children[x].id == "ShoppingCosts") {
                        priceTable.children[x].innerHTML = "Kosten für den Einkauf: " + totalAmount + "€";
                    }
                    if (priceTable.children[x].id == "ShoppingFee") {
                        priceTable.children[x].innerHTML = "Gebühren für den Einkauf: " + Preise.Einkaufen + "€";
                    }
                    if (priceTable.children[x].id == "totalCosts") {
                        for (let y = 0; y < priceTable.children[x].children.length; y++) {
                            if (priceTable.children[x].children[y].classList.contains("totalCosts")) {
                                priceTable.children[x].children[y].innerHTML = (totalAmount + Preise.Einkaufen).toString();
                            }
                        }
                    }
                }
            }
        }
        UpdateCosts();
    }
    function CreateList() {
        let articleList = document.createElement("div");
        articleList.id = "ShoppingTable";
        return articleList;
    }
    function AddItemToList(articleList, selector, shoppingDiv) {
        for (let i = 0; i < articleList.children.length; i++) {
            if (articleList.children[i].id == selector.value) {
                return;
            }
        }
        for (let i = 0; i < ARTICLES.length; i++) {
            if (ARTICLES[i].elementName == selector.value) {
                articleList.appendChild(CreateItemDiv(ARTICLES[i], articleList, shoppingDiv));
            }
        }
        UpdatePriceTable(articleList, shoppingDiv);
        UpdateCosts();
    }
    function CreateItemDiv(article, articleList, shoppingDiv) {
        let container = document.createElement("div");
        container.id = article.elementName;
        let itemName = document.createElement("span");
        itemName.innerHTML = "Artikel: " + article.elementName + " | Menge: ";
        let itemAmount = document.createElement("input");
        itemAmount.id = "AmountInput";
        itemAmount.type = "Number";
        itemAmount.value = article.elementAmount.toString();
        itemAmount.addEventListener("change", () => {
            UpdateItem(container, article, articleList, shoppingDiv);
        });
        let itemUnit = document.createElement("select");
        itemUnit.id = "UnitSelector";
        for (let i = 0; i < EINHEITEN.length; i++) {
            let optionElement = document.createElement("option");
            optionElement.innerText = EINHEITEN[i];
            itemUnit.options.add(optionElement);
        }
        itemUnit.addEventListener("change", () => {
            UpdateItem(container, article, articleList, shoppingDiv);
        });
        let itemPrice = document.createElement("span");
        itemPrice.id = "itemPrice";
        itemPrice.innerText = article.elementPrice[0] + "€ / " + itemUnit.value + " | Gesamt: ";
        let price = document.createElement("span");
        price.id = "price";
        price.innerText = (article.elementPrice[0] * article.elementAmount);
        let euroSign = document.createElement("span");
        euroSign.innerText = " €";
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Löschen";
        deleteButton.addEventListener("click", () => {
            container.remove();
            UpdatePriceTable(articleList, shoppingDiv);
        });
        container.appendChild(itemName);
        container.appendChild(itemAmount);
        container.appendChild(itemUnit);
        container.appendChild(itemPrice);
        container.appendChild(price);
        container.appendChild(euroSign);
        container.appendChild(deleteButton);
        return container;
    }
    function UpdateItem(item, article, articleList, shoppingDiv) {
        let unitIndex = 0;
        let amount = 1;
        for (let i = 0; i < item.children.length; i++) {
            if (item.children[i].id == "AmountInput") {
                let el = item.children[i];
                amount = el.value;
            }
            if (item.children[i].id == "UnitSelector") {
                let el = item.children[i];
                unitIndex = el.selectedIndex;
            }
        }
        for (let i = 0; i < item.children.length; i++) {
            if (item.children[i].id == "itemPrice") {
                let el = item.children[i];
                el.innerText = article.elementPrice[unitIndex] + "€ / " + EINHEITEN[unitIndex] + " | Gesamt: ";
            }
            if (item.children[i].id == "price") {
                let el = item.children[i];
                el.innerText = (article.elementPrice[unitIndex] * amount).toString();
            }
        }
        UpdatePriceTable(articleList, shoppingDiv);
    }
    function CreateArticleSelector() {
        let selector = document.createElement("select");
        let option = document.createElement("option");
        option.innerText = "Auswählen";
        selector.appendChild(option);
        for (let i = 0; i < ARTICLES.length; i++) {
            let option = document.createElement("option");
            option.innerText = ARTICLES[i].elementName;
            selector.appendChild(option);
        }
        return selector;
    }
    function CreateWorkDiv() {
        let workDiv = document.createElement("div");
        let workSelect = document.createElement("select");
        console.log("heew");
        for (let i = 0; i < HAUSHALTSARBEITEN.length; i++) {
            let option = document.createElement("option");
            option.innerText = HAUSHALTSARBEITEN[i];
            workSelect.appendChild(option);
        }
        workDiv.appendChild(workSelect);
        let priceDiv = document.createElement("div");
        let priceBefore = document.createElement("span");
        priceBefore.innerText = "Gesamt: ";
        let totalPrice = document.createElement("span");
        totalPrice.classList.add("totalCosts");
        totalPrice.innerText = 0 + "";
        let priceAfter = document.createElement("span");
        priceAfter.innerText = " €";
        workSelect.addEventListener("change", () => {
            UpdateWorkDiv(totalPrice, workSelect);
        });
        priceDiv.appendChild(priceBefore);
        priceDiv.appendChild(totalPrice);
        priceDiv.appendChild(priceAfter);
        workDiv.appendChild(priceDiv);
        UpdateWorkDiv(totalPrice, workSelect);
        return workDiv;
    }
    function UpdateWorkDiv(price, select) {
        switch (select.value) {
            case "Rasenmähen":
                price.innerText = Preise.Rasenmähen.toString();
                break;
            case "Post":
                price.innerText = Preise.Post.toString();
                break;
            case "Wischen":
                price.innerText = Preise.Wischen.toString();
                break;
            case "Staubsaugen":
                price.innerText = Preise.Staubsaugen.toString();
                break;
        }
        UpdateCosts();
    }
    function CreateBankDiv() {
        let bankDiv = document.createElement("div");
        let amountInput = document.createElement("input");
        amountInput.type = "Number";
        amountInput.value = "0";
        bankDiv.appendChild(amountInput);
        let amountDiv = document.createElement("div");
        amountDiv.innerText = "Abheben: " + amountInput.value.toString();
        let feeDiv = document.createElement("div");
        feeDiv.innerText = "Gebühren: " + Preise.Bank.toString();
        let priceDiv = document.createElement("div");
        let priceBefore = document.createElement("span");
        priceBefore.innerText = "Gesamt: ";
        let totalPrice = document.createElement("span");
        totalPrice.classList.add("totalCosts");
        let num1 = Number.parseFloat(amountDiv.innerText);
        let num2 = Number.parseFloat(feeDiv.innerText);
        totalPrice.innerText = (num1 + num2).toString();
        let priceAfter = document.createElement("span");
        priceAfter.innerText = " €";
        priceDiv.appendChild(priceBefore);
        priceDiv.appendChild(totalPrice);
        priceDiv.appendChild(priceAfter);
        amountInput.addEventListener("change", () => {
            UpdateBankDiv(amountDiv, totalPrice, amountInput);
        });
        UpdateBankDiv(amountDiv, totalPrice, amountInput);
        bankDiv.appendChild(amountDiv);
        bankDiv.appendChild(feeDiv);
        bankDiv.appendChild(priceDiv);
        return bankDiv;
    }
    function UpdateBankDiv(amount, total, input) {
        amount.innerText = "Abheben: " + input.value.toString();
        total.innerText = (Number.parseFloat(input.value) + Number.parseFloat(Preise.Bank.toString())).toString();
        UpdateCosts();
    }
    function ClearTask(task) {
        for (let i = 0; i < task.childElementCount; i++) {
            if (task.children[i].id != "TaskDropDown" && task.children[i].id != "DeleteButton") {
                task.children[i].remove();
            }
        }
    }
    function CreateTaskDiv() {
        let divElement = document.createElement("div");
        divElement.classList.add("task");
        return divElement;
    }
    function CreateTaskDropDown() {
        let dropDown = document.createElement("select");
        dropDown.id = "TaskDropDown";
        for (let i = 0; i < TASKS.length; i++) {
            let optionElement = document.createElement("option");
            optionElement.innerText = TASKS[i];
            dropDown.options.add(optionElement);
        }
        return dropDown;
    }
    function CreateDeleteButton() {
        let delButton = document.createElement("button");
        delButton.id = "DeleteButton";
        delButton.textContent = "Löschen";
        return delButton;
    }
})(HaushaltshilfeOld || (HaushaltshilfeOld = {}));
//# sourceMappingURL=index.js.map
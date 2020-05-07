namespace Haushaltshilfe {

    window.addEventListener("load", init);

    let contentContainer: HTMLDivElement;
    let totalCosts: HTMLDivElement;

    const TASKS: string[] = [
        "Auswählen",
        "Einkaufen",
        "Haushaltsarbeiten",
        "Bank"
    ];
    const HAUSHALTSARBEITEN: string[] = [
        "Rasenmähen",
        "Post",
        "Wischen",
        "Staubsaugen"
    ];
    const EINHEITEN: string[] = [
        "Gramm",
        "Liter",
        "Packung",
        "Stück"
    ];
    enum Preise {
        Einkaufen = 10,
        Rasenmähen = 10,
        Post = 5,
        Wischen = 7,
        Staubsaugen = 5,
        Bank = 5
    }
    class ShoppingElement {
        elementName: string;
        elementPrice: number[];
        elementAmount: number;
        wantedFromShop: string;

        constructor(name: string, price: number[], amount: number, shop?: string) {
            this.elementName = name;
            this.elementPrice = price;
            this.elementAmount = amount;
            if (shop) {
                this.wantedFromShop = shop;
            } else {
                this.wantedFromShop = "-";
            }
        }
    }
    const ARTICLES: ShoppingElement[] = [
        new ShoppingElement("Brot", [0.02, 1, 1, 2], 1),
        new ShoppingElement("Wasser", [0.01, 1, 9, 1.5], 1),
        new ShoppingElement("Salz", [0.005, 1, 2, 2], 1),
        new ShoppingElement("Sahne", [0.01, 5, 2, 2], 1)
    ];
    function init(): void {
        contentContainer = <HTMLDivElement>document.querySelector("div[name=Content]");
        document.querySelector("button[name=AddButton]")?.addEventListener("click", AddTask);
        CreateTotalCostsDiv();
    }
    function CreateTotalCostsDiv(): void {
        totalCosts = document.createElement("div");
        totalCosts.innerText = "Gesamt: 0€";
        document.body.appendChild(totalCosts);
    }
    function UpdateCosts(): void {
        let amount: number = 0;
        let elements: NodeListOf<HTMLSpanElement> = document.querySelectorAll(".totalCosts");
        console.log(elements);
        elements.forEach(function(node: HTMLSpanElement): void {
            console.log(node.innerText);
            console.log(totalCosts);
            amount += Number.parseFloat(node.innerText);
        });
        totalCosts.innerText = "Gesamt: " + amount + "€";
    }
    function AddTask(): void {
        let task: HTMLDivElement = CreateTaskDiv();

        let dropDown: HTMLSelectElement = CreateTaskDropDown();
        dropDown.addEventListener("change", () => {
            UpdateTask(task, dropDown);
        });
        task.appendChild(dropDown);

        let deleteButton: HTMLButtonElement = CreateDeleteButton();
        deleteButton.addEventListener("click", () => {
            DeleteTask(task);
        });
        task.appendChild(deleteButton);

        contentContainer.appendChild(task);
    }
    function DeleteTask(task: HTMLDivElement): void {
        task.remove();
        UpdateCosts();
    }
    function UpdateTask(task: HTMLDivElement, dropDown: HTMLSelectElement): void {
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
    function CreateShoppingDiv(): HTMLDivElement {
        let shoppingDiv: HTMLDivElement = document.createElement("div");

        let articleSelector: HTMLSelectElement = CreateArticleSelector();
        shoppingDiv.appendChild(articleSelector);
        
        let articleList: HTMLDivElement = CreateList();
        shoppingDiv.appendChild(articleList);

        let priceTable: HTMLDivElement = CreateShoppingPriceTable();
        priceTable.id = "priceTable";
        shoppingDiv.appendChild(priceTable);

        articleSelector.addEventListener("change", () => {
            AddItemToList(articleList, articleSelector, shoppingDiv);
        });

        return shoppingDiv;
    }
    function CreateShoppingPriceTable(): HTMLDivElement {
        let priceTable: HTMLDivElement = document.createElement("div");

        let shoppingCosts: HTMLDivElement = document.createElement("div");
        shoppingCosts.id = "ShoppingCosts";
        priceTable.appendChild(shoppingCosts);

        let shoppingFee: HTMLDivElement = document.createElement("div");
        shoppingFee.id = "ShoppingFee";
        priceTable.appendChild(shoppingFee);

        let totalCosts: HTMLDivElement = document.createElement("div");
        totalCosts.id = "totalCosts";

        let textBefore: HTMLSpanElement = document.createElement("span");
        textBefore.innerText = "Gesamt: ";
        totalCosts.appendChild(textBefore);

        let totalCostsAmount: HTMLSpanElement = document.createElement("span");
        totalCostsAmount.classList.add("totalCosts");
        totalCosts.appendChild(totalCostsAmount);

        let textAfter: HTMLSpanElement = document.createElement("span");
        textAfter.innerText = " €";
        totalCosts.appendChild(textAfter);

        priceTable.appendChild(totalCosts);

        return priceTable;
    }
    function UpdatePriceTable(articleList: HTMLDivElement, shoppingDiv: HTMLDivElement): void {
        let totalAmount: number = 0;
        for (let i: number = 0; i < articleList.children.length; i++) {
            for (let x: number = 0; x < articleList.children[i].children.length; x++) {
                if (articleList.children[i].children[x].id == "price") {
                    let el: HTMLSpanElement = <HTMLSpanElement>articleList.children[i].children[x];
                    totalAmount += Number.parseFloat(el.innerText);
                }
            }
        }
        for (let i: number = 0; i < shoppingDiv.children.length; i++) {
            if (shoppingDiv.children[i].id == "priceTable") {
                let priceTable: HTMLDivElement = <HTMLDivElement>shoppingDiv.children[i];

                for (let x: number = 0; x < priceTable.children.length; x++) {
                    if (priceTable.children[x].id == "ShoppingCosts") {
                        priceTable.children[x].innerHTML = "Kosten für den Einkauf: " + totalAmount + "€";
                    }
                    if (priceTable.children[x].id == "ShoppingFee") {
                        priceTable.children[x].innerHTML = "Gebühren für den Einkauf: " + Preise.Einkaufen + "€";
                    }
                    if (priceTable.children[x].id == "totalCosts") {
                        for (let y: number = 0; y < priceTable.children[x].children.length; y++) {
                            if (priceTable.children[x].children[y].classList.contains("totalCosts")) {
                                priceTable.children[x].children[y].innerHTML = (<number>totalAmount + <number>Preise.Einkaufen).toString();
                            }
                        }
                    }
                }
            }
        }
        UpdateCosts();
    }
    function CreateList(): HTMLDivElement {
        let articleList: HTMLDivElement = document.createElement("div");
        articleList.id = "ShoppingTable";
        return articleList;
    }
    function AddItemToList(articleList: HTMLDivElement, selector: HTMLSelectElement, shoppingDiv: HTMLDivElement): void {
        for (let i: number = 0; i < articleList.children.length; i++) {
            if (articleList.children[i].id == selector.value) {
                return;
            }
        }
        for (let i: number = 0; i < ARTICLES.length; i++) {
            if (ARTICLES[i].elementName == selector.value) {
                articleList.appendChild(CreateItemDiv(ARTICLES[i], articleList, shoppingDiv));
                
            }
        }
        UpdatePriceTable(articleList, shoppingDiv);
        UpdateCosts();
    }
    function CreateItemDiv(article: ShoppingElement, articleList: HTMLDivElement, shoppingDiv: HTMLDivElement): HTMLDivElement {
        let container: HTMLDivElement = document.createElement("div");
        container.id = article.elementName;

        let itemName: HTMLSpanElement = document.createElement("span");
        itemName.innerHTML = "Artikel: " + article.elementName + " | Menge: ";

        let itemAmount: HTMLInputElement = document.createElement("input");
        itemAmount.id = "AmountInput";
        itemAmount.type = "Number";
        itemAmount.value = article.elementAmount.toString();
        itemAmount.addEventListener("change", () => {
            UpdateItem(container, article, articleList, shoppingDiv);
        });

        let itemUnit: HTMLSelectElement = document.createElement("select");
        itemUnit.id = "UnitSelector";
        for (let i: number = 0; i < EINHEITEN.length; i++) {
            let optionElement: HTMLOptionElement = document.createElement("option");
            optionElement.innerText = EINHEITEN[i];
            itemUnit.options.add(optionElement);
        }
        itemUnit.addEventListener("change", () => {
            UpdateItem(container, article, articleList, shoppingDiv);
        });

        let itemPrice: HTMLSpanElement = document.createElement("span");
        itemPrice.id = "itemPrice";
        itemPrice.innerText = article.elementPrice[0] + "€ / " + itemUnit.value + " | Gesamt: ";

        let price: HTMLSpanElement = document.createElement("span");
        price.id = "price";
        price.innerText = <string><unknown>(article.elementPrice[0] * article.elementAmount);

        let euroSign: HTMLSpanElement = document.createElement("span");
        euroSign.innerText = " €";

        let deleteButton: HTMLButtonElement = document.createElement("button");
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
    function UpdateItem(item: HTMLDivElement, article: ShoppingElement, articleList: HTMLDivElement, shoppingDiv: HTMLDivElement): void {
        let unitIndex: number = 0;
        let amount: number = 1;
        for (let i: number = 0; i < item.children.length; i++) {
            if (item.children[i].id == "AmountInput") {
                let el: HTMLInputElement = <HTMLInputElement>item.children[i];
                amount = <number><unknown>el.value;
            }
            if (item.children[i].id == "UnitSelector") {
                let el: HTMLSelectElement = <HTMLSelectElement>item.children[i];
                unitIndex = el.selectedIndex;
            }
        }
        for (let i: number = 0; i < item.children.length; i++) {
            if (item.children[i].id == "itemPrice") {
                let el: HTMLSpanElement = <HTMLSpanElement>item.children[i];
                el.innerText = article.elementPrice[unitIndex] + "€ / " + EINHEITEN[unitIndex] + " | Gesamt: ";
            }
            if (item.children[i].id == "price") {
                let el: HTMLSpanElement = <HTMLSpanElement>item.children[i];
                el.innerText = (article.elementPrice[unitIndex] * amount).toString();
            }
        }
        UpdatePriceTable(articleList, shoppingDiv);
    }
    function CreateArticleSelector(): HTMLSelectElement {
        let selector: HTMLSelectElement = document.createElement("select");

        let option: HTMLOptionElement = document.createElement("option");
        option.innerText = "Auswählen";
        selector.appendChild(option);

        for (let i: number = 0; i < ARTICLES.length; i++) {
            let option: HTMLOptionElement = document.createElement("option");
            option.innerText = ARTICLES[i].elementName;
            selector.appendChild(option);
        }
        return selector;
    }
    function CreateWorkDiv(): HTMLDivElement {
        let workDiv: HTMLDivElement = document.createElement("div");

        let workSelect: HTMLSelectElement = document.createElement("select");
        console.log("heew");
        for (let i: number = 0; i < HAUSHALTSARBEITEN.length; i++) {
            let option: HTMLOptionElement = document.createElement("option");
            option.innerText = HAUSHALTSARBEITEN[i];
            workSelect.appendChild(option);
        }
        workDiv.appendChild(workSelect);

        let priceDiv: HTMLDivElement = document.createElement("div");

        let priceBefore: HTMLSpanElement = document.createElement("span");
        priceBefore.innerText = "Gesamt: ";
        
        let totalPrice: HTMLSpanElement = document.createElement("span");
        totalPrice.classList.add("totalCosts");
        totalPrice.innerText = 0 + "";

        let priceAfter: HTMLSpanElement = document.createElement("span");
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
    function UpdateWorkDiv(price: HTMLSpanElement, select: HTMLSelectElement): void {
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
    function CreateBankDiv(): HTMLDivElement {
        let bankDiv: HTMLDivElement = document.createElement("div");

        let amountInput: HTMLInputElement = document.createElement("input");
        amountInput.type = "Number";
        amountInput.value = "0";
        bankDiv.appendChild(amountInput);
        
        let amountDiv: HTMLDivElement = document.createElement("div");
        amountDiv.innerText = "Abheben: " + amountInput.value.toString();

        let feeDiv: HTMLDivElement = document.createElement("div");
        feeDiv.innerText = "Gebühren: " + Preise.Bank.toString();

        let priceDiv: HTMLDivElement = document.createElement("div");
        
        let priceBefore: HTMLSpanElement = document.createElement("span");
        priceBefore.innerText = "Gesamt: ";
        
        let totalPrice: HTMLSpanElement = document.createElement("span");
        totalPrice.classList.add("totalCosts");
        let num1: number = Number.parseFloat(amountDiv.innerText);
        let num2: number = Number.parseFloat(feeDiv.innerText);
        totalPrice.innerText = (num1 + num2).toString();
        
        let priceAfter: HTMLSpanElement = document.createElement("span");
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
    function UpdateBankDiv(amount: HTMLDivElement, total: HTMLSpanElement, input: HTMLInputElement): void {
        amount.innerText = "Abheben: " + input.value.toString();
        total.innerText = (Number.parseFloat(input.value) + Number.parseFloat(Preise.Bank.toString())).toString();
        UpdateCosts();
    }
    function ClearTask(task: HTMLDivElement): void {
        for (let i: number = 0; i < task.childElementCount; i++) {
            if (task.children[i].id != "TaskDropDown" && task.children[i].id != "DeleteButton") {
                task.children[i].remove();
            }
        }
    }
    function CreateTaskDiv(): HTMLDivElement {
        let divElement: HTMLDivElement = document.createElement("div");
        divElement.classList.add("task");
        return divElement;
    }
    function CreateTaskDropDown(): HTMLSelectElement {
        let dropDown: HTMLSelectElement = document.createElement("select");
        dropDown.id = "TaskDropDown";
        for (let i: number = 0; i < TASKS.length; i++) {
            let optionElement: HTMLOptionElement = document.createElement("option");
            optionElement.innerText = TASKS[i];
            dropDown.options.add(optionElement);
        }
        return dropDown;
    }
    function CreateDeleteButton(): HTMLButtonElement {
        let delButton: HTMLButtonElement = document.createElement("button");
        delButton.id = "DeleteButton";
        delButton.textContent = "Löschen";
        return delButton;
    }
}
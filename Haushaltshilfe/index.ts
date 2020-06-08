namespace Haushaltshilfe {

  //#region Data
  export interface Task {
    articles: Article[] | null;
    bank: Bank[] | null;
    work: Work[] | null;
  }
  export interface Shopping {
    article: Article[];
  }

  export interface Article {
    articleName: string;
    amount: number;
    price: number;
    unitType: Unit[];
    preferredShop: string;
  }

  export interface Unit {
    unitName: string;
    unitFactor: number;
  }

  export interface Bank {
    bankTask: string;
    amount: number;
  }

  export interface Work {
    workTask: string;
    price: number;
    amount: number;
  }
  export enum Shops {
    None,
    Aldi,
    Lidl,
    Edeka,
    Rewe,
    Müller
  }
  export let workList: Work[] = [
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

  export let articleList: Article[] = [
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

  let shoppingList: Article[] = [];
  let workingList: Work[] = [];
  let bankList: Bank[] = [];

  let addArticleButton: HTMLButtonElement;
  let articleListContainer: HTMLDivElement;

  let addWorkButton: HTMLButtonElement;
  let workListContainer: HTMLDivElement;

  let addBankButton: HTMLButtonElement;
  let bankListContainer: HTMLDivElement;

  let shoppingCartDiv: HTMLDivElement;
  let submitButton: HTMLButtonElement;

  function init(): void {
    getReferences();
    addEventListeners();
  }

  function getReferences(): void {
    addArticleButton = <HTMLButtonElement>document.querySelector("#addArticleButton");
    articleListContainer = <HTMLDivElement>document.querySelector("#articleList");
    addWorkButton = <HTMLButtonElement>document.querySelector("#addWorkButton");
    workListContainer = <HTMLDivElement>document.querySelector("#workList");
    addBankButton = <HTMLButtonElement>document.querySelector("#addBankButton");
    bankListContainer = <HTMLDivElement>document.querySelector("#bankList");
    shoppingCartDiv = <HTMLDivElement>document.querySelector("#shoppingCart");
    submitButton = <HTMLButtonElement>document.querySelector("#submitButton");
  }

  function addEventListeners(): void {
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

  async function submit(): Promise<void> {
    let tasks: Task = {
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

  function addBank(): void {
    let taskContainer: HTMLDivElement = createTaskContainer();
    let bankSelect: HTMLSelectElement = createBankSelect();
    let amountInput: HTMLInputElement = createAmountInput();
    let priceBefore: HTMLSpanElement = document.createElement("span");
    let price: HTMLSpanElement = document.createElement("span");
    let priceAfter: HTMLSpanElement = document.createElement("span");
    let deleteButton: HTMLButtonElement = document.createElement("button");

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

    let newBank: Bank = {
      bankTask: bankSelect.value,
      amount: parseFloat(amountInput.value)
    };
    bankList.push(newBank);

    updateBank();

    taskContainer.addEventListener("change", updateBank);
    deleteButton.addEventListener("click", deleteBank);

    function deleteBank(): void {
      taskContainer.remove();

      for (let i: number = 0; i < workingList.length; i++) {
        if (bankList[i] === newBank) {
          bankList.splice(i, 1);
        }
      }

      console.log(bankList);
    }

    function updateBank(): void {

      price.innerText = parseFloat(amountInput.value).toFixed(2);
      newBank.bankTask = bankSelect.value;
      newBank.amount = parseFloat(amountInput.value);

      updateShoppingCart();
    }
  }

  function createBankSelect(): HTMLSelectElement {
    let bankSelect: HTMLSelectElement = document.createElement("select");

    let optionGet: HTMLOptionElement = createOption("Get Money");
    bankSelect.appendChild(optionGet);

    let optionBring: HTMLOptionElement = createOption("Bring Money");
    bankSelect.appendChild(optionBring);

    return bankSelect;
  }

  function addWork(): void {
    let taskContainer: HTMLDivElement = createTaskContainer();
    let workSelect: HTMLSelectElement = createWorkSelect();
    let amountInput: HTMLInputElement = createAmountInput();
    let priceBefore: HTMLSpanElement = document.createElement("span");
    let price: HTMLSpanElement = document.createElement("span");
    let priceAfter: HTMLSpanElement = document.createElement("span");
    let deleteButton: HTMLButtonElement = document.createElement("button");

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

    let newWork: Work = {
      workTask: workSelect.value,
      price: parseFloat(price.innerText),
      amount: parseFloat(amountInput.value)
    };
    workingList.push(newWork);

    updateWork();

    taskContainer.addEventListener("change", updateWork);
    deleteButton.addEventListener("click", deleteWork);

    function deleteWork(): void {
      taskContainer.remove();

      for (let i: number = 0; i < workingList.length; i++) {
        if (workingList[i] === newWork) {
          workingList.splice(i, 1);
        }
      }

      console.log(workingList);
    }

    function updateWork(): void {
      let work: Work = getWork(workSelect);
      price.innerText = (work.price * parseFloat(amountInput.value)).toFixed(2);
      newWork.workTask = workSelect.value;
      newWork.price = parseFloat(price.innerText);
      newWork.amount = parseFloat(amountInput.value);

      updateShoppingCart();
    }
  }

  function getWork(_workSelect: HTMLSelectElement): Work {
    let work: Work = workList[0];

    workList.forEach(element => {
      if (element.workTask == _workSelect.value) {
        work = element;
      }
    });

    return work;
  }

  function createWorkSelect(): HTMLSelectElement {
    let workSelect: HTMLSelectElement = document.createElement("select");

    workList.forEach(element => {
      let option: HTMLOptionElement = createOption(element.workTask);
      workSelect.appendChild(option);
    });
    return workSelect;
  }

  function addArticle(): void {
    let taskContainer: HTMLDivElement = createTaskContainer();
    let articleSelect: HTMLSelectElement = createArticleSelect();
    let amountInput: HTMLInputElement = createAmountInput();
    let unitInput: HTMLSelectElement = createSelect();
    let preferredShopSelect: HTMLSelectElement = createShopSelect();
    let priceBefore: HTMLSpanElement = document.createElement("span");
    let priceElement: HTMLSpanElement = document.createElement("span");
    let priceAfter: HTMLSpanElement = document.createElement("span");
    let deleteButton: HTMLButtonElement = document.createElement("button");

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


    let newArticle: Article = {
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
    function updateArticle(): void {
      let article: Article = getArticle(articleSelect);
      let unit: Unit = getUnit(article, unitInput);

      priceElement.innerText = (article.price * unit.unitFactor * parseFloat(amountInput.value)).toFixed(2);

      newArticle.articleName = article.articleName;
      newArticle.amount = parseFloat(amountInput.value);
      newArticle.price = parseFloat(priceElement.innerText);
      newArticle.unitType = [unit];
      newArticle.preferredShop = preferredShopSelect.value;

      updateShoppingCart();
    }

    function updateUnits(): void {
      while (unitInput.firstChild) {
        unitInput.firstChild.remove();
      }
      getArticle(articleSelect).unitType.forEach(element => {
        fillSelect(unitInput, element.unitName);
      });
    }

    function deleteArticle(): void {
      taskContainer.remove();

      for (let i: number = 0; i < shoppingList.length; i++) {
        if (shoppingList[i] === newArticle) {
          shoppingList.splice(i, 1);
        }
      }
    }
    //<--------------------------------------------------------------------- Closures end -------------------------------------------------->

  }

  function updateShoppingCart(): void {
    clearShoppingCart();

    if (shoppingList.length > 0) {
      let shoppingSpan: HTMLSpanElement = document.createElement("span");
      shoppingSpan.innerHTML = "Shopping (" + shoppingList.length + " Elements) : " + getShoppingCosts() + " € <br/>";
      shoppingSpan.setAttribute("price", getShoppingCosts().toString());

      let shoppingFee: HTMLSpanElement = document.createElement("span");
      shoppingFee.innerHTML = "Fee: 10.00 €<br/><br/>";
      shoppingFee.setAttribute("price", "10");

      shoppingCartDiv.appendChild(shoppingSpan);
      shoppingCartDiv.appendChild(shoppingFee);
    }

    if (workingList.length > 0) {
      let workingSpan: HTMLSpanElement = document.createElement("span");
      workingSpan.innerHTML = "Work (" + workingList.length + " Elements) : " + getWorkingCosts() + " € <br/><br/>";
      workingSpan.setAttribute("price", getWorkingCosts().toString());

      shoppingCartDiv.appendChild(workingSpan);
    }

    if (bankList.length > 0) {
      let bankSpan: HTMLSpanElement = document.createElement("span");
      bankSpan.innerHTML = "Bank (" + bankList.length + " Elements) <br/>";

      let bankFee: HTMLSpanElement = document.createElement("span");
      bankFee.innerHTML = "Fee: " + (bankList.length * 5).toFixed(2) + "€<br/><br/>";
      bankFee.setAttribute("price", "10");

      shoppingCartDiv.appendChild(bankSpan);
      shoppingCartDiv.appendChild(bankFee);
    }

    let allCosts: number = 0;
    for (let element of shoppingCartDiv.children) {
      let price: string | null = element.getAttribute("price");
      if (price) {
        allCosts += parseFloat(price);
      }
    }

    if (allCosts > 0) {
      let total: HTMLSpanElement = document.createElement("span");
      total.innerHTML = "<strong>Total: " + allCosts + " €</strong>";
      shoppingCartDiv.appendChild(total);
    }
  }

  function getShoppingCosts(): number {
    let costs: number = 0;

    shoppingList.forEach(element => {
      costs += element.price;
    });

    return costs;
  }

  function getWorkingCosts(): number {
    let costs: number = 0;

    workingList.forEach(element => {
      costs += element.price;
    });

    return costs;
  }

  function clearShoppingCart(): void {
    while (shoppingCartDiv.firstChild)
      shoppingCartDiv.firstChild.remove();
  }

  function createTaskContainer(): HTMLDivElement {
    let container: HTMLDivElement = document.createElement("div");
    return container;
  }

  function createArticleSelect(): HTMLSelectElement {
    let select: HTMLSelectElement = document.createElement("select");

    articleList.forEach(element => {
      let option: HTMLOptionElement = document.createElement("option");
      option.innerText = element.articleName;
      select.appendChild(option);
    });

    return select;
  }

  function createAmountInput(): HTMLInputElement {
    let input: HTMLInputElement = document.createElement("input");
    input.min = "0";
    input.step = "0.1";
    input.type = "number";
    input.value = "1";

    return input;
  }

  function createOption(_option: string): HTMLOptionElement {
    let option: HTMLOptionElement = document.createElement("option");
    option.innerText = _option;
    return option;
  }

  function createSelect(): HTMLSelectElement {
    let select: HTMLSelectElement = document.createElement("select");
    return select;
  }

  function fillSelect(_select: HTMLSelectElement, _option: string): void {
    _select.appendChild(createOption(_option));
  }

  function createShopSelect(): HTMLSelectElement {
    let select: HTMLSelectElement = document.createElement("select");

    for (let element in Shops) {
      let option: HTMLOptionElement = document.createElement("option");
      if (!isNaN(Number(element))) {
        option.innerText = Shops[element];
        select.appendChild(option);
      }
    }

    return select;
  }

  function getArticle(_articleSleect: HTMLSelectElement): Article {
    let article: Article = articleList[0];

    articleList.forEach(element => {
      if (element.articleName == _articleSleect.value) {
        article = element;
      }
    });

    return article;
  }

  function getUnit(_article: Article, _unitInput: HTMLSelectElement): Unit {
    let unit: Unit = articleList[0].unitType[0];

    _article.unitType.forEach(element => {
      if (element.unitName == _unitInput.value) {
        unit = element;
      }
    });

    return unit;
  }
}
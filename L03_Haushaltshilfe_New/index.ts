namespace Haushaltshilfe_New {

  interface Price {
    name: string;
    amount: number[];
  }

  let prices: Price[] = [
    { name: "Brot", amount: [1.5, 0.015, 1.5] },
    { name: "Wasser", amount: [1, 0.01, 1.2] },
    { name: "Salz", amount: [.5, 0.05, 1.75] },
    { name: "Hering", amount: [2.5, 0.025, 3.5] },
    { name: "Butter", amount: [1.35, 0.0135, 1.8] },
    { name: "Einkaufen", amount: [10] },
    { name: "Rasenmähen", amount: [10] },
    { name: "Streichen", amount: [15] },
    { name: "Wischen", amount: [5] },
    { name: "Bank", amount: [5] }
  ];

  window.addEventListener("load", Init);

  let form: HTMLFormElement;
  let formContainer: HTMLDivElement;

  function Init(): void {
    form = <HTMLFormElement>document.querySelector("form");
    form.addEventListener("change", HandleChange);
    formContainer = <HTMLDivElement>document.querySelector("div[name=TaskForm]");
    document.querySelector("button[name=AddButton]")?.addEventListener("click", AddTask);
  }
  function HandleChange(_event: Event): void {
    let formData: FormData = new FormData(document.forms[0]);
    for (let entry of formData.entries()) {
      console.log(entry);
    }
  }
  function AddTask(): void {
    let task: HTMLDivElement = CreateDiv();
    formContainer.appendChild(task);
  }
  function CreateDiv(): HTMLDivElement {
    let div: HTMLDivElement = document.createElement("div");
    div.id = "taskDiv";

    let dropDownField: HTMLFieldSetElement = CreateFieldSet("Aufgabe");
    dropDownField.id = "taskDropDown";
    let dropDown: HTMLSelectElement = CreateTaskDropDown();
    dropDown.addEventListener("change", (event) => {
      UpdateTask(event, div);
    });

    dropDownField.appendChild(dropDown);
    div.appendChild(dropDownField);

    return div;
  }
  function UpdateTask(_event: Event, task: HTMLDivElement): void {
    ClearTask(task);
    let target: HTMLSelectElement = <HTMLSelectElement>_event.target;
    switch (target.value) {
      case "Einkaufen":
        AddShoppingFieldSets(task);
        break;
      case "Haushaltsarbeit":
        AddWorkFieldSet(task);
        break;
      case "Bank":
        AddBankFieldSet(task);
        console.log("Bank");
        break;
    }
  }
  function ClearTask(task: HTMLDivElement): void {
    for (let i: number = 0; i < task.childElementCount; i++) {
      if (task.children[i].id != "taskDiv" && task.children[i].id != "taskDropDown") {
        task.children[i].remove();
      }
    }
  }
  function AddWorkFieldSet(task: HTMLDivElement): void {
    let workDropDown: HTMLSelectElement = CreateWorkDropDown();
    let costs: HTMLDivElement = CreateWorkCosts();

    workDropDown.addEventListener("change", () => {
      UpdateCosts(workDropDown, costs);
    });

    task.appendChild(workDropDown);
    task.appendChild(costs);
  }
  function UpdateCosts(dropDown: HTMLSelectElement, costs: HTMLDivElement): void {
    let totalPrice: HTMLSpanElement = <HTMLSpanElement>costs.querySelector("#totalTaskPrice");
    let amount: Price = <Price>prices.find(element => (<Price>element).name == dropDown.value);
    totalPrice.innerText = amount.amount[0].toFixed(2);
  }
  function CreateWorkCosts(): HTMLDivElement {
    let feePriceDiv: HTMLDivElement = document.createElement("div");

    let euroSign: HTMLSpanElement = document.createElement("span");
    euroSign.innerText = " €";

    let feeBefore: HTMLSpanElement = document.createElement("span");
    feeBefore.innerText = "Gebühren: ";
    let feePrice: HTMLSpanElement = document.createElement("span");
    feePrice.id = "totalTaskPrice";
    feePrice.innerText = "0.000";
    feePriceDiv.appendChild(feeBefore);
    feePriceDiv.appendChild(feePrice);
    feePriceDiv.appendChild(euroSign);

    return feePriceDiv;
  }
  function CreateWorkDropDown(): HTMLSelectElement {
    let dropDown: HTMLSelectElement = document.createElement("select");

    let select: HTMLOptionElement = document.createElement("option");
    select.value = "Auswählen";
    select.innerHTML = "Auswählen";

    let mow: HTMLOptionElement = document.createElement("option");
    mow.value = "Rasenmähen";
    mow.innerHTML = "Rasenmähen";

    let brush: HTMLOptionElement = document.createElement("option");
    brush.value = "Streichen";
    brush.innerHTML = "Streichen";

    let wipe: HTMLOptionElement = document.createElement("option");
    wipe.value = "Wischen";
    wipe.innerHTML = "Wischen";

    dropDown.appendChild(select);
    dropDown.appendChild(mow);
    dropDown.appendChild(brush);
    dropDown.appendChild(wipe);

    return dropDown;
  }
  function AddBankFieldSet(task: HTMLDivElement): void {
    task.appendChild(CreateBankRadios());
    task.appendChild(CreateSlider());
    task.appendChild(CreateTotalBankAmount());
  }
  function CreateTotalBankAmount(): HTMLDivElement {
    let feePriceDiv: HTMLDivElement = document.createElement("div");

    let euroSign: HTMLSpanElement = document.createElement("span");
    euroSign.innerText = " €";

    let feeBefore: HTMLSpanElement = document.createElement("span");
    feeBefore.innerText = "Gebühren: ";
    let feePrice: HTMLSpanElement = document.createElement("span");
    feePrice.id = "totalTaskPrice";
    let feeAmount: Price = <Price>prices.find(element => (<Price>element).name == "Bank");
    feePrice.innerText = feeAmount.amount[0].toFixed(2);
    feePriceDiv.appendChild(feeBefore);
    feePriceDiv.appendChild(feePrice);
    feePriceDiv.appendChild(euroSign);

    return feePriceDiv;
  }
  function CreateSlider(): HTMLDivElement {
    let container: HTMLDivElement = document.createElement("div");

    let slider: HTMLInputElement = document.createElement("input");
    slider.type = "range";
    slider.min = "5";
    slider.max = "100";
    slider.step = "5";
    slider.value = "5";

    let amountSpan: HTMLSpanElement = document.createElement("span");
    amountSpan.innerText = slider.value + " €";

    slider.addEventListener("change", () => {
      amountSpan.innerText = slider.value + " €";
    });

    container.appendChild(slider);
    container.appendChild(amountSpan);

    return container;
  }
  function CreateBankRadios(): HTMLDivElement {
    let container: HTMLDivElement = document.createElement("div");
    let radioGroup: HTMLFieldSetElement = document.createElement("fieldset");

    let radioGet: HTMLInputElement = document.createElement("input");
    radioGet.type = "radio";
    radioGet.value = "get";
    radioGet.name = "money";

    let labelGet: HTMLLabelElement = document.createElement("label");
    labelGet.innerText = "Abheben";

    labelGet.appendChild(radioGet);

    let radioSet: HTMLInputElement = document.createElement("input");
    radioSet.type = "radio";
    radioSet.value = "set";
    radioSet.name = "money";

    let labelSet: HTMLLabelElement = document.createElement("label");
    labelSet.innerText = "Einzahlen";

    labelSet.appendChild(radioSet);

    radioGroup.appendChild(labelGet);
    radioGroup.appendChild(labelSet);

    container.appendChild(radioGroup);
    return container;
  }
  function AddShoppingFieldSets(task: HTMLDivElement): void {
    let addButton: HTMLButtonElement = document.createElement("button");
    addButton.innerText = "Artikel hinzufügen";
    addButton.type = "button";

    let articleList: HTMLDivElement = document.createElement("div");
    let allArticlesPrice: HTMLDivElement = CreateAllArticlesDiv();

    articleList.addEventListener("change", (_event) => {
      UpdateTaskPrice(articleList, allArticlesPrice);
    });

    addButton.addEventListener("click", () => {
      AddArticle(articleList, allArticlesPrice);
    });

    task.appendChild(addButton);
    task.appendChild(articleList);
    task.appendChild(allArticlesPrice);
  }
  function UpdateTaskPrice(list: HTMLDivElement, priceContainer: HTMLDivElement): void {
    let totalArticlePrice: number = 0;
    let prices: NodeListOf<Element> = list.querySelectorAll("#price");
    for (let element of prices) {
      totalArticlePrice += Number(element.innerHTML);
    }
    let allArticlesPrice: HTMLSpanElement = <HTMLSpanElement>priceContainer.querySelector("#allArticlesPrice");
    allArticlesPrice.innerText = totalArticlePrice.toFixed(2);

    let feePrice: HTMLSpanElement = <HTMLSpanElement>priceContainer.querySelector("#feePrice");

    let totalPrice: HTMLSpanElement = <HTMLSpanElement>priceContainer.querySelector("#totalTaskPrice");
    totalPrice.innerText = Number(Number(feePrice.innerText) + totalArticlePrice).toFixed(2);
  }
  function CreateAllArticlesDiv(): HTMLDivElement {
    let euroSign01: HTMLSpanElement = document.createElement("span");
    euroSign01.innerText = " €";

    let euroSign02: HTMLSpanElement = document.createElement("span");
    euroSign02.innerText = " €";

    let euroSign03: HTMLSpanElement = document.createElement("span");
    euroSign03.innerText = " €";

    let artivlesBefore: HTMLSpanElement = document.createElement("span");
    artivlesBefore.innerText = "Artikel: ";
    let allArticlesPriceDiv: HTMLDivElement = document.createElement("div");
    let allArticlesPrice: HTMLSpanElement = document.createElement("span");
    allArticlesPrice.id = "allArticlesPrice";
    allArticlesPrice.innerText = "0.00";
    allArticlesPriceDiv.appendChild(artivlesBefore);
    allArticlesPriceDiv.appendChild(allArticlesPrice);
    allArticlesPriceDiv.appendChild(euroSign01);

    let feeBefore: HTMLSpanElement = document.createElement("span");
    feeBefore.innerText = "Gebühren: ";
    let feePriceDiv: HTMLDivElement = document.createElement("div");
    let feePrice: HTMLSpanElement = document.createElement("span");
    feePrice.id = "feePrice";
    let feeAmount: Price = <Price>prices.find(element => (<Price>element).name == "Einkaufen");
    feePrice.innerText = feeAmount.amount[0].toFixed(2);
    feePriceDiv.appendChild(feeBefore);
    feePriceDiv.appendChild(feePrice);
    feePriceDiv.appendChild(euroSign02);

    let totalBefore: HTMLSpanElement = document.createElement("span");
    totalBefore.innerText = "Gesammt: ";
    let totalTaskPriceDiv: HTMLDivElement = document.createElement("div");
    let totalTaskPrice: HTMLSpanElement = document.createElement("span");
    totalTaskPrice.id = "totalTaskPrice";
    totalTaskPrice.innerText = Number(Number(allArticlesPrice.innerText) + Number(feePrice.innerText)).toFixed(2);
    totalTaskPriceDiv.appendChild(totalBefore);
    totalTaskPriceDiv.appendChild(totalTaskPrice);
    totalTaskPriceDiv.appendChild(euroSign03);

    let container: HTMLDivElement = document.createElement("div");

    container.appendChild(allArticlesPriceDiv);
    container.appendChild(feePriceDiv);
    container.appendChild(totalTaskPriceDiv);

    return container;
  }
  function AddArticle(list: HTMLDivElement, articlePriceDiv: HTMLDivElement): void {
    let article: HTMLFieldSetElement = document.createElement("fieldset");

    let articleDescription: HTMLSelectElement = CreateArticleSelect();
    article.appendChild(articleDescription);

    let articleAmount: HTMLInputElement = CreateArticleAmount();
    article.appendChild(articleAmount);

    let articleUnit: HTMLSelectElement = CreateArticleUnit();
    article.appendChild(articleUnit);

    let articlePrice: HTMLSpanElement = document.createElement("span");
    articlePrice.id = "price";
    articlePrice.innerText = "0.00";
    article.appendChild(articlePrice);

    let euroSign: HTMLSpanElement = document.createElement("span");
    euroSign.innerText = " €";
    article.appendChild(euroSign);

    let deleteButton: HTMLButtonElement = document.createElement("button");
    deleteButton.innerText = "Artikel Löschen";
    article.appendChild(deleteButton);

    articleDescription.addEventListener("change", () => {
      UpdateArticle(article);
    });
    articleAmount.addEventListener("change", () => {
      UpdateArticle(article);
    });
    articleUnit.addEventListener("change", () => {
      UpdateArticle(article);
    });
    deleteButton.addEventListener("click", () => {
      article.remove();
      UpdateTaskPrice(list, articlePriceDiv);
    });

    list.appendChild(article);
  }
  function UpdateArticle(article: HTMLFieldSetElement): void {
    let elementDiscription: HTMLSelectElement = <HTMLSelectElement>article.querySelector("select[name=Article]");
    let elementAmount: HTMLInputElement = <HTMLInputElement>article.querySelector("input[name=ArticleAmount]");
    let elementUnit: HTMLSelectElement = <HTMLSelectElement>article.querySelector("select[name=Unit]");
    let elementPrice: HTMLSpanElement = <HTMLSpanElement>article.querySelector("span#price");

    //Konstrukt welches noch(??) nicht bekannt ist. Geht aber genauso mit einer for..of.. Schleife 
    let element: Price = <Price>prices.find(element => (<Price>element).name == elementDiscription.value);

    elementPrice.innerText = Number(element.amount[Number(elementUnit.value)] * Number(elementAmount.value)).toFixed(2);
  }
  function CreateArticleAmount(): HTMLInputElement {
    let amount: HTMLInputElement = document.createElement("input");
    amount.type = "number";
    amount.value = "1";
    amount.name = "ArticleAmount";

    return amount;
  }
  function CreateArticleUnit(): HTMLSelectElement {
    let selectElement: HTMLSelectElement = document.createElement("select");
    selectElement.name = "Unit";

    let option01: HTMLOptionElement = document.createElement("option");
    option01.value = "0";
    option01.innerText = "Stück";

    let option02: HTMLOptionElement = document.createElement("option");
    option02.value = "1";
    option02.innerText = "Gramm";

    let option03: HTMLOptionElement = document.createElement("option");
    option03.value = "2";
    option03.innerText = "Liter";

    selectElement.appendChild(option01);
    selectElement.appendChild(option02);
    selectElement.appendChild(option03);

    return selectElement;
  }
  function CreateArticleSelect(): HTMLSelectElement {
    let selectElement: HTMLSelectElement = document.createElement("select");
    selectElement.name = "Article";

    let select: HTMLOptionElement = document.createElement("option");
    select.innerText = "Auswählen";

    let option01: HTMLOptionElement = document.createElement("option");
    option01.value = "Brot";
    option01.innerText = "Brot";

    let option02: HTMLOptionElement = document.createElement("option");
    option02.value = "Wasser";
    option02.innerText = "Wasser";

    let option03: HTMLOptionElement = document.createElement("option");
    option03.value = "Salz";
    option03.innerText = "Salz";

    let option04: HTMLOptionElement = document.createElement("option");
    option04.value = "Hering";
    option04.innerText = "Hering";

    let option05: HTMLOptionElement = document.createElement("option");
    option05.value = "Butter";
    option05.innerText = "Butter";

    selectElement.appendChild(select);
    selectElement.appendChild(option01);
    selectElement.appendChild(option02);
    selectElement.appendChild(option03);
    selectElement.appendChild(option04);
    selectElement.appendChild(option05);

    return selectElement;
  }
  function CreateTaskDropDown(): HTMLSelectElement {

    let dropDown: HTMLSelectElement = document.createElement("select");

    let select: HTMLOptionElement = document.createElement("option");
    select.value = "Auswählen";
    select.innerHTML = "Auswählen";

    let shopping: HTMLOptionElement = document.createElement("option");
    shopping.value = "Einkaufen";
    shopping.innerHTML = "Einkaufen";

    let work: HTMLOptionElement = document.createElement("option");
    work.value = "Haushaltsarbeit";
    work.innerHTML = "Haushaltsarbeit";

    let bank: HTMLOptionElement = document.createElement("option");
    bank.value = "Bank";
    bank.innerHTML = "Bank";

    dropDown.appendChild(select);
    dropDown.appendChild(shopping);
    dropDown.appendChild(work);
    dropDown.appendChild(bank);

    return dropDown;
  }
  function CreateFieldSet(legendName: string): HTMLFieldSetElement {
    let fieldSet: HTMLFieldSetElement = document.createElement("fieldset");

    let legend: HTMLLegendElement = document.createElement("legend");
    legend.innerText = legendName;

    fieldSet.appendChild(legend);

    return fieldSet;
  }
}
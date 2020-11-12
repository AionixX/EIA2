export namespace L05_Cocktailbar {

  export interface Item {
    name: string;
    price: number;
  }
  export interface Data {
    [category: string]: Item[];
  }

  let form: HTMLFormElement;
  let slider: HTMLInputElement;
  let submit: HTMLButtonElement;

  window.addEventListener("load", handleLoad);
  
  async function handleLoad(_event: Event): Promise<void> {
    let response: Response = await fetch("Data.json");
    let offer: string = await response.text();
    let data: Data = JSON.parse(offer);

    generateContent(data);
  
    form = <HTMLFormElement>document.querySelector("form");
    slider = <HTMLInputElement>document.querySelector("input#amount");
    submit = <HTMLButtonElement>document.querySelector("#sendButton");

    form.addEventListener("change", handleChange);
    slider.addEventListener("input", displayAmount);
    submit.addEventListener("click", sendOrder);
  }

  async function sendOrder(): Promise<void> {
    let formData: FormData = new FormData(form);
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    await fetch("index?html?" + query.toString());
  }

  function handleChange(_event: Event): void {
    let order: HTMLDivElement = <HTMLDivElement>document.querySelector("div#order");
    order.innerHTML = "";

    let formData: FormData = new FormData(document.forms[0]);
    let total: number = 0;

    for (let entry of formData.entries()) {
      let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']");
      let price: number = Number(item.getAttribute("price"));

      if (entry[0] == "Amount")
        continue;

      if (entry[0] == "Drink") {
        let amountPrice: number = price * Number(formData.get("Amount"));
        total += amountPrice;
        order.innerHTML += item.value + "  € " + amountPrice.toFixed(2) + "<br>";
        continue;
      }

      order.innerHTML += item.value + "  € " + price.toFixed(2) + "<br>";

      total += Number(price);
    }
    order.innerHTML += "<strong>Total: € " + Number(total).toFixed(2) + "</strong>";
  }

  function displayAmount(_event: Event): void {
    let progress: HTMLProgressElement = <HTMLProgressElement>document.querySelector("progress");
    let amount: string = (<HTMLInputElement>_event.target).value;
    progress.value = parseFloat(amount);
  }

  export function generateContent(_data: Data): void {
    let form: HTMLDivElement = <HTMLDivElement>document.querySelector("#form");

    for (let category in _data) {
      form.prepend(createFieldSets(category));
      let items: Item[] = _data[category];
      let group: HTMLElement | null = null;
      switch (category) {
        case "Drink":
          group = <HTMLSelectElement>createSelect(items, category);
          break;
        case "Container":
          group = <HTMLDivElement>createSingle(items, category);
          break;
        case "Extras":
          group = <HTMLDivElement>createMultiple(items, category);
          break;
        default:
          
          console.log("Your Category is not implemented");
      }

      let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category);
      if (fieldset && group) {
        fieldset.appendChild(group);
      }
    }
  }

  function createFieldSets(_category: string): HTMLFieldSetElement {
    let fieldSet: HTMLFieldSetElement = document.createElement("fieldset");
    fieldSet.id = _category;

    let legend: HTMLLegendElement = document.createElement("legend");
    legend.innerText = _category;
    
    fieldSet.appendChild(legend);

    return fieldSet;
  }
  
  function createSelect(_items: Item[], _category: string): HTMLSelectElement | null {
    let select: HTMLSelectElement = document.createElement("select");
    select.name = _category;

    for (let item of _items) {
      let option: HTMLOptionElement = document.createElement("option");
      option.setAttribute("price", item.price.toString());
      option.innerText = item.name;
      option.value = item.name;

      select.appendChild(option);
    }
    return select;
  }
  
  function createSingle(_items: Item[], _category: string): HTMLDivElement | null {
    let group: HTMLDivElement = document.createElement("div");
    let firstElement: boolean = true;

    for (let item of _items) {
      let radio: HTMLInputElement = document.createElement("input");
      radio.type = "radio";
      radio.setAttribute("price", item.price.toString());
      radio.value = item.name;
      radio.name = _category;
      radio.id = item.name;
      radio.checked = firstElement;

      let label: HTMLLabelElement = document.createElement("label");
      label.textContent = item.name;
      label.htmlFor = item.name;

      group.appendChild(radio);
      group.appendChild(label);

      firstElement = false;
    }
    return group;
  }
  
  function createMultiple(_items: Item[], _category: string): HTMLDivElement | null {
    let group: HTMLDivElement = document.createElement("div");
    for (let item of _items) {
      let checkbox: HTMLInputElement = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.setAttribute("price", item.price.toString());
      checkbox.value = item.name;
      checkbox.name = _category;
      checkbox.id = item.name;

      let label: HTMLLabelElement = document.createElement("label");
      label.textContent = item.name;
      label.htmlFor = item.name;

      group.appendChild(checkbox);
      group.appendChild(label);
    }
    return group;
  }
}
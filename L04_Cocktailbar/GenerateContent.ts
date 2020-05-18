namespace L04_Cocktailbar {
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
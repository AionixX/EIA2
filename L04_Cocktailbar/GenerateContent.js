"use strict";
var L04_Cocktailbar;
(function (L04_Cocktailbar) {
    function generateContent(_data) {
        let form = document.querySelector("#form");
        for (let category in _data) {
            form.prepend(createFieldSets(category));
            let items = _data[category];
            let group = null;
            switch (category) {
                case "Drink":
                    group = createSelect(items, category);
                    break;
                case "Container":
                    group = createSingle(items, category);
                    break;
                case "Extras":
                    group = createMultiple(items, category);
                    break;
                default:
                    console.log("Your Category is not implemented");
            }
            let fieldset = document.querySelector("fieldset#" + category);
            if (fieldset && group) {
                fieldset.appendChild(group);
            }
        }
    }
    L04_Cocktailbar.generateContent = generateContent;
    function createFieldSets(_category) {
        let fieldSet = document.createElement("fieldset");
        fieldSet.id = _category;
        let legend = document.createElement("legend");
        legend.innerText = _category;
        fieldSet.appendChild(legend);
        return fieldSet;
    }
    function createSelect(_items, _category) {
        let select = document.createElement("select");
        select.name = _category;
        for (let item of _items) {
            let option = document.createElement("option");
            option.setAttribute("price", item.price.toString());
            option.innerText = item.name;
            option.value = item.name;
            select.appendChild(option);
        }
        return select;
    }
    function createSingle(_items, _category) {
        let group = document.createElement("div");
        let firstElement = true;
        for (let item of _items) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.setAttribute("price", item.price.toString());
            radio.value = item.name;
            radio.name = _category;
            radio.id = item.name;
            radio.checked = firstElement;
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(radio);
            group.appendChild(label);
            firstElement = false;
        }
        return group;
    }
    function createMultiple(_items, _category) {
        let group = document.createElement("div");
        for (let item of _items) {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toString());
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = item.name;
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(checkbox);
            group.appendChild(label);
        }
        return group;
    }
})(L04_Cocktailbar || (L04_Cocktailbar = {}));
//# sourceMappingURL=GenerateContent.js.map
"use strict";
var L07_Cocktailbar;
(function (L07_Cocktailbar) {
    let data = {
        Drink: [
            { name: "Mojito", price: 25.00 },
            { name: "Caipirinha", price: 30.00 },
            { name: "Bloody Mary", price: 21.00 }
        ],
        Extras: [
            { name: "Ice", price: 0.50 },
            { name: "Lemon", price: 0.20 },
            { name: "Orange", price: 0.15 },
            { name: "Mint", price: 0.30 }
        ],
        Container: [
            { name: "Slim", price: 3.50 },
            { name: "Wide", price: 4.00 },
            { name: "Papercup", price: 0.50 },
            { name: "Plasticbag", price: 0.05 }
        ]
    };
    let form;
    let slider;
    let submit;
    window.addEventListener("load", handleLoad);
    async function handleLoad(_event) {
        generateContent(data);
        form = document.querySelector("form");
        slider = document.querySelector("input#amount");
        submit = document.querySelector("#sendButton");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
        submit.addEventListener("click", sendOrder);
    }
    async function sendOrder() {
        let formData = new FormData(form);
        let query = new URLSearchParams(formData);
        await fetch("http://localhost:5001?" + query.toString());
    }
    function handleChange(_event) {
        let order = document.querySelector("div#order");
        order.innerHTML = "";
        let formData = new FormData(document.forms[0]);
        let total = 0;
        for (let entry of formData.entries()) {
            let item = document.querySelector("[value='" + entry[1] + "']");
            let price = Number(item.getAttribute("price"));
            if (entry[0] == "Amount")
                continue;
            if (entry[0] == "Drink") {
                let amountPrice = price * Number(formData.get("Amount"));
                total += amountPrice;
                order.innerHTML += item.value + "  € " + amountPrice.toFixed(2) + "<br>";
                continue;
            }
            order.innerHTML += item.value + "  € " + price.toFixed(2) + "<br>";
            total += Number(price);
        }
        order.innerHTML += "<strong>Total: € " + Number(total).toFixed(2) + "</strong>";
    }
    function displayAmount(_event) {
        let progress = document.querySelector("progress");
        let amount = _event.target.value;
        progress.value = parseFloat(amount);
    }
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
})(L07_Cocktailbar || (L07_Cocktailbar = {}));
//# sourceMappingURL=index.js.map
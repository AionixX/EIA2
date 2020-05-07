"use strict";
var Cocktailbar;
(function (Cocktailbar) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        let form = document.querySelector("div#form");
        let slider = document.querySelector("input#amount");
        form.addEventListener("change", handleChange);
        slider.addEventListener("input", displayAmount);
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
            order.innerHTML += item.name + "  € " + price.toFixed(2) + "<br>";
            total += Number(price);
        }
        order.innerHTML += "<strong>Total: € " + Number(total).toFixed(2) + "</strong>";
    }
    function displayAmount(_event) {
        let progress = document.querySelector("progress");
        let amount = _event.target.value;
        progress.value = parseFloat(amount);
    }
})(Cocktailbar || (Cocktailbar = {}));
//# sourceMappingURL=index.js.map
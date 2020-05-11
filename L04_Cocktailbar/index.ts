namespace L04_Cocktailbar {
  window.addEventListener("load", handleLoad);

  function handleLoad(_event: Event): void {
    let form: HTMLDivElement = <HTMLDivElement>document.querySelector("div#form");
    let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("input#amount");

    form.addEventListener("change", handleChange);
    slider.addEventListener("input", displayAmount);
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

      order.innerHTML += item.name + "  € " + price.toFixed(2) + "<br>";

      total += Number(price);
    }

    order.innerHTML += "<strong>Total: € " + Number(total).toFixed(2) + "</strong>";
  }
  function displayAmount(_event: Event): void {
    let progress: HTMLProgressElement = <HTMLProgressElement>document.querySelector("progress");
    let amount: string = (<HTMLInputElement>_event.target).value;
    progress.value = parseFloat(amount);
  }
}
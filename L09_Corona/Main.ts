namespace L09_Corona {
  window.addEventListener("load", handleLoad);

  export let canvas: HTMLCanvasElement;
  export let crc: CanvasRenderingContext2D;

  export let coronaViren: Corona[] = [];
  export let antiViren: Anti[] = [];
  export let blood: Blood[] = [];

  let imgData: ImageData;

  function handleLoad(): void {
    canvas = <HTMLCanvasElement>document.querySelector("canvas");
    crc = <CanvasRenderingContext2D>canvas.getContext("2d");
    
    drawBackground();
    imgData = crc.getImageData(0, 0, crc.canvas.width, crc.canvas.height);

    for (let i: number = 0; i < 5; i++)
      blood.push(new Blood());

    for (let i: number = 0; i < 10; i++)
      coronaViren.push(new Corona());

    for (let i: number = 0; i < 5; i++)
      blood.push(new Blood());

    for (let i: number = 0; i < 20; i++)
      antiViren.push(new Anti());

    for (let i: number = 0; i < 5; i++)
      blood.push(new Blood());

    window.setInterval(update, 20);
  }

  function drawBackground(): void {

    let gradient: CanvasGradient = crc.createLinearGradient(0, 0, 0, crc.canvas.height);
    gradient.addColorStop(0, "HSL(10, 100%, 50%)");
    gradient.addColorStop(0.3, "HSL(10, 80%, 35%)");
    gradient.addColorStop(0.5, "HSL(10, 80%, 35%)");
    gradient.addColorStop(0.7, "HSL(10, 80%, 35%)");
    gradient.addColorStop(1, "HSL(10, 100%, 50%)");

    crc.fillStyle = gradient;
    crc.fillRect(0, 0, crc.canvas.width, crc.canvas.height);

    let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement("canvas").getContext("2d");
    pattern.canvas.width = 40;
    pattern.canvas.height = 20;

    pattern.fillStyle = "transparent";
    pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
    pattern.moveTo(0, 10);
    pattern.lineTo(10, 10);
    pattern.lineTo(10, 5);
    pattern.lineTo(20, 0);
    pattern.lineTo(30, 0);
    pattern.lineTo(40, 5);
    pattern.lineTo(40, 15);
    pattern.lineTo(30, 20);
    pattern.lineTo(20, 20);
    pattern.lineTo(10, 15);
    pattern.lineTo(10, 10);
    pattern.lineTo(10, 10);
    pattern.lineWidth = 0.1;
    pattern.stroke();

    crc.fillStyle = <CanvasPattern>crc.createPattern(pattern.canvas, "repeat");
    crc.fillRect(0, 0, crc.canvas.width, crc.canvas.height);
  }

  function update(): void {
    crc.putImageData(imgData, 0, 0);

    for (let corona of coronaViren)
      corona.update(1 / 50);

    for (let anti of antiViren)
      anti.update(1 / 50);

    for (let bloodPiece of blood)
      bloodPiece.update(1 / 50);
  }

  export function getCoronaViren(): Corona[] {
    return coronaViren;
  }
}
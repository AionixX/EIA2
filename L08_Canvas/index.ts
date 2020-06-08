namespace canvas {

  window.addEventListener("load", init);

  let canvas: HTMLCanvasElement;
  let crc2: CanvasRenderingContext2D;

  function init(): void {
    canvas = <HTMLCanvasElement>document.querySelector("canvas");
    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

    crc2.fillStyle = "#FF0000";
    crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

    crc2.beginPath();
    crc2.strokeStyle = "#FFFFFF";
    crc2.arc(100, 100, 20, 0, 1.5 * Math.PI);
    crc2.closePath();
    crc2.stroke();

    crc2.beginPath();
    crc2.ellipse(200, 200, 10, 20, 0, 0, 2 * Math.PI);
    crc2.stroke();


    crc2.moveTo(100, 250);
    crc2.lineTo(50, 300);
    crc2.lineTo(150, 300);
    crc2.lineTo(100, 250);
    crc2.stroke();

    crc2.strokeText("Hello World", 300, 300);

    let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 100);

    gradient.addColorStop(0, "black");
    gradient.addColorStop(0.3, "black");
    gradient.addColorStop(.4, "red");
    gradient.addColorStop(0.6, "red");
    gradient.addColorStop(0.7, "gold");
    gradient.addColorStop(1, "gold");

    crc2.fillStyle = gradient;
    crc2.fillRect(0, 0, 200, 100); 
  }
}
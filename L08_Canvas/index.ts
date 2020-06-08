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
    crc2.arc(100, 100, 20, 0, 1.5 * Math.PI);
    crc2.closePath();
    crc2.strokeStyle = "FF00FF";
    crc2.stroke();
  }
}
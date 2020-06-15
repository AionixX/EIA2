namespace Corona {
  window.addEventListener("load", init);

  let crc: CanvasRenderingContext2D;
  let elements: Element[] = [];

  function init(): void {
    let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    if (!canvas)
      return;

    crc = <CanvasRenderingContext2D>canvas.getContext("2d");

    drawBackground();
    drawCells();
    drawElements();
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

  function drawCells(): void {
    console.log("Cell");

  }

  function drawElements(): void {
    let coronaColor: CanvasGradient = crc.createRadialGradient(0, 0, 0, 0, 0, 40);
    coronaColor.addColorStop(0, "HSL(130, 100%, 28%)");
    coronaColor.addColorStop(1, "HSL(130, 100%, 35%)");

    let antiColor: CanvasGradient = crc.createRadialGradient(0, 0, 0, 0, 0, 40);
    antiColor.addColorStop(0, "HSL(200, 100%, 28%)");
    antiColor.addColorStop(1, "HSL(200, 100%, 35%)");

    do {
      let element: Element = {
        position: {
          x: random(120, crc.canvas.width - 120),
          y: random(120, crc.canvas.height - 60)
        },
        size: random(20, 40)
      };

      let rndElement: number = Math.floor(random(0, 2));

      drawEnds(element.position, element.size, rndElement == 0 ? coronaColor : antiColor);
      drawCircle(element.position, element.size, rndElement == 0 ? coronaColor : antiColor);

      elements.push(element);
    } while (elements.length < 10);
  }

  function drawCircle(_position: Vector2, _size: number, _gradient?: CanvasGradient): void {
    crc.save();
    crc.translate(_position.x, _position.y);

    crc.fillStyle = _gradient ? _gradient : "black";

    crc.arc(0, 0, _size, 0, 2 * Math.PI);
    crc.fill();
    crc.closePath();

    crc.restore();
  }

  function drawEnds(_position: Vector2, _size: number, _color: CanvasGradient): void {
    crc.strokeStyle = _color ? _color : "black";
    crc.lineWidth = 10;


    let rnd: number = Math.floor(random(6, 9));
    let angle: number = (2 * Math.PI) / rnd;

    for (let i: number = 1; i <= rnd; i++) {
      crc.save();
      crc.translate(_position.x, _position.y);

      let pos: Vector2 = {
        x: Math.cos(i * angle) * (1.5 * _size),
        y: Math.sin(i * angle) * (1.5 * _size)
      };

      crc.beginPath();
      crc.moveTo(pos.x, pos.y);
      crc.lineTo(0, 0);
      crc.closePath();
      crc.stroke();

      drawCircle(pos, (_size / 3), _color);
      crc.restore();
    }
  }

  // function isElementValid(_element: Element): boolean {
  //   for (let el of elements) {
  //     let dist: number = Math.pow((el.position.x - _element.position.x), 1) + Math.pow((el.position.y - _element.position.y), 1);
  //     if (dist < 150)
  //       return false;
  //   }
  //   return true;
  // }

}

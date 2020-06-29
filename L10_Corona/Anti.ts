namespace L10_Corona {
  export class Anti extends Drawable {
    target: Corona | null;
    speed: number;
    offset: Vector;

    constructor(_position?: Vector, _velocity?: Vector, _size?: number) {

      let position: Vector = _position ? _position : new Vector(random(0, canvas.width), random(0, canvas.height));
      let velocity: Vector = _velocity ? _velocity : new Vector(random(100, 100), random(-100, 100));
      let size: number = _size ? _size : random(5, 15);

      let antiColor:CanvasGradient = crc.createRadialGradient(0, 0, 0, 0, 0, size);
      antiColor.addColorStop(0, "HSL(200, 100%, 28%)");
      antiColor.addColorStop(1, "HSL(200, 80%, 35%)");

      super(position, velocity, size, antiColor);

      this.target = null;
      this.offset = new Vector(random(-0.1, 0.1), random(-0.1, 0.1));
      this.speed = random(0.3, 0.6);


      this.draw();
    }

    draw(): void {
      this.drawEnds(this.position, this.size);
      //this.drawCircle(this.position, this.size);
    }

    update(_timeslice: number): void {
      if (!this.target)
        this.searchTarget();

      if (random(0, 100) < 0.1)
        this.searchTarget();

      this.followTarget(_timeslice);

      this.draw();
    }

    searchTarget(): void {
      let coronaViren: Corona[] = getCoronaViren();

      if (coronaViren.length < 1)
        return;

      this.offset = new Vector(random(-0.1, 0.1), random(-0.1, 0.1));
      this.speed = random(0.3, 0.6);
      this.target = coronaViren[Math.floor(random(0, coronaViren.length))];
    }

    followTarget(_timeslice: number): void {
      if (!this.target)
        return;

      let direction: Vector = this.position.substract(this.target.position);
      direction.add(this.offset);
      direction.scale(_timeslice * this.speed);
      this.position.add(direction);
    }

    drawCircle(_position: Vector, _size: number): void {
      crc.fillStyle = this.color;

      crc.save();
      crc.translate(_position.x, _position.y);

      crc.beginPath();
      crc.arc(0, 0, _size, 0, 2 * Math.PI);
      crc.fill();
      crc.closePath();

      crc.restore();
    }

    drawEnds(_position: Vector, _size: number): void {
      crc.strokeStyle = this.color;
      crc.lineWidth = 10;

      let angle: number = (2 * Math.PI) / 3;

      for (let i: number = 1; i <= 3; i++) {
        crc.save();
        crc.translate(_position.x, _position.y);

        let pos: Vector = new Vector(
          Math.cos(i * angle) * (1.5 * _size),
          Math.sin(i * angle) * (1.5 * _size)
        );

        crc.beginPath();
        crc.moveTo(pos.x, pos.y);
        crc.lineTo(0, 0);
        crc.closePath();
        crc.stroke();

        this.drawCircle(pos, (_size / 2));
        crc.restore();
      }
    }
  }
  function random(_min: number, _max: number): number {
    let rand: number = (Math.random() * (_max - _min)) + _min;
    return rand;
  }
}
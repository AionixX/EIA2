namespace L09_Corona {
  export class Blood {
    position: Vector;
    velocity: Vector;
    size: number;
    bloodColor: CanvasGradient;

    constructor(_position?: Vector, _velocity?: Vector, _size?: number) {
      this.position = _position ? _position : new Vector(random(0, canvas.width), random(0, canvas.height));
      this.velocity = _velocity ? _velocity : new Vector(random(125, 175), random(-10, 10));
      this.size = _size ? _size : random(20, 50);

      this.bloodColor = crc.createRadialGradient(0, 0, 0, 0, 0, this.size);
      this.bloodColor.addColorStop(0, "HSL(360, 100%, 2%)");
      this.bloodColor.addColorStop(1, "HSL(360, 80%, 35%)");

      this.draw();
    }

    draw(): void {
      this.drawCircle(this.position, this.size);
    }

    update(_timeslice: number): void {
      if (this.position.x > crc.canvas.width)
        this.position.x = 0;

      if (this.position.y > crc.canvas.height)
        this.position.y = 0;

      if (this.position.y < 0)
        this.position.y = crc.canvas.height;

      let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
      offset.scale(_timeslice);
      this.position.add(offset);

      this.draw();
    }

    drawCircle(_position: Vector, _size: number): void {
      crc.fillStyle = this.bloodColor;

      crc.save();
      crc.translate(_position.x, _position.y);
      crc.beginPath();
      crc.arc(0, 0, _size, 0, 2 * Math.PI);
      crc.closePath();
      crc.fill();

      crc.restore();
    }

  }
  function random(_min: number, _max: number): number {
    let rand: number = (Math.random() * (_max - _min)) + _min;
    return rand;
  }
}
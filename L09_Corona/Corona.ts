namespace L09_Corona {
  export class Corona {
    position: Vector;
    velocity: Vector;
    size: number;
    ends: number;
    coronaColor: CanvasGradient;

    constructor(_position?: Vector, _velocity?: Vector, _size?: number, _ends?: number) {
      this.position = _position ? _position : new Vector(random(0, canvas.width), random(0, canvas.height));
      this.velocity = _velocity ? _velocity : new Vector(random(25, 125), random(-50, 50));
      this.size = _size ? _size : random(20, 50);
      this.ends = _ends ? _ends : random(6, 9);

      this.coronaColor = crc.createRadialGradient(0, 0, 0, 0, 0, this.size);
      this.coronaColor.addColorStop(0, "HSL(130, 100%, 8%)");
      this.coronaColor.addColorStop(1, "HSL(130, 100%, 35%)");

      this.draw();
    }

    draw(): void {
      this.drawEnds(this.position, this.size);
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
      crc.save();
      crc.translate(_position.x, _position.y);

      
      crc.beginPath();
      crc.fillStyle = this.coronaColor;
      crc.arc(0, 0, _size, 0, 2 * Math.PI);
      crc.fill();
      crc.closePath();

      crc.restore();
    }

    drawEnds(_position: Vector, _size: number): void {
      crc.strokeStyle = this.coronaColor;
      crc.lineWidth = 10;

      let angle: number = (2 * Math.PI) / this.ends;

      for (let i: number = 1; i <= this.ends; i++) {
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

        this.drawCircle(pos, (_size / 3));
        crc.restore();
      }
    }
  }
  function random(_min: number, _max: number): number {
    let rand: number = (Math.random() * (_max - _min)) + _min;
    return rand;
  }
}
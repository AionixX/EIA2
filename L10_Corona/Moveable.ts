namespace L10_Corona {
  export class Moveable {
    position: Vector;
    velocity: Vector;

    constructor(_position: Vector, _velocity: Vector) {
      this.position = _position;
      this.velocity = _velocity;

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
    }
    random(_min: number, _max: number): number {
      let rand: number = (Math.random() * (_max - _min)) + _min;
      return rand;
    }
  }
}
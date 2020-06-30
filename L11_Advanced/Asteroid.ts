namespace L11_Asteroids {
  export class Asteroid extends Moveable {
    public size: number;
    private type: number;

    constructor(_size: number, _position?: Vector) {
      super(_position);

      this.hitRadius = 50;

      this.velocity = new Vector(0, 0);
      this.velocity = Vector.getRandom(100, 200);

      this.type = Math.floor(Math.random() * 4);
      this.size = _size;
    }

    public draw(): void {
      crc2.save();
      crc2.lineWidth = lineWidth  / this.size;
      crc2.translate(this.position.x, this.position.y);
      crc2.scale(this.size, this.size);
      crc2.translate(-50, -50);
      crc2.stroke(asteroidPaths[this.type]);
      crc2.restore();
    }

    public isHit(_hotspot: Vector): boolean {
      let hitsize: number = 50 * this.size;
      let difference: Vector = new Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
      return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize);
    }
  }
}
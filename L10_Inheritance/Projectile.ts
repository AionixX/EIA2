namespace L10_Asteroids {
  export class Projectile extends Moveable {
    lifetime: number = 2;

    constructor(_position: Vector, _velocity: Vector) {
      super(_position);
      console.log("create Projectile");

      this.velocity = _velocity.copy();
    }

    draw(): void {
      crc2.save();
      crc2.translate(this.position.x, this.position.y);
      crc2.strokeRect(-1, -1, 1, 1);
      crc2.restore();
    }

    move(_timeslice: number): void {
      super.move(_timeslice);
      this.lifetime -= _timeslice;

      this.expandable = this.lifetime <= 0;
    }
  }
}
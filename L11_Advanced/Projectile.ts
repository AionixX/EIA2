namespace L11_Asteroids {
  export class Projectile extends Moveable {
    private lifetime: number;
    private static maxLifetime: number = 2;


    constructor(_position: Vector, _velocity: Vector) {
      super(_position);

      this.velocity = _velocity.copy();
      this.lifetime = Projectile.maxLifetime;
    }

    public draw(): void {
      crc2.save();
      crc2.translate(this.position.x, this.position.y);
      crc2.strokeRect(-1, -1, 1, 1);
      crc2.restore();
    }

    public move(_timeslice: number): void {
      super.move(_timeslice);
      this.lifetime -= _timeslice;

      this.expandable = this.lifetime <= 0;
    }
  }
}
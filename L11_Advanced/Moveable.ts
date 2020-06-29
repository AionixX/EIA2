namespace L11_Asteroids {
  export abstract class Moveable {
    public position: Vector;
    public velocity: Vector;
    public expandable: boolean = false;
    protected hitRadius: number = 0;

    constructor(_position?: Vector) {
      this.position = _position ? _position.copy() : new Vector(0, 0);
      this.velocity = new Vector(0, 0);
    }

    public isHitBy(_partner: Moveable): boolean {
      let difference: Vector = Vector.getDifference(this.position, _partner.position);
      return (this.hitRadius + _partner.hitRadius) > difference.length;
    }

    public hit(): void {
      this.expandable = true;
    }

    public move(_timeslice: number): void {
      let offset: Vector = this.velocity.copy();
      offset.scale(_timeslice);
      this.position.add(offset);

      if (this.position.x < 0)
        this.position.x += crc2.canvas.width;
      if (this.position.y < 0)
        this.position.y += crc2.canvas.height;
      if (this.position.x > crc2.canvas.width)
        this.position.x -= crc2.canvas.width;
      if (this.position.y > crc2.canvas.height)
        this.position.y -= crc2.canvas.height;
    }

    public abstract draw(): void;
  }
}
namespace L11_Corona {
  export class Drawable extends Moveable {
    size: number
    color: CanvasGradient;

    constructor(_position: Vector, _velocity: Vector, _size: number, _color: CanvasGradient) {
      super(_position, _velocity)
      this.size = _size;
      this.color = _color;
    }

    draw(): void {
      console.log("Draw");
    }
  }
}
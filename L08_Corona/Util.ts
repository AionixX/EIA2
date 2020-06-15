namespace Corona {
  export interface Element {
    position: Vector2;
    size: number;
  }

  export interface Vector2 {
    x: number;
    y: number;
  }

  export function random(_min: number, _max: number): number {
    let rand: number = (Math.random() * (_max - _min)) + _min;
    return rand;
  }
}
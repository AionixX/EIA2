namespace L10_Corona {

  export function random(_min: number, _max: number): number {
    let rand: number = (Math.random() * (_max - _min)) + _min;
    return rand;
  }
}
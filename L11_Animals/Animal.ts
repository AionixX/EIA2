namespace Animals {
  export abstract class Animal {
    private static position: Vector;
    public abstract makeNoise(): void;

    public static getPosition(): Vector {
      return this.position;
    }
  }
}
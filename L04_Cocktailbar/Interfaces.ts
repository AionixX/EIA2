namespace L04_Cocktailbar {
  export interface Item {
    name: string;
    price: number;
  }
  export interface Data {
    [category: string]: Item[];
  }
}
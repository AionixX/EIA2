namespace Haushaltshilfe {
  export interface Task {
    taskName: string;
    price: number;
    taskData: Shopping | Bank | Work;
  }

  export interface Shopping {
    article: Article[];
  }

  export interface Article {
    articleName: string;
    amount: number;
    price: number;
    unitType: Unit[];
    preferredShop: string;
  }

  export interface Unit {
    unitName: string;
    unitFactor: number;
  }

  export interface Bank {
    bankTask: string;
    amount: number;
    price: number;
  }

  export interface Work {
    workTask: string;
    price: number;
  }
}
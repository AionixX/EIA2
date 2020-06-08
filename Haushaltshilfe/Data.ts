namespace Haushaltshilfe {

  export interface Task {
    articles: Article[] | null;
    bank: Bank[] |null;
    work: Work[] | null;
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
  }

  export interface Work {
    workTask: string;
    price: number;
    amount: number;
  }
  export enum Shops {
    None,
    Aldi,
    Lidl,
    Edeka,
    Rewe,
    Müller
  }
  export let workList: Work[] = [
    {
      workTask: "wipe",
      price: 10,
      amount: 1
    }, {
      workTask: "mowing",
      price: 8,
      amount: 1
    }
  ];

  export let articleList: Article[] = [
    {
      articleName: "Brot",
      amount: 1,
      price: 1.5,
      preferredShop: "None",
      unitType: [
        {
          unitName: "Stück",
          unitFactor: 1
        },
        {
          unitName: "Gramm",
          unitFactor: 0.01
        }
      ]
    },
    {
      articleName: "Wasser",
      amount: 1,
      price: 0.5,
      preferredShop: "None",
      unitType: [
        {
          unitName: "Flasche",
          unitFactor: 1.5
        },
        {
          unitName: "Liter",
          unitFactor: 1
        }
      ]
    },
  ]

}
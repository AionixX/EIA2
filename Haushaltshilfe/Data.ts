namespace Haushaltshilfe {
  export enum Shops {
    None,
    Aldi,
    Lidl,
    Edeka,
    Rewe,
    Müller
  }
  export let taskList: string[] = [
    "Shopping",
    "Bank",
    "Work"
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
"use strict";
var Haushaltshilfe;
(function (Haushaltshilfe) {
    let Shops;
    (function (Shops) {
        Shops[Shops["None"] = 0] = "None";
        Shops[Shops["Aldi"] = 1] = "Aldi";
        Shops[Shops["Lidl"] = 2] = "Lidl";
        Shops[Shops["Edeka"] = 3] = "Edeka";
        Shops[Shops["Rewe"] = 4] = "Rewe";
        Shops[Shops["M\u00FCller"] = 5] = "M\u00FCller";
    })(Shops = Haushaltshilfe.Shops || (Haushaltshilfe.Shops = {}));
    Haushaltshilfe.workList = [
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
    Haushaltshilfe.articleList = [
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
    ];
})(Haushaltshilfe || (Haushaltshilfe = {}));
//# sourceMappingURL=Data.js.map
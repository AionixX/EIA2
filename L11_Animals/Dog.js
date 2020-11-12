"use strict";
var Animals;
(function (Animals) {
    class Dog extends Animals.Animal {
        makeNoise() {
            console.log("Wuff");
        }
    }
    Animals.Dog = Dog;
})(Animals || (Animals = {}));
//# sourceMappingURL=Dog.js.map
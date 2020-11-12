"use strict";
var Animals;
(function (Animals) {
    class Animal {
        static getPosition() {
            return this.position;
        }
    }
    Animals.Animal = Animal;
})(Animals || (Animals = {}));
//# sourceMappingURL=Animal.js.map
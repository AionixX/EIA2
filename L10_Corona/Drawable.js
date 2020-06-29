"use strict";
var L10_Corona;
(function (L10_Corona) {
    class Drawable extends L10_Corona.Moveable {
        constructor(_position, _velocity, _size, _color) {
            super(_position, _velocity);
            this.size = _size;
            this.color = _color;
        }
        draw() {
            console.log("Draw");
        }
    }
    L10_Corona.Drawable = Drawable;
})(L10_Corona || (L10_Corona = {}));
//# sourceMappingURL=Drawable.js.map
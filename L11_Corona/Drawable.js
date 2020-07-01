"use strict";
var L11_Corona;
(function (L11_Corona) {
    class Drawable extends L11_Corona.Moveable {
        constructor(_position, _velocity, _size, _color) {
            super(_position, _velocity);
            this.size = _size;
            this.color = _color;
        }
        draw() {
            console.log("Draw");
        }
    }
    L11_Corona.Drawable = Drawable;
})(L11_Corona || (L11_Corona = {}));
//# sourceMappingURL=Drawable.js.map
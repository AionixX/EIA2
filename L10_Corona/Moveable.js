"use strict";
var L10_Corona;
(function (L10_Corona) {
    class Moveable {
        constructor(_position, _velocity) {
            this.position = _position;
            this.velocity = _velocity;
        }
        update(_timeslice) {
            if (this.position.x > L10_Corona.crc.canvas.width)
                this.position.x = 0;
            if (this.position.y > L10_Corona.crc.canvas.height)
                this.position.y = 0;
            if (this.position.y < 0)
                this.position.y = L10_Corona.crc.canvas.height;
            let offset = new L10_Corona.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
        }
        random(_min, _max) {
            let rand = (Math.random() * (_max - _min)) + _min;
            return rand;
        }
    }
    L10_Corona.Moveable = Moveable;
})(L10_Corona || (L10_Corona = {}));
//# sourceMappingURL=Moveable.js.map
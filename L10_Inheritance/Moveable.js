"use strict";
var L10_Asteroids;
(function (L10_Asteroids) {
    class Moveable {
        constructor(_position) {
            this.expandable = false;
            this.position = _position ? _position.copy() : new L10_Asteroids.Vector(0, 0);
            this.velocity = new L10_Asteroids.Vector(0, 0);
        }
        move(_timeslice) {
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += L10_Asteroids.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L10_Asteroids.crc2.canvas.height;
            if (this.position.x > L10_Asteroids.crc2.canvas.width)
                this.position.x -= L10_Asteroids.crc2.canvas.width;
            if (this.position.y > L10_Asteroids.crc2.canvas.height)
                this.position.y -= L10_Asteroids.crc2.canvas.height;
        }
        draw() {
            // console.log("Moveable move");
        }
    }
    L10_Asteroids.Moveable = Moveable;
})(L10_Asteroids || (L10_Asteroids = {}));
//# sourceMappingURL=Moveable.js.map
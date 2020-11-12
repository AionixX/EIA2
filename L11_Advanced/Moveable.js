"use strict";
var L11_Asteroids;
(function (L11_Asteroids) {
    class Moveable {
        constructor(_position) {
            this.expandable = false;
            this.hitRadius = 0;
            this.position = _position ? _position.copy() : new L11_Asteroids.Vector(0, 0);
            this.velocity = new L11_Asteroids.Vector(0, 0);
        }
        isHitBy(_partner) {
            let difference = L11_Asteroids.Vector.getDifference(this.position, _partner.position);
            return (this.hitRadius + _partner.hitRadius) > difference.length;
        }
        hit() {
            this.expandable = true;
        }
        move(_timeslice) {
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += L11_Asteroids.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L11_Asteroids.crc2.canvas.height;
            if (this.position.x > L11_Asteroids.crc2.canvas.width)
                this.position.x -= L11_Asteroids.crc2.canvas.width;
            if (this.position.y > L11_Asteroids.crc2.canvas.height)
                this.position.y -= L11_Asteroids.crc2.canvas.height;
        }
    }
    L11_Asteroids.Moveable = Moveable;
})(L11_Asteroids || (L11_Asteroids = {}));
//# sourceMappingURL=Moveable.js.map
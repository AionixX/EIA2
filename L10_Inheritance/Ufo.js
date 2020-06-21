"use strict";
var L10_Asteroids;
(function (L10_Asteroids) {
    class Ufo extends L10_Asteroids.Moveable {
        constructor(_size, _position) {
            super(_position);
            this.velocity = new L10_Asteroids.Vector(0, 0);
            this.velocity.random(100, 200);
            this.type = Math.floor(Math.random() * 4);
            this.size = _size;
        }
        draw() {
            L10_Asteroids.crc2.save();
            L10_Asteroids.crc2.lineWidth = L10_Asteroids.lineWidth / this.size;
            L10_Asteroids.crc2.translate(this.position.x, this.position.y);
            L10_Asteroids.crc2.scale(this.size, this.size);
            L10_Asteroids.crc2.translate(-50, -50);
            L10_Asteroids.crc2.stroke(L10_Asteroids.asteroidPaths[this.type]);
            L10_Asteroids.crc2.restore();
        }
        isHit(_hotspot) {
            let hitsize = 50 * this.size;
            let difference = new L10_Asteroids.Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize);
        }
    }
    L10_Asteroids.Ufo = Ufo;
})(L10_Asteroids || (L10_Asteroids = {}));
//# sourceMappingURL=Ufo.js.map
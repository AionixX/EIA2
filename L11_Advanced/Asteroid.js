"use strict";
var L11_Asteroids;
(function (L11_Asteroids) {
    class Asteroid extends L11_Asteroids.Moveable {
        constructor(_size, _position) {
            super(_position);
            this.hitRadius = 50;
            this.velocity = new L11_Asteroids.Vector(0, 0);
            this.velocity = L11_Asteroids.Vector.getRandom(100, 200);
            this.type = Math.floor(Math.random() * 4);
            this.size = _size;
        }
        draw() {
            L11_Asteroids.crc2.save();
            L11_Asteroids.crc2.lineWidth = L11_Asteroids.lineWidth / this.size;
            L11_Asteroids.crc2.translate(this.position.x, this.position.y);
            L11_Asteroids.crc2.scale(this.size, this.size);
            L11_Asteroids.crc2.translate(-50, -50);
            L11_Asteroids.crc2.stroke(L11_Asteroids.asteroidPaths[this.type]);
            L11_Asteroids.crc2.restore();
        }
        isHit(_hotspot) {
            let hitsize = 50 * this.size;
            let difference = new L11_Asteroids.Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize);
        }
    }
    L11_Asteroids.Asteroid = Asteroid;
})(L11_Asteroids || (L11_Asteroids = {}));
//# sourceMappingURL=Asteroid.js.map
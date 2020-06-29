"use strict";
var L11_Asteroids;
(function (L11_Asteroids) {
    class Ufo extends L11_Asteroids.Moveable {
        constructor(_position) {
            super();
            this.hitRadius = 25;
            this.position = new L11_Asteroids.Vector(0, Math.random() * L11_Asteroids.crc2.canvas.height);
            this.velocity = new L11_Asteroids.Vector(Math.random() < 0.5 ? -1 : 1, Math.floor(Math.random() * 3) - 1);
            this.velocity.scale(Ufo.speed);
        }
        draw() {
            L11_Asteroids.crc2.save();
            L11_Asteroids.crc2.translate(this.position.x, this.position.y);
            L11_Asteroids.crc2.translate(-30, -17);
            L11_Asteroids.crc2.stroke(L11_Asteroids.ufoPath);
            L11_Asteroids.crc2.restore();
        }
        move(_timeslice) {
            super.move(_timeslice);
            if (Math.random() < 0.01)
                this.shoot();
            if (Math.random() < 0.02)
                this.velocity.y = Ufo.speed * (Math.floor(Math.random() * 3) - 1);
        }
        shoot() {
            let event = new CustomEvent("ufoShoots", { detail: { ufo: this } });
            L11_Asteroids.crc2.canvas.dispatchEvent(event);
        }
    }
    Ufo.speed = 50;
    L11_Asteroids.Ufo = Ufo;
})(L11_Asteroids || (L11_Asteroids = {}));
//# sourceMappingURL=Ufo.js.map
"use strict";
var L11_Asteroids;
(function (L11_Asteroids) {
    class Projectile extends L11_Asteroids.Moveable {
        constructor(_position, _velocity) {
            super(_position);
            this.velocity = _velocity.copy();
            this.lifetime = Projectile.maxLifetime;
        }
        draw() {
            L11_Asteroids.crc2.save();
            L11_Asteroids.crc2.translate(this.position.x, this.position.y);
            L11_Asteroids.crc2.strokeRect(-1, -1, 1, 1);
            L11_Asteroids.crc2.restore();
        }
        move(_timeslice) {
            super.move(_timeslice);
            this.lifetime -= _timeslice;
            this.expandable = this.lifetime <= 0;
        }
    }
    Projectile.maxLifetime = 2;
    L11_Asteroids.Projectile = Projectile;
})(L11_Asteroids || (L11_Asteroids = {}));
//# sourceMappingURL=Projectile.js.map
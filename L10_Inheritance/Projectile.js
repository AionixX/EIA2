"use strict";
var L10_Asteroids;
(function (L10_Asteroids) {
    class Projectile extends L10_Asteroids.Moveable {
        constructor(_position, _velocity) {
            super(_position);
            this.lifetime = 2;
            console.log("create Projectile");
            this.velocity = _velocity.copy();
        }
        draw() {
            L10_Asteroids.crc2.save();
            L10_Asteroids.crc2.translate(this.position.x, this.position.y);
            L10_Asteroids.crc2.strokeRect(-1, -1, 1, 1);
            L10_Asteroids.crc2.restore();
        }
        move(_timeslice) {
            super.move(_timeslice);
            this.lifetime -= _timeslice;
            this.expandable = this.lifetime <= 0;
        }
    }
    L10_Asteroids.Projectile = Projectile;
})(L10_Asteroids || (L10_Asteroids = {}));
//# sourceMappingURL=Projectile.js.map
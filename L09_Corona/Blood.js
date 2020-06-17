"use strict";
var L09_Corona;
(function (L09_Corona) {
    class Blood {
        constructor(_position, _velocity, _size) {
            this.position = _position ? _position : new L09_Corona.Vector(random(0, L09_Corona.canvas.width), random(0, L09_Corona.canvas.height));
            this.velocity = _velocity ? _velocity : new L09_Corona.Vector(random(125, 175), random(-10, 10));
            this.size = _size ? _size : random(20, 50);
            this.bloodColor = L09_Corona.crc.createRadialGradient(0, 0, 0, 0, 0, this.size);
            this.bloodColor.addColorStop(0, "HSL(360, 100%, 2%)");
            this.bloodColor.addColorStop(1, "HSL(360, 80%, 35%)");
            this.draw();
        }
        draw() {
            this.drawCircle(this.position, this.size);
        }
        update(_timeslice) {
            if (this.position.x > L09_Corona.crc.canvas.width)
                this.position.x = 0;
            if (this.position.y > L09_Corona.crc.canvas.height)
                this.position.y = 0;
            if (this.position.y < 0)
                this.position.y = L09_Corona.crc.canvas.height;
            let offset = new L09_Corona.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            this.draw();
        }
        drawCircle(_position, _size) {
            L09_Corona.crc.fillStyle = this.bloodColor;
            L09_Corona.crc.save();
            L09_Corona.crc.translate(_position.x, _position.y);
            L09_Corona.crc.beginPath();
            L09_Corona.crc.arc(0, 0, _size, 0, 2 * Math.PI);
            L09_Corona.crc.closePath();
            L09_Corona.crc.fill();
            L09_Corona.crc.restore();
        }
    }
    L09_Corona.Blood = Blood;
    function random(_min, _max) {
        let rand = (Math.random() * (_max - _min)) + _min;
        return rand;
    }
})(L09_Corona || (L09_Corona = {}));
//# sourceMappingURL=Blood.js.map
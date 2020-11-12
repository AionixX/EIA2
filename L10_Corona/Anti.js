"use strict";
var L10_Corona;
(function (L10_Corona) {
    class Anti extends L10_Corona.Drawable {
        constructor(_position, _velocity, _size) {
            let position = _position ? _position : new L10_Corona.Vector(random(0, L10_Corona.canvas.width), random(0, L10_Corona.canvas.height));
            let velocity = _velocity ? _velocity : new L10_Corona.Vector(random(100, 100), random(-100, 100));
            let size = _size ? _size : random(5, 15);
            let antiColor = L10_Corona.crc.createRadialGradient(0, 0, 0, 0, 0, size);
            antiColor.addColorStop(0, "HSL(200, 100%, 28%)");
            antiColor.addColorStop(1, "HSL(200, 80%, 35%)");
            super(position, velocity, size, antiColor);
            this.target = null;
            this.offset = new L10_Corona.Vector(random(-0.1, 0.1), random(-0.1, 0.1));
            this.speed = random(0.3, 0.6);
            this.draw();
        }
        draw() {
            this.drawEnds(this.position, this.size);
            //this.drawCircle(this.position, this.size);
        }
        update(_timeslice) {
            if (!this.target)
                this.searchTarget();
            if (random(0, 100) < 0.1)
                this.searchTarget();
            this.followTarget(_timeslice);
            this.draw();
        }
        searchTarget() {
            let coronaViren = L10_Corona.getCoronaViren();
            if (coronaViren.length < 1)
                return;
            this.offset = new L10_Corona.Vector(random(-0.1, 0.1), random(-0.1, 0.1));
            this.speed = random(0.3, 0.6);
            this.target = coronaViren[Math.floor(random(0, coronaViren.length))];
        }
        followTarget(_timeslice) {
            if (!this.target)
                return;
            let direction = this.position.substract(this.target.position);
            direction.add(this.offset);
            direction.scale(_timeslice * this.speed);
            this.position.add(direction);
        }
        drawCircle(_position, _size) {
            L10_Corona.crc.fillStyle = this.color;
            L10_Corona.crc.save();
            L10_Corona.crc.translate(_position.x, _position.y);
            L10_Corona.crc.beginPath();
            L10_Corona.crc.arc(0, 0, _size, 0, 2 * Math.PI);
            L10_Corona.crc.fill();
            L10_Corona.crc.closePath();
            L10_Corona.crc.restore();
        }
        drawEnds(_position, _size) {
            L10_Corona.crc.strokeStyle = this.color;
            L10_Corona.crc.lineWidth = 10;
            let angle = (2 * Math.PI) / 3;
            for (let i = 1; i <= 3; i++) {
                L10_Corona.crc.save();
                L10_Corona.crc.translate(_position.x, _position.y);
                let pos = new L10_Corona.Vector(Math.cos(i * angle) * (1.5 * _size), Math.sin(i * angle) * (1.5 * _size));
                L10_Corona.crc.beginPath();
                L10_Corona.crc.moveTo(pos.x, pos.y);
                L10_Corona.crc.lineTo(0, 0);
                L10_Corona.crc.closePath();
                L10_Corona.crc.stroke();
                this.drawCircle(pos, (_size / 2));
                L10_Corona.crc.restore();
            }
        }
    }
    L10_Corona.Anti = Anti;
    function random(_min, _max) {
        let rand = (Math.random() * (_max - _min)) + _min;
        return rand;
    }
})(L10_Corona || (L10_Corona = {}));
//# sourceMappingURL=Anti.js.map
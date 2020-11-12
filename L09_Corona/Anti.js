"use strict";
var L09_Corona;
(function (L09_Corona) {
    class Anti {
        constructor(_position, _velocity, _size) {
            this.position = _position ? _position : new L09_Corona.Vector(random(0, L09_Corona.canvas.width), random(0, L09_Corona.canvas.height));
            this.velocity = _velocity ? _velocity : new L09_Corona.Vector(random(100, 100), random(-100, 100));
            this.size = _size ? _size : random(5, 15);
            this.target = null;
            this.offset = new L09_Corona.Vector(random(-0.1, 0.1), random(-0.1, 0.1));
            this.speed = random(0.3, 0.6);
            this.antiColor = L09_Corona.crc.createRadialGradient(0, 0, 0, 0, 0, this.size);
            this.antiColor.addColorStop(0, "HSL(200, 100%, 28%)");
            this.antiColor.addColorStop(1, "HSL(200, 80%, 35%)");
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
            let coronaViren = L09_Corona.getCoronaViren();
            if (coronaViren.length < 1)
                return;
            this.offset = new L09_Corona.Vector(random(-0.1, 0.1), random(-0.1, 0.1));
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
            L09_Corona.crc.fillStyle = this.antiColor;
            L09_Corona.crc.save();
            L09_Corona.crc.translate(_position.x, _position.y);
            L09_Corona.crc.beginPath();
            L09_Corona.crc.arc(0, 0, _size, 0, 2 * Math.PI);
            L09_Corona.crc.fill();
            L09_Corona.crc.closePath();
            L09_Corona.crc.restore();
        }
        drawEnds(_position, _size) {
            L09_Corona.crc.strokeStyle = this.antiColor;
            L09_Corona.crc.lineWidth = 10;
            let angle = (2 * Math.PI) / 3;
            for (let i = 1; i <= 3; i++) {
                L09_Corona.crc.save();
                L09_Corona.crc.translate(_position.x, _position.y);
                let pos = new L09_Corona.Vector(Math.cos(i * angle) * (1.5 * _size), Math.sin(i * angle) * (1.5 * _size));
                L09_Corona.crc.beginPath();
                L09_Corona.crc.moveTo(pos.x, pos.y);
                L09_Corona.crc.lineTo(0, 0);
                L09_Corona.crc.closePath();
                L09_Corona.crc.stroke();
                this.drawCircle(pos, (_size / 2));
                L09_Corona.crc.restore();
            }
        }
    }
    L09_Corona.Anti = Anti;
    function random(_min, _max) {
        let rand = (Math.random() * (_max - _min)) + _min;
        return rand;
    }
})(L09_Corona || (L09_Corona = {}));
//# sourceMappingURL=Anti.js.map
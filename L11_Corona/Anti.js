"use strict";
var L11_Corona;
(function (L11_Corona) {
    class Anti extends L11_Corona.Drawable {
        constructor(_position, _velocity, _size) {
            let position = _position ? _position : new L11_Corona.Vector(random(0, L11_Corona.canvas.width), random(0, L11_Corona.canvas.height));
            let velocity = _velocity ? _velocity : new L11_Corona.Vector(random(100, 100), random(-100, 100));
            let size = _size ? _size : random(5, 15);
            let antiColor = L11_Corona.crc.createRadialGradient(0, 0, 0, 0, 0, size);
            antiColor.addColorStop(0, "HSL(200, 100%, 28%)");
            antiColor.addColorStop(1, "HSL(200, 80%, 35%)");
            super(position, velocity, size, antiColor);
            this.target = null;
            this.offset = new L11_Corona.Vector(random(-0.1, 0.1), random(-0.1, 0.1));
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
            let coronaViren = L11_Corona.getCoronaViren();
            if (coronaViren.length < 1)
                return;
            this.offset = new L11_Corona.Vector(random(-0.1, 0.1), random(-0.1, 0.1));
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
            L11_Corona.crc.fillStyle = this.color;
            L11_Corona.crc.save();
            L11_Corona.crc.translate(_position.x, _position.y);
            L11_Corona.crc.beginPath();
            L11_Corona.crc.arc(0, 0, _size, 0, 2 * Math.PI);
            L11_Corona.crc.fill();
            L11_Corona.crc.closePath();
            L11_Corona.crc.restore();
        }
        drawEnds(_position, _size) {
            L11_Corona.crc.strokeStyle = this.color;
            L11_Corona.crc.lineWidth = 10;
            let angle = (2 * Math.PI) / 3;
            for (let i = 1; i <= 3; i++) {
                L11_Corona.crc.save();
                L11_Corona.crc.translate(_position.x, _position.y);
                let pos = new L11_Corona.Vector(Math.cos(i * angle) * (1.5 * _size), Math.sin(i * angle) * (1.5 * _size));
                L11_Corona.crc.beginPath();
                L11_Corona.crc.moveTo(pos.x, pos.y);
                L11_Corona.crc.lineTo(0, 0);
                L11_Corona.crc.closePath();
                L11_Corona.crc.stroke();
                this.drawCircle(pos, (_size / 2));
                L11_Corona.crc.restore();
            }
        }
    }
    L11_Corona.Anti = Anti;
    function random(_min, _max) {
        let rand = (Math.random() * (_max - _min)) + _min;
        return rand;
    }
})(L11_Corona || (L11_Corona = {}));
//# sourceMappingURL=Anti.js.map
"use strict";
var L09_Corona;
(function (L09_Corona) {
    class Corona {
        constructor(_position, _velocity, _size, _ends) {
            this.position = _position ? _position : new L09_Corona.Vector(random(0, L09_Corona.canvas.width), random(0, L09_Corona.canvas.height));
            this.velocity = _velocity ? _velocity : new L09_Corona.Vector(random(25, 125), random(-50, 50));
            this.size = _size ? _size : random(20, 50);
            this.ends = _ends ? _ends : random(6, 9);
            this.coronaColor = L09_Corona.crc.createRadialGradient(0, 0, 0, 0, 0, this.size);
            this.coronaColor.addColorStop(0, "HSL(130, 100%, 8%)");
            this.coronaColor.addColorStop(1, "HSL(130, 100%, 35%)");
            this.draw();
        }
        draw() {
            this.drawEnds(this.position, this.size);
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
            L09_Corona.crc.save();
            L09_Corona.crc.translate(_position.x, _position.y);
            L09_Corona.crc.beginPath();
            L09_Corona.crc.fillStyle = this.coronaColor;
            L09_Corona.crc.arc(0, 0, _size, 0, 2 * Math.PI);
            L09_Corona.crc.fill();
            L09_Corona.crc.closePath();
            L09_Corona.crc.restore();
        }
        drawEnds(_position, _size) {
            L09_Corona.crc.strokeStyle = this.coronaColor;
            L09_Corona.crc.lineWidth = 10;
            let angle = (2 * Math.PI) / this.ends;
            for (let i = 1; i <= this.ends; i++) {
                L09_Corona.crc.save();
                L09_Corona.crc.translate(_position.x, _position.y);
                let pos = new L09_Corona.Vector(Math.cos(i * angle) * (1.5 * _size), Math.sin(i * angle) * (1.5 * _size));
                L09_Corona.crc.beginPath();
                L09_Corona.crc.moveTo(pos.x, pos.y);
                L09_Corona.crc.lineTo(0, 0);
                L09_Corona.crc.closePath();
                L09_Corona.crc.stroke();
                this.drawCircle(pos, (_size / 3));
                L09_Corona.crc.restore();
            }
        }
    }
    L09_Corona.Corona = Corona;
    function random(_min, _max) {
        let rand = (Math.random() * (_max - _min)) + _min;
        return rand;
    }
})(L09_Corona || (L09_Corona = {}));
//# sourceMappingURL=Corona.js.map
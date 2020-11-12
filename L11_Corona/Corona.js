"use strict";
var L11_Corona;
(function (L11_Corona) {
    class Corona extends L11_Corona.Drawable {
        constructor(_position, _velocity, _size, _ends, _color) {
            let position = _position ? _position : new L11_Corona.Vector(L11_Corona.random(0, L11_Corona.canvas.width), L11_Corona.random(0, L11_Corona.canvas.height));
            let velocity = _velocity ? _velocity : new L11_Corona.Vector(L11_Corona.random(25, 125), L11_Corona.random(-50, 50));
            let size = _size ? _size : L11_Corona.random(20, 50);
            let coronaColor = L11_Corona.crc.createRadialGradient(0, 0, 0, 0, 0, size);
            coronaColor.addColorStop(0, "HSL(130, 100%, 8%)");
            coronaColor.addColorStop(1, "HSL(130, 100%, 35%)");
            super(position, velocity, size, coronaColor);
            this.ends = _ends ? _ends : L11_Corona.random(6, 9);
            this.draw();
        }
        draw() {
            this.drawEnds(this.position, this.size);
            this.drawCircle(this.position, this.size);
        }
        update(_timeslice) {
            if (this.position.x > L11_Corona.crc.canvas.width)
                this.position.x = 0;
            if (this.position.y > L11_Corona.crc.canvas.height)
                this.position.y = 0;
            if (this.position.y < 0)
                this.position.y = L11_Corona.crc.canvas.height;
            let offset = new L11_Corona.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            this.draw();
        }
        drawCircle(_position, _size) {
            L11_Corona.crc.save();
            L11_Corona.crc.translate(_position.x, _position.y);
            L11_Corona.crc.beginPath();
            L11_Corona.crc.fillStyle = this.color;
            L11_Corona.crc.arc(0, 0, _size, 0, 2 * Math.PI);
            L11_Corona.crc.fill();
            L11_Corona.crc.closePath();
            L11_Corona.crc.restore();
        }
        drawEnds(_position, _size) {
            L11_Corona.crc.strokeStyle = this.color;
            L11_Corona.crc.lineWidth = 10;
            let angle = (2 * Math.PI) / this.ends;
            for (let i = 1; i <= this.ends; i++) {
                L11_Corona.crc.save();
                L11_Corona.crc.translate(_position.x, _position.y);
                let pos = new L11_Corona.Vector(Math.cos(i * angle) * (1.5 * _size), Math.sin(i * angle) * (1.5 * _size));
                L11_Corona.crc.beginPath();
                L11_Corona.crc.moveTo(pos.x, pos.y);
                L11_Corona.crc.lineTo(0, 0);
                L11_Corona.crc.closePath();
                L11_Corona.crc.stroke();
                this.drawCircle(pos, (_size / 3));
                L11_Corona.crc.restore();
            }
        }
    }
    L11_Corona.Corona = Corona;
})(L11_Corona || (L11_Corona = {}));
//# sourceMappingURL=Corona.js.map
"use strict";
var Corona;
(function (Corona) {
    window.addEventListener("load", init);
    let crc;
    let elements = [];
    function init() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc = canvas.getContext("2d");
        drawBackground();
        drawCells();
        drawElements();
    }
    function drawBackground() {
        let gradient = crc.createLinearGradient(0, 0, 0, crc.canvas.height);
        gradient.addColorStop(0, "HSL(10, 100%, 50%)");
        gradient.addColorStop(0.3, "HSL(10, 80%, 35%)");
        gradient.addColorStop(0.5, "HSL(10, 80%, 35%)");
        gradient.addColorStop(0.7, "HSL(10, 80%, 35%)");
        gradient.addColorStop(1, "HSL(10, 100%, 50%)");
        crc.fillStyle = gradient;
        crc.fillRect(0, 0, crc.canvas.width, crc.canvas.height);
        let pattern = document.createElement("canvas").getContext("2d");
        pattern.canvas.width = 40;
        pattern.canvas.height = 20;
        pattern.fillStyle = "transparent";
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        pattern.moveTo(0, 10);
        pattern.lineTo(10, 10);
        pattern.lineTo(10, 5);
        pattern.lineTo(20, 0);
        pattern.lineTo(30, 0);
        pattern.lineTo(40, 5);
        pattern.lineTo(40, 15);
        pattern.lineTo(30, 20);
        pattern.lineTo(20, 20);
        pattern.lineTo(10, 15);
        pattern.lineTo(10, 10);
        pattern.lineTo(10, 10);
        pattern.lineWidth = 0.1;
        pattern.stroke();
        crc.fillStyle = crc.createPattern(pattern.canvas, "repeat");
        crc.fillRect(0, 0, crc.canvas.width, crc.canvas.height);
    }
    function drawCells() {
        console.log("Cell");
    }
    function drawElements() {
        let coronaColor = crc.createRadialGradient(0, 0, 0, 0, 0, 40);
        coronaColor.addColorStop(0, "HSL(130, 100%, 28%)");
        coronaColor.addColorStop(1, "HSL(130, 100%, 35%)");
        let antiColor = crc.createRadialGradient(0, 0, 0, 0, 0, 40);
        antiColor.addColorStop(0, "HSL(200, 100%, 28%)");
        antiColor.addColorStop(1, "HSL(200, 100%, 35%)");
        do {
            let element = {
                position: {
                    x: Corona.random(120, crc.canvas.width - 120),
                    y: Corona.random(120, crc.canvas.height - 60)
                },
                size: Corona.random(20, 40)
            };
            let rndElement = Math.floor(Corona.random(0, 2));
            drawEnds(element.position, element.size, rndElement == 0 ? coronaColor : antiColor);
            drawCircle(element.position, element.size, rndElement == 0 ? coronaColor : antiColor);
            elements.push(element);
        } while (elements.length < 10);
    }
    function drawCircle(_position, _size, _gradient) {
        crc.save();
        crc.translate(_position.x, _position.y);
        crc.fillStyle = _gradient ? _gradient : "black";
        crc.arc(0, 0, _size, 0, 2 * Math.PI);
        crc.fill();
        crc.closePath();
        crc.restore();
    }
    function drawEnds(_position, _size, _color) {
        crc.strokeStyle = _color ? _color : "black";
        crc.lineWidth = 10;
        let rnd = Math.floor(Corona.random(6, 9));
        let angle = (2 * Math.PI) / rnd;
        for (let i = 1; i <= rnd; i++) {
            crc.save();
            crc.translate(_position.x, _position.y);
            let pos = {
                x: Math.cos(i * angle) * (1.5 * _size),
                y: Math.sin(i * angle) * (1.5 * _size)
            };
            crc.beginPath();
            crc.moveTo(pos.x, pos.y);
            crc.lineTo(0, 0);
            crc.closePath();
            crc.stroke();
            drawCircle(pos, (_size / 3), _color);
            crc.restore();
        }
    }
    // function isElementValid(_element: Element): boolean {
    //   for (let el of elements) {
    //     let dist: number = Math.pow((el.position.x - _element.position.x), 1) + Math.pow((el.position.y - _element.position.y), 1);
    //     if (dist < 150)
    //       return false;
    //   }
    //   return true;
    // }
})(Corona || (Corona = {}));
//# sourceMappingURL=index.js.map
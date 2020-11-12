"use strict";
var L10_Corona;
(function (L10_Corona) {
    window.addEventListener("load", handleLoad);
    L10_Corona.coronaViren = [];
    L10_Corona.antiViren = [];
    L10_Corona.blood = [];
    let imgData;
    function handleLoad() {
        L10_Corona.canvas = document.querySelector("canvas");
        L10_Corona.crc = L10_Corona.canvas.getContext("2d");
        drawBackground();
        imgData = L10_Corona.crc.getImageData(0, 0, L10_Corona.crc.canvas.width, L10_Corona.crc.canvas.height);
        for (let i = 0; i < 5; i++)
            L10_Corona.blood.push(new L10_Corona.Blood());
        for (let i = 0; i < 10; i++)
            L10_Corona.coronaViren.push(new L10_Corona.Corona());
        for (let i = 0; i < 5; i++)
            L10_Corona.blood.push(new L10_Corona.Blood());
        for (let i = 0; i < 20; i++)
            L10_Corona.antiViren.push(new L10_Corona.Anti());
        for (let i = 0; i < 5; i++)
            L10_Corona.blood.push(new L10_Corona.Blood());
        window.setInterval(update, 20);
    }
    function drawBackground() {
        let gradient = L10_Corona.crc.createLinearGradient(0, 0, 0, L10_Corona.crc.canvas.height);
        gradient.addColorStop(0, "HSL(10, 100%, 50%)");
        gradient.addColorStop(0.3, "HSL(10, 80%, 35%)");
        gradient.addColorStop(0.5, "HSL(10, 80%, 35%)");
        gradient.addColorStop(0.7, "HSL(10, 80%, 35%)");
        gradient.addColorStop(1, "HSL(10, 100%, 50%)");
        L10_Corona.crc.fillStyle = gradient;
        L10_Corona.crc.fillRect(0, 0, L10_Corona.crc.canvas.width, L10_Corona.crc.canvas.height);
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
        L10_Corona.crc.fillStyle = L10_Corona.crc.createPattern(pattern.canvas, "repeat");
        L10_Corona.crc.fillRect(0, 0, L10_Corona.crc.canvas.width, L10_Corona.crc.canvas.height);
    }
    function update() {
        L10_Corona.crc.putImageData(imgData, 0, 0);
        for (let corona of L10_Corona.coronaViren)
            corona.update(1 / 50);
        for (let anti of L10_Corona.antiViren)
            anti.update(1 / 50);
        for (let bloodPiece of L10_Corona.blood)
            bloodPiece.update(1 / 50);
    }
    function getCoronaViren() {
        return L10_Corona.coronaViren;
    }
    L10_Corona.getCoronaViren = getCoronaViren;
})(L10_Corona || (L10_Corona = {}));
//# sourceMappingURL=Main.js.map
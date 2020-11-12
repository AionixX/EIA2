"use strict";
var L11_Corona;
(function (L11_Corona) {
    window.addEventListener("load", handleLoad);
    L11_Corona.coronaViren = [];
    L11_Corona.antiViren = [];
    L11_Corona.blood = [];
    let imgData;
    function handleLoad() {
        L11_Corona.canvas = document.querySelector("canvas");
        L11_Corona.crc = L11_Corona.canvas.getContext("2d");
        drawBackground();
        imgData = L11_Corona.crc.getImageData(0, 0, L11_Corona.crc.canvas.width, L11_Corona.crc.canvas.height);
        for (let i = 0; i < 5; i++)
            L11_Corona.blood.push(new L11_Corona.Blood());
        for (let i = 0; i < 10; i++)
            L11_Corona.coronaViren.push(new L11_Corona.Corona());
        for (let i = 0; i < 5; i++)
            L11_Corona.blood.push(new L11_Corona.Blood());
        for (let i = 0; i < 20; i++)
            L11_Corona.antiViren.push(new L11_Corona.Anti());
        for (let i = 0; i < 5; i++)
            L11_Corona.blood.push(new L11_Corona.Blood());
        L11_Corona.canvas.addEventListener("click", updateTarget);
        window.setInterval(update, 20);
    }
    function updateTarget(_event) {
        L11_Corona.coronaViren.forEach(virus => {
            if ((_event.clientX > (virus.position.x - (virus.size / 2)) && _event.clientX < (virus.position.x + (virus.size / 2))) && (_event.clientY > (virus.position.y - (virus.size / 2)) && _event.clientY < (virus.position.y + (virus.size / 2)))) {
                L11_Corona.antiViren.forEach(anti => {
                    anti.target = virus;
                });
                return;
            }
        });
    }
    function drawBackground() {
        let gradient = L11_Corona.crc.createLinearGradient(0, 0, 0, L11_Corona.crc.canvas.height);
        gradient.addColorStop(0, "HSL(10, 100%, 50%)");
        gradient.addColorStop(0.3, "HSL(10, 80%, 35%)");
        gradient.addColorStop(0.5, "HSL(10, 80%, 35%)");
        gradient.addColorStop(0.7, "HSL(10, 80%, 35%)");
        gradient.addColorStop(1, "HSL(10, 100%, 50%)");
        L11_Corona.crc.fillStyle = gradient;
        L11_Corona.crc.fillRect(0, 0, L11_Corona.crc.canvas.width, L11_Corona.crc.canvas.height);
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
        L11_Corona.crc.fillStyle = L11_Corona.crc.createPattern(pattern.canvas, "repeat");
        L11_Corona.crc.fillRect(0, 0, L11_Corona.crc.canvas.width, L11_Corona.crc.canvas.height);
    }
    function update() {
        L11_Corona.crc.putImageData(imgData, 0, 0);
        for (let corona of L11_Corona.coronaViren)
            corona.update(1 / 50);
        for (let anti of L11_Corona.antiViren)
            anti.update(1 / 50);
        for (let bloodPiece of L11_Corona.blood)
            bloodPiece.update(1 / 50);
    }
    function getCoronaViren() {
        return L11_Corona.coronaViren;
    }
    L11_Corona.getCoronaViren = getCoronaViren;
})(L11_Corona || (L11_Corona = {}));
//# sourceMappingURL=Main.js.map
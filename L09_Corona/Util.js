"use strict";
var L09_Corona;
(function (L09_Corona) {
    function random(_min, _max) {
        let rand = (Math.random() * (_max - _min)) + _min;
        return rand;
    }
    L09_Corona.random = random;
})(L09_Corona || (L09_Corona = {}));
//# sourceMappingURL=Util.js.map
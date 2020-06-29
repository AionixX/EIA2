"use strict";
var L10_Corona;
(function (L10_Corona) {
    function random(_min, _max) {
        let rand = (Math.random() * (_max - _min)) + _min;
        return rand;
    }
    L10_Corona.random = random;
})(L10_Corona || (L10_Corona = {}));
//# sourceMappingURL=Util.js.map
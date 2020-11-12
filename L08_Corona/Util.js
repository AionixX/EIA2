"use strict";
var Corona;
(function (Corona) {
    function random(_min, _max) {
        let rand = (Math.random() * (_max - _min)) + _min;
        return rand;
    }
    Corona.random = random;
})(Corona || (Corona = {}));
//# sourceMappingURL=Util.js.map
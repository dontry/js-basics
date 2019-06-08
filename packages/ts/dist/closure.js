"use strict";
var Counter = /** @class */ (function () {
    function Counter() {
        this.number = 0;
    }
    Counter.prototype._changeBy = function (val) {
        Counter._COUNTER += val;
    };
    Counter.prototype.increment = function () {
        this._changeBy(-1);
    };
    Counter.prototype.value = function () {
        return Counter._COUNTER;
    };
    Counter._COUNTER = 0;
    return Counter;
}());

"use strict";
exports.__esModule = true;
var SwitchController = /** @class */ (function () {
    function SwitchController() {
    }
    SwitchController.prototype.On = function () {
        this.state = true;
    };
    SwitchController.prototype.Off = function () {
        this.state = false;
    };
    SwitchController.prototype.isOn = function () {
        return this.state;
    };
    return SwitchController;
}());
exports.SwitchController = SwitchController;

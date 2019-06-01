"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var util_1 = require("util");
var DisplayController_1 = require("./DisplayController");
var Container_1 = require("./Container");
var SwitchController_1 = require("./SwitchController");
/**
 * Promisify setTimeOut for async/await
 */
var sleep = util_1.promisify(setTimeout);
/**
 * Types with error messages
 */
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes["milkEmpty"] = "Milk container is empty. Refill";
    ErrorCodes["waterEmpty"] = "Water container is empty. Refill";
    ErrorCodes["powderEmpty"] = "Out of Coffee Powder. Restock";
})(ErrorCodes || (ErrorCodes = {}));
var CoffeeController = /** @class */ (function () {
    function CoffeeController() {
    }
    /**
     * Intitialize the coffee machine with provided values for ingredients
     * @param values ingredients in form of InputQuantity
     */
    CoffeeController.prototype.init = function (values) {
        this["switch"] = new SwitchController_1.SwitchController();
        this["switch"].On();
        this.display = new DisplayController_1.DisplayController();
        this.milkContainer = new Container_1.Container(Container_1.ContainerTypes.MILK, values.milk, 1000);
        this.waterContainer = new Container_1.Container(Container_1.ContainerTypes.WATER, values.water, 1500);
        this.coffeePowderContainer = new Container_1.Container(Container_1.ContainerTypes.COFFEE_POWDER, values.coffee, 500);
    };
    /**
     * Check if brewing is possible with given values and current values of containers.
     * @param recipe User input recipe
     */
    CoffeeController.prototype.checkBrew = function (recipe) {
        if (this.milkContainer.isEmpty() || !this.milkContainer.checkFeasibility(recipe.Milk)) {
            this.display.show(DisplayController_1.Status.DANGER, ErrorCodes.milkEmpty);
            return false;
        }
        if (this.waterContainer.isEmpty() || !this.waterContainer.checkFeasibility(recipe.Water)) {
            this.display.show(DisplayController_1.Status.DANGER, ErrorCodes.waterEmpty);
            return false;
        }
        if (this.coffeePowderContainer.isEmpty() || !this.coffeePowderContainer.checkFeasibility(recipe.Coffee)) {
            this.display.show(DisplayController_1.Status.DANGER, ErrorCodes.powderEmpty);
            return false;
        }
        return true;
    };
    /**
     * Brew the coffee
     * @param recipe User input recipe
     */
    CoffeeController.prototype.brew = function (recipe) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this["switch"].isOn()) {
                            return [2 /*return*/];
                        }
                        if (!this.checkBrew(recipe)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.display.show(DisplayController_1.Status.CORRECT, "Brewing Coffee for you ...")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.milkContainer.useContent(recipe.Milk)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.waterContainer.useContent(recipe.Water)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.coffeePowderContainer.useContent(recipe.Coffee)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, sleep(10000)]; //time taken to brew coffee(assumption)
                    case 5:
                        _a.sent(); //time taken to brew coffee(assumption)
                        return [4 /*yield*/, this.display.show(DisplayController_1.Status.CORRECT, "Finished Brewing")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.display.show(DisplayController_1.Status.CORRECT, "Thanks for using the machine")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, sleep(2000)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CoffeeController;
}());
exports.CoffeeController = CoffeeController;

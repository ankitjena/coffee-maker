"use strict";
exports.__esModule = true;
/**
 * Types of containers
 */
var ContainerTypes;
(function (ContainerTypes) {
    ContainerTypes["MILK"] = "Milk";
    ContainerTypes["WATER"] = "Water";
    ContainerTypes["COFFEE_POWDER"] = "Coffee powder";
})(ContainerTypes = exports.ContainerTypes || (exports.ContainerTypes = {}));
var Container = /** @class */ (function () {
    /**
     *
     * @param type One of the type of containers
     * @param initialValue the value to initilalize the container with
     * @param maxValue max capacity of the container
     */
    function Container(type, initialValue, maxValue) {
        this.type = type;
        this.quantity = initialValue;
        this.maxQuantity = maxValue;
    }
    /**
     * check if container is empty or not
     */
    Container.prototype.isEmpty = function () {
        if (this.quantity > 0) {
            return false;
        }
        return true;
    };
    /**
     * Check if amount needed by recipe is available or nor
     * @param value the amount needed by the recipe
     */
    Container.prototype.checkFeasibility = function (value) {
        if (this.quantity - value > 0) {
            return true;
        }
        return false;
    };
    /**
     * Use the amount specified from the container
     * @param value amount needed by recipe
     */
    Container.prototype.useContent = function (value) {
        this.quantity -= value;
    };
    /**
     * returns the current quantity in container
     */
    Container.prototype.returnQuantity = function () {
        return this.quantity;
    };
    return Container;
}());
exports.Container = Container;

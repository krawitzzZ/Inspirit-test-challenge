define(function (require) {
    var help = require('./helper'),
        API = require('components/common/network/api');

    function Model() {
        this.productsExist = false;
        this.fruits = {};
        this.vegetables = {};
    }

    Model.prototype.get = function () {
        return API.dataSet();
    };

    Model.prototype.addProduct = function (serverResponse) {
        if (!this.fruits.hasOwnProperty(serverResponse.item) && !this.vegetables.hasOwnProperty(serverResponse.item)) {
            switch (serverResponse.type) {
                case help.FRUIT:
                    this.fruits[serverResponse.item] = 1;
                    break;
                case help.VEGETABLE:
                    this.vegetables[serverResponse.item] = 1;
                    break;
                default:
                    throw new Error('Unknown type of product');
            }
            this.productsExist = true;
        } else {
            this.countProducts(serverResponse);
        }
    };

    Model.prototype.countProducts = function (serverResponse) {
        switch (serverResponse.type) {
            case help.FRUIT:
                this.fruits[serverResponse.item]++;
                break;
            case help.VEGETABLE:
                this.vegetables[serverResponse.item]++;
                break;
            default:
                throw new Error('Unknown type of product');
        }
    };

    Model.prototype.clearProducts = function () {
        this.fruits = {};
        this.vegetables = {};
        this.productsExist = false;
    };

    return Model;
});

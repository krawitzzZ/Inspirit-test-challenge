define([], function () {

    var thirdTaskModel = {

        FRUIT: 'fruit',
        VEGETABLE: 'vegetable',
        productsExist: false,
        fruits: {},
        vegetables: {},
        addProduct: function (type, item) {
            if (!this.fruits.hasOwnProperty(item) && !this.vegetables.hasOwnProperty(item)) {
                switch (type) {
                    case this.FRUIT: this.fruits[item] = 1;
                        break;
                    case  this.VEGETABLE: this.vegetables[item] = 1;
                        break;
                }
                this.productsExist = true;
            } else {
                this.countProducts(type, item);
            }
        },
        countProducts: function (type, item) {
            switch (type) {
                case this.FRUIT: this.fruits[item]++;
                    break;
                case  this.VEGETABLE: this.vegetables[item]++;
                    break;
            }
        },
        clearProducts: function () {
            this.fruits = {};
            this.vegetables = {};
            this.productsExist = false;
        }
    };
    return thirdTaskModel;
});
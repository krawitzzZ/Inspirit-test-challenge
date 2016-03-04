define([], function () {

    var thirdTaskModel = {

        productsExist: false,
        fruits: {},
        vegetables: {},
        addProduct: function (type, item) {
            if (!this.fruits.hasOwnProperty(item) && !this.vegetables.hasOwnProperty(item)) {
                switch (type) {
                    case 'fruit': this.fruits[item] = 1;
                        break;
                    case  'vegetable': this.vegetables[item] = 1;
                        break;
                }
                this.productsExist = true;
            } else {
                this.countProducts(type, item);
            }
        },
        countProducts: function (type, item) {
            switch (type) {
                case 'fruit': this.fruits[item]++;
                    break;
                case  'vegetable': this.vegetables[item]++;
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
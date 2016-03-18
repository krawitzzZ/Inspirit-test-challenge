define(function (require) {
    describe('Third task model class', function () {
        var Model = require('../../js/components/thirdTask/model');

        it('Create an instance with default properties', function () {
            var model = new Model();
            expect(model.productsExist).toBe(false);
            expect(typeof model.fruits).toBe('object');
            expect(typeof model.vegetables).toBe('object');
        });

        it('get() returns deferred promise with methods done, fail and always', function () {
            var model = new Model();
            expect(typeof model.get().done).toBe('function');
            expect(typeof model.get().fail).toBe('function');
            expect(typeof model.get().always).toBe('function');
        });

        it('addProduct() adds new type of product or increase current value if same type already exists', function () {
            var model = new Model();

            model.addProduct({
                type: 'fruit',
                item: 'apple'
            });
            expect(model.fruits).toEqual({apple: 1});

            model.addProduct({
                type: 'fruit',
                item: 'apple'
            });
            expect(model.fruits).toEqual({apple: 2});

            model.addProduct({
                type: 'vegetable',
                item: 'cucumber'
            });
            expect(model.vegetables).toEqual({cucumber: 1});
        });

        it('countProducts() increases current count of products', function () {
            var model = new Model();

            model.addProduct({
                type: 'fruit',
                item: 'apple'
            });
            expect(model.fruits).toEqual({apple: 1});

            model.countProducts({
                type: 'fruit',
                item: 'apple'
            });
            model.countProducts({
                type: 'fruit',
                item: 'apple'
            });
            model.countProducts({
                type: 'fruit',
                item: 'apple'
            });
            expect(model.fruits).toEqual({apple: 4});
        });

        it('clearProducts() resets count of all products and set productsExist to false', function () {
            var model = new Model();

            model.addProduct({
                type: 'fruit',
                item: 'apple'
            });
            model.addProduct({
                type: 'fruit',
                item: 'apple'
            });
            expect(model.fruits).toEqual({apple: 2});
            expect(model.vegetables).toEqual({});
            expect(model.productsExist).toBe(true);

            model.clearProducts();

            expect(model.fruits).toEqual({});
            expect(model.vegetables).toEqual({});
            expect(model.productsExist).toBe(false);
        });
    });
});

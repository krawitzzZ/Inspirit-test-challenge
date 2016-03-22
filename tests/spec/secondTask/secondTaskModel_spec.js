define(function (require) {
    describe('Second task model class', function () {
        var Model = require('../../../js/components/secondTask/model');

        it('Create an instance with default properties', function () {
            var model = new Model();
            expect(model).toBeDefined();
            expect(model.clickCount).toBe(0);
            expect(model.successes).toBe(0);
            expect(model.failures).toBe(0);
            expect(model.failureSinceLastSuccess).toBe(0);
            expect(model.failuresPercentage).toBe(0);
            expect(model.wrapperColor).toBe('');
        });

        it('get() returns deferred promise with methods done, fail and always', function () {
            var model = new Model();
            expect(typeof model.get().done).toBe('function');
            expect(typeof model.get().fail).toBe('function');
            expect(typeof model.get().always).toBe('function');
        });

        it('paintWrapper() change wrapper color depend on server response', function () {
            var model = new Model();
            model.paintWrapper(true);
            expect(model.wrapperColor).toBe('green');
        });

        it('clickCounter() counts every click on button', function () {
            var model = new Model();
            model.clickCounter();
            expect(model.clickCount).toBe(1);
        });

        it('failCounter() counts fails or successes depend on server response', function () {
            var model = new Model();
            model.failCounter(false);
            expect(model.failures).toBe(1);
            model.failCounter(true);
            expect(model.successes).toBe(1);
            model.failCounter(true);
            expect(model.successes).toBe(2);
        });

        it('failSinceSuccessCounter() counts fails since last success server response', function () {
            var model = new Model();
            model.failSinceSuccessCounter(false);
            model.failSinceSuccessCounter(false);
            expect(model.failureSinceLastSuccess).toBe(2);
            model.failSinceSuccessCounter(true);
            expect(model.failureSinceLastSuccess).toBe(0);
        });

        it('failPercentageCounter() counts the ratio of failures to total clicks in percents', function () {
            var model = new Model();
            model.failCounter(false);
            model.clickCounter();
            model.failCounter(true);
            model.clickCounter();
            model.failPercentageCounter();
            expect(model.failuresPercentage).toBe((50).toFixed(2));
        });

        it('renderData() all count methods in one', function () {
            var model = new Model();
            model.renderData(true);
            expect(model.clickCount).toBe(1);
            expect(model.successes).toBe(1);
            expect(model.failures).toBe(0);
            expect(model.failureSinceLastSuccess).toBe(0);
            expect(model.failuresPercentage).toBe((0).toFixed(2));
            expect(model.wrapperColor).toBe('green');
        });
    });
});

define(function (require) {
    var View = require('../../js/components/firstTask/view');

    describe('start', function () {
        it('instance must be defined', function () {
            var inst = new View({});

            expect(inst).toBeDefined();
        });
    });
});

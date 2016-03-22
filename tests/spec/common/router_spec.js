define(function (require) {
    describe('Router', function () {
        var router = require('../../../js/components/router');
        var MainView = require('../../../js/components/common/main_view');
        var global = require('global');
        var crossroads = require('crossroads');

        it('Has only 1 method "init"', function () {
            var counter = 0;

            for (var key in router) {
                counter++;
            }

            expect(typeof router.init).toBe('function');
            expect(counter).toEqual(1);
        });

        it('When initialized clears hash', function () {
            router.init();
            expect(global.location.hash).toEqual('');
            history.pushState('', '', global.location.pathname + '#123');
            expect(global.location.hash).toEqual('#123');
            router.init();
            expect(global.location.hash).toEqual('');
        });

        it('When initialized adds routes for first, second and third task', function () {
            spyOn(crossroads, 'addRoute');
            router.init();
            expect(crossroads.addRoute.calls.argsFor(0)).toEqual(['/first', jasmine.any(Function)]);
            expect(crossroads.addRoute.calls.argsFor(1)).toEqual(['/second', jasmine.any(Function)]);
            expect(crossroads.addRoute.calls.argsFor(2)).toEqual(['/third', jasmine.any(Function)]);
            expect(crossroads.addRoute.calls.count()).toEqual(3);
        });
    });
});

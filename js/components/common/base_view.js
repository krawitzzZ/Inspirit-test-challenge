define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        EventEmitter = require('EventEmitter'),
        global = require('global');

    function BaseView(options) {
        EventEmitter.apply(this, arguments);

        this.model = options.model || null;
        this.subView = options.subView || null;
        this.template = options.template || '';
        this.$el = options.$el || null;
        this.events = options.events || {};
    }

    BaseView.prototype = Object.create(EventEmitter.prototype);
    BaseView.prototype.constructor = BaseView;

    BaseView.prototype.render = function () {
        var that = this;

        that.$el.html(that.template(that.model));

        _.each(that.events, function (value, key) {
            var meta = key.split(' '),
                eventName = meta[0],
                selector = meta[1],
                handler = that[value];

            if (!eventName) {
                throw new Error('no event name');
            }

            if (!selector) {
                throw new Error('no selector');
            }

            if (!handler) {
                throw new Error('no handler');
            }

            $(selector).on(eventName, $.proxy(handler, that));
        });

        if (that.subView) {
            if (typeof that.subView === Array) {
                _.each(that.subView, function (view) {
                    view.render();
                });
            } else {
                that.subView.render();
            }
        }
    };

    BaseView.prototype.dispose = function () {
        var that = this;

        _.each(that, function (value, key) {
            delete that[key];
        });
    };

    return BaseView;
});

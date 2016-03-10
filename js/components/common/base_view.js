define(function (require) {
    var $ = require('jquery'),
        _ = require('underscore'),
        EventEmitter = require('EventEmitter'),
        global = require('global'),
        document = global.document;

    function BaseView(options) {
        EventEmitter.apply(this);

        console.log(options.model);

        this.model = options.model || null;
        this.template = options.template || '';
        this.$el = options.$el || null;
        this.events = options.events || {};
    }

    BaseView.prototype = Object.create(EventEmitter.prototype);
    BaseView.prototype.constructor = BaseView;

    BaseView.prototype.render = function (data) {
        var that = this;

        this.$el.html(this.template(data));

        _.each(this.events, function (value, key) {
            var meta = key.split(' '),
                eventName = meta[0],
                selector = meta[1],
                handler = that[value];

            if (!eventName) {
                throw new Error('event name');
            }

            if (!selector) {
                throw new Error('selector');
            }

            if (!handler) {
                throw new Error('handler');
            }

            $(document.body).on(eventName, selector, $.proxy(handler, that));
        });
    };

    BaseView.prototype.dispose = function () {

    };

    return BaseView;
});

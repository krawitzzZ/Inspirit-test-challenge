define(function (require) {

    function SubModel() {
        this.errors = [];
    }

    SubModel.prototype.appendError = function (errorText) {
        this.errors.push(errorText);
        console.log(this.errors);
    };

    SubModel.prototype.resetErrors = function () {
        this.errors = [];
        console.log(this.errors);
    };

    return SubModel;
});

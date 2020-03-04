"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NewPerson = /** @class */ (function () {
    function NewPerson() {
        var _this = this;
        this.init = function () {
            _this.dateOfBirth = $('#DateOfBirth');
            _this.dateOfBirth.keypress(function (e) {
                if (_this.dateOfBirth.val().toString().length == 2 || _this.dateOfBirth.val().toString().length == 5) {
                    _this.dateOfBirth.val(_this.dateOfBirth.val() + '/');
                }
                console.log(_this.dateOfBirth.val());
            });
        };
    }
    return NewPerson;
}());
exports.NewPerson = NewPerson;
//# sourceMappingURL=newperson.js.map
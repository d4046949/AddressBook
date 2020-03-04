"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eventbus_1 = require("./eventbus");
var Modal = /** @class */ (function () {
    function Modal() {
        var _this = this;
        this.initialize = function () {
            _this.listenForLoadEvents();
        };
        this.listenForLoadEvents = function () {
            var self = _this;
            _this.cardLists = $('[data-ajax-modal-url]');
            for (var _i = 0, _a = _this.cardLists; _i < _a.length; _i++) {
                var button = _a[_i];
                button.addEventListener('click', function (e) {
                    var url = this.getAttribute('data-ajax-modal-url');
                    /* move to axios */
                    $.get(url, function (data) {
                        alert();
                        self.modal.html(data.responseText);
                        self.show();
                    });
                });
            }
        };
        this.show = function () {
            _this.modalplaceholder.removeClass('hide');
            _this.modalbackdrop.removeClass('hide');
            var self = _this;
            _this.modalbackdrop.on('click', function () {
                self.hide();
            });
        };
        this.hide = function () {
            _this.modalplaceholder.addClass('hide');
            _this.modalbackdrop.addClass('hide');
            _this.modalplaceholder.click = null;
        };
        this.modal = $('#modal');
        this.modalbackdrop = $('#backdrop');
        this.modalplaceholder = $('#modal-placeholder');
        eventbus_1.bus.subscribe("modal:show", function () { alert('modal recieved event'); });
    }
    return Modal;
}());
exports.Modal = Modal;
//# sourceMappingURL=modal.js.map
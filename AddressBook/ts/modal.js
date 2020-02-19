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
            _this.cardLists = document.querySelectorAll('[data-ajax-modal-url]');
            for (var _i = 0, _a = _this.cardLists; _i < _a.length; _i++) {
                var button = _a[_i];
                button.addEventListener('click', function (e) {
                    var url = this.getAttribute('data-ajax-modal-url');
                    /* move to axios */
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url);
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            self.modal.innerHTML = xhr.responseText;
                            self.show();
                        }
                        else {
                            alert('Request failed.  Returned status of ' + xhr.status);
                        }
                    };
                    xhr.send();
                });
            }
        };
        this.show = function () {
            _this.modalplaceholder.classList.remove('hide');
            _this.modalbackdrop.classList.remove('hide');
            var self = _this;
            _this.modalbackdrop.addEventListener('click', function () {
                self.hide();
            });
        };
        this.hide = function () {
            _this.modalplaceholder.classList.add('hide');
            _this.modalbackdrop.classList.add('hide');
            _this.modalplaceholder.click = null;
        };
        this.modal = document.getElementById('modal');
        this.modalbackdrop = document.getElementById('backdrop');
        this.modalplaceholder = document.getElementById('modal-placeholder');
        console.log(this.modalbackdrop);
        eventbus_1.bus.subscribe("modal:show", function () { alert('modal recieved event'); });
    }
    return Modal;
}());
exports.Modal = Modal;
//# sourceMappingURL=modal.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
        var _this = this;
        this.loaded = false;
        this.expanded = false;
        this.setupEvents = function () {
            $("[data-ajax-url]").on('click', function (event) {
                event.preventDefault();
                _this.panel = $(event.currentTarget);
                _this.panel.unbind('click');
                if (!_this.expanded) {
                    _this.expand();
                    _this.expanded = true;
                }
                else {
                    _this.collapse();
                    _this.expanded = false;
                }
            });
        };
        this.expand = function () {
            _this.panel.addClass('open');
            _this.panel.find('.icon')
                .children()
                .first()
                .removeClass('fas fa-chevron-circle-left')
                .addClass('fas fa-chevron-circle-right');
            _this.panel.find('[data-id]').hide();
        };
        this.collapse = function () {
            _this.panel.find('.fa-chevron-circle-right').on('click', function () {
                console.log('clicked');
                this.panel.removeClass('open');
                console.log('**', parent);
                this.panel.find('.icon')
                    .children()
                    .first()
                    .removeClass('fas fa-chevron-circle-right')
                    .addClass('fas fa-chevron-circle-left');
            });
        };
        this.setupEvents();
        //var parent = $(event.currentTarget);
        //});
        //if (!this.loaded) {
        //    $.ajax({
        //        url: parent.data("ajax-url"),
        //        type: 'GET',
        //        success: (response) => {
        //            parent.find('#new-content-placeholder').html(response);
        //            $.validator.unobtrusive.parse('form');
        //            new NewPerson().init();
        //        }
        //    });
        //}
        $('.new-bar').hover(function () {
            console.log('enter');
            $('.icon').css('display', 'block');
        }, function () { $('.icon').css('display', 'none'); });
    }
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map
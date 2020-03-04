"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var newperson_1 = require("./newperson");
var Utils = /** @class */ (function () {
    function Utils() {
        $("[data-ajax-url]").on('click', function (event) {
            event.preventDefault();
            var sidebar = $('.sidebar2');
            $.ajax({
                url: $(this).data("ajax-url"),
                type: 'GET',
                success: function (response) {
                    sidebar.html(response);
                    $.validator.unobtrusive.parse('form');
                    sidebar.addClass('open');
                    new newperson_1.NewPerson().init();
                }
            });
        });
    }
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map
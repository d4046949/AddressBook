"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eventbus_1 = require("./eventbus");
var Card = /** @class */ (function () {
    function Card() {
        this.onClick = function () {
            eventbus_1.bus.trigger("modal:show");
        };
        this.showMoreButton = $('[data-button-type="card-button"]');
        this.showMoreButton.on('click', this.onClick);
    }
    ;
    ;
    return Card;
}());
exports.Card = Card;
//# sourceMappingURL=card.js.map
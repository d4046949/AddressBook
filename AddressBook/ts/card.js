"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eventbus_1 = require("./eventbus");
var Card = /** @class */ (function () {
    function Card() {
        this.onClick = function () {
            alert('clicked');
            eventbus_1.bus.trigger("modal:show");
        };
        this.showMoreButton = document.querySelector('[data-button-type="card-button"]');
        this.showMoreButton.addEventListener("click", this.onClick);
        console.log(this.showMoreButton);
    }
    return Card;
}());
exports.Card = Card;
//# sourceMappingURL=card.js.map
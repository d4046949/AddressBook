import { bus } from './eventbus';

export class Modal {
    modal: JQuery<HTMLElement>;
    modalbackdrop: JQuery<HTMLElement>;
    modalplaceholder: JQuery<HTMLElement>;
    cardLists: any;

    constructor() {
        this.modal = $('#modal');
        this.modalbackdrop = $('#backdrop');
        this.modalplaceholder = $('#modal-placeholder');
        
        bus.subscribe("modal:show", () => { alert('modal recieved event'); });
    }

    initialize = () => {
        this.listenForLoadEvents();
    }

    listenForLoadEvents = () => {
        var self = this;
        this.cardLists = $('[data-ajax-modal-url]');
        for (const button of this.cardLists) {
            button.addEventListener('click', function (e: any) {
                let url: string = this.getAttribute('data-ajax-modal-url');
                /* move to axios */
                $.get(url, (data) => {
                    alert();
                    self.modal.html(data.responseText);
                    self.show();
                });
            });
        }
    }

    show = () => {
        this.modalplaceholder.removeClass('hide');
        this.modalbackdrop.removeClass('hide');
        var self = this;
        this.modalbackdrop.on('click', function () {
            self.hide();
        });
    }

    hide = () => {
        this.modalplaceholder.addClass('hide');
        this.modalbackdrop.addClass('hide');
        this.modalplaceholder.click = null;
    }
}
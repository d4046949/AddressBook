import { bus } from './eventbus';

export class Modal {
    modal: HTMLElement;
    modalbackdrop: HTMLElement;
    modalplaceholder: HTMLElement;
    cardLists: any;

    constructor() {
        this.modal = document.getElementById('modal');
        this.modalbackdrop = document.getElementById('backdrop');
        this.modalplaceholder = document.getElementById('modal-placeholder');
        console.log(this.modalbackdrop);

        bus.subscribe("modal:show", () => { alert('modal recieved event'); });
    }

    initialize = () => {
        this.listenForLoadEvents();
    }

    listenForLoadEvents = () => {
        var self = this;
        this.cardLists = document.querySelectorAll('[data-ajax-modal-url]');
        for (const button of this.cardLists) {
            button.addEventListener('click', function (e: any) {
                let url: string = this.getAttribute('data-ajax-modal-url');
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
    }

    show = () => {
        this.modalplaceholder.classList.remove('hide');
        this.modalbackdrop.classList.remove('hide');
        var self = this;
        this.modalbackdrop.addEventListener('click', function () {
            self.hide();
        });
    }

    hide = () => {
        this.modalplaceholder.classList.add('hide');
        this.modalbackdrop.classList.add('hide');
        this.modalplaceholder.click = null;
    }
}
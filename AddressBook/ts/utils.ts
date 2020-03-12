import { bus } from './eventbus';
import { NewPerson } from './newperson';

export class Utils {

    loaded: boolean = false;
    expanded: boolean = false;
    panel: any;

    constructor() {
        
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
       

        $('.new-bar').hover(() => {
            console.log('enter');
            $('.icon').css('display', 'block')
        }, () => { $('.icon').css('display', 'none') });


    }

    setupEvents = () => {
        $("[data-ajax-url]").on('click', (event) => {
            event.preventDefault();
            this.panel = $(event.currentTarget);

            this.panel.unbind('click');

            if (!this.expanded) {
                this.expand();
                this.expanded = true;
            } else {
                this.collapse();
                this.expanded = false;
            }
        });
    };

    expand = () => {
        this.panel.addClass('open');
        this.panel.find('.icon')
            .children()
            .first()
            .removeClass('fas fa-chevron-circle-left')
            .addClass('fas fa-chevron-circle-right');

        this.panel.find('[data-id]').hide();
    };

    collapse = () => {

        this.panel.find('.fa-chevron-circle-right').on('click', function () {
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
    
}
RAD.view("view.search_page", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/search_page/search_page.html',
    events: {
        'click #search>li': 'openDetails',
        'click #backToMain': 'backToMain'
    },
    onInitialize: function () {
        "use strict";
        this.model = RAD.model('searchCollection');
    },
    onNewExtras: function (extras) {

    },
    openDetails: function () {

    },
    backToMain: function () {
        this.publish('navigation.back', {
            container_id: '#screen',
            content: 'view.start_page'
        });
    }
}));

RAD.view("view.listView", RAD.Blanks.View.extend({
    url: 'source/views/listView/listView.html',
    hideMoreButton : false,
    events: {
        'click #search>li': 'openDetails',
        'click #backToMain': 'backToMain',
        'click #more': 'openMore'
    },
    onInitialize: function () {
        "use strict";
        //this.model = RAD.model('searchCollection');
    },
    onNewExtras: function (extras) {
        console.log('test', this.hideMoreButton);
        this.changeModel(extras.model);
        this.totalResults = extras.model.totalResults || extras.model.length;
        if (typeof this.model.getNextPage == 'function') {
            this.hideMoreButton = this.model.getNextPage();

        } else {
            this.hideMoreButton = true;
        }

        this.renderRequest = true;
    },
    openDetails: function (e) {
        var id = $(e.currentTarget).attr('id');
        var model = this.model.where({guid: id});
        var options = {
            container_id: '#screen',
            content: "view.details_page",
            animation: 'slide',
            extras: model[0]
        };
        this.publish('navigation.show', options);
    },
    backToMain: function () {
        this.publish('navigation.back', {
            container_id: '#screen',
            content: 'view.start_page'
        });
    },
    openMore: function (e) {
        e.preventDefault();
        this.model.fetch({
            type: 'POST',
            dataType: 'jsonp',
            remove: false
        });
    }
}));

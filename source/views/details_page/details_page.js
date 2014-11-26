RAD.view("view.details_page", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/details_page/details_page.html',
    events : {
        'click #backToSearch': 'backToSearch',
        'click #addToFaves': 'addToFaves'
    },
    onInitialize: function () {
        "use strict";
        this.model = RAD.model('details');
    },
    onNewExtras: function (extras) {
        this.bindModel(extras);
    },
    backToSearch: function () {
        this.publish('navigation.back', {
            container_id: '#screen',
            content: 'view.listView'
        });
    },
    addToFaves: function () {
        var favesCollection = RAD.model('favesCollection');
        var id = this.model.get('guid');
        var isFaves = !!((favesCollection.where({guid: id})).toString());
        if (!isFaves){
            this.model.set('isFaves', true);
            favesCollection.push(this.model);
        }
    }
}));
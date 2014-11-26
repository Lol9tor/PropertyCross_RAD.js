RAD.model('favesCollection', Backbone.Collection.extend({

    initialize: function () {
        this.on('add', this.saveLocal);
        this.on('change', this.saveLocal);
        this.on('remove', this.saveLocal);
        this.loadLocal();
    },
    saveLocal: function () {
        var data = JSON.stringify(this.toJSON());
        localStorage.setItem('favesList', data);
    },
    loadLocal: function () {
        var data = localStorage.getItem('favesList');
        this.reset(JSON.parse(data));
    }
}), true);

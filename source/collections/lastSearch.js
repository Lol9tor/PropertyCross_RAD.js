RAD.model('lastSearchCollection', Backbone.Collection.extend({
    totalResults: 0,
    initialize: function () {
        this.on('add', this.saveLocal);
        this.on('change', this.saveLocal);
        this.on('remove', this.saveLocal);
        this.loadLocal();
    },
    saveLocal: function () {
        var data = JSON.stringify(this.toJSON());
        localStorage.setItem('lastSearchList', data);
    },
    loadLocal: function () {
        var data = localStorage.getItem('lastSearchList');
        this.reset(JSON.parse(data));
    },
    setData: function (city, totalResults) {
        if (!this.where({totalResults: totalResults, city: city}).length){
            this.push({
                totalResults: totalResults,
                city: city,
                date: Date.now()
            })
        }
    }
}), true);


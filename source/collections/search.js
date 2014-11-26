RAD.model('searchCollection', Backbone.Collection.extend({
    totalResults: 0,
    city : '',
    page : '',
    templateUrl: 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=#page#&place_name=#city#',
    url: 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page=#page#&place_name=#city#',
    totalPages: 0,
    parse: function (data) {
        if (!data.response.listings){
            return;
        }
        var models =[];
        var modelsData = data.response.listings;
        this.totalResults = data.response.total_results;
        this.totalPages = data.response.total_pages;
        this.page = data.response.page;
        for (var i = 0; i < modelsData.length; i++) {
            models.push({
                title: modelsData[i].lister_name,
                price: modelsData[i].price,
                place: modelsData[i].title,
                bigImg: modelsData[i].img_url,
                smallImg: modelsData[i].thumb_url,
                bathroomNumber: modelsData[i].bathroom_number,
                bedroomNumber: modelsData[i].bedroom_number,
                keywords: modelsData[i].keywords,
                description: modelsData[i].summary,
                name: modelsData[i].datasource_name,
                guid: modelsData[i].guid,
                isFaves: false
            })
        }
        return models;
    },
    getNextPage : function () {
        var lastPageReached = false;

        if (this.page < this.totalPages) {
            this.page++;
        } else {
            lastPageReached = true;
        }
        console.log(lastPageReached);
        return lastPageReached;
    },

    buildUrl : function (city, page) {
        this.city = city || this.city;
        this.page = page || this.page;

        console.log(this.city, this.page);

        this.url = this.templateUrl.replace('#city#', city).replace('#page#', page);

    }
}), true);

RAD.model('searchCollection', Backbone.Collection.extend({
    totalResults: 0,
    parse: function (data) {
        if (!data.response.listings){
            return;
        }
        var models =[];
        var modelsData = data.response.listings;
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
                totalResults: data.response.total_results,
                isFaves: false
            })
        }
        return models;
    }
}), true);

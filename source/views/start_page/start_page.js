RAD.view("view.start_page", RAD.Blanks.ScrollableView.extend({
    url: 'source/views/start_page/start_page.html',
    events: {
        'click #faves': 'openFaves',
        'click #go': 'openSearch',
        'click #delHistory': 'delHistory',
        'click #list>div': 'openLastSearch'
    },
    onInitialize: function () {
        "use strict";
        var lastSearch = RAD.model('lastSearchCollection');
        console.log(lastSearch);
        if (localStorage.lastSearchList){
            lastSearch = JSON.parse(localStorage.lastSearchList);
        }
        this.model = RAD.model('lastSearchCollection');
    },
    onEndDetach: function () {
        this.$('#cityInput').val('');
    },
    openFaves: function () {
        "use strict";
    },
    openSearch: function () {
        "use strict";
        var city = this.getValue();
        if (!this.validateInput(city)){
            var config = {
                content: 'view.error',
                gravity: 'center',
                animation: 'fade',
                extras: {
                    title: 'Error input!',
                    content: 'You input incorrect value! Check it and try again.'
                }
            };
            this.publish('navigation.dialog.show', config);
            return false;
        }
        this.fetchCollection(city);

    },
    fetchCollection: function (city) {
        var searchCollection = RAD.model('searchCollection'),
            lastSearchCollection = RAD.model('lastSearchCollection'),
            self = this;
        searchCollection.fetch({
            url: 'http://api.nestoria.co.uk/api?country=uk&pretty=1&action=search_listings&encoding=json&listing_type=buy&page='+1+'&place_name='+city,
            type: 'POST',
            dataType: 'jsonp',
            remove: false,
            success: function (collection, response, options) {
                if (response.response.application_response_code <= 110) {
                    var config = {
                        container_id: '#screen',
                        content: "view.search_page",
                        animation: 'slide',
                        callback: function () {
                            lastSearchCollection.setData(city, response.response.total_results);
                        }
                    };
                    self.publish('navigation.show', config);
                } else {
                    config = {
                        content: 'view.error',
                        gravity: 'center',
                        animation: 'fade',
                        extras: {
                            title: 'Error input!',
                            content: 'Entered city not exist in database! Check it and try again.'
                        }
                    };
                    self.publish('navigation.dialog.show', config);
                }
            },
            error: function () {
                console.log('error!');
            }
        });
    },
    delHistory: function () {
        "use strict";
        localStorage.removeItem('lastSearchList');
        this.model.reset();
    },
    openLastSearch: function (e) {
        "use strict";
        var city = $(e.currentTarget).find('span').html();
        this.fetchCollection(city);
    },
    getValue: function () {
        return this.$('#cityInput').val();
    },
    validateInput: function (city) {
        return (city && /^[a-zA-Z-]*$/.test(city))
    }
}));
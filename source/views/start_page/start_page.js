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
        if (localStorage.lastSearchList){
            lastSearch = JSON.parse(localStorage.lastSearchList);
        }
        this.model = RAD.model('lastSearchCollection');
    },
    onEndDetach: function () {
        this.renderRequest = true;
    },
    openFaves: function () {
        "use strict";
        var options = {
            container_id: '#screen',
            content: "view.listView",
            animation: 'slide',
            extras: {
                model : RAD.model('favesCollection')
            }
        };

        this.publish('navigation.show', options);
    },
    openSearch: function () {
        "use strict";
        var city = this.getValue();
        if (!this.validateInput(city)){
            this.showError('You input incorrect value!');
            return false;
        }
        this.fetchCollection(city);
    },
    fetchCollection: function (city) {
        "use strict";
        var searchCollection = RAD.model('searchCollection'),
            lastSearchCollection = RAD.model('lastSearchCollection'),
            self = this;
        searchCollection.buildUrl(city, 1);
        searchCollection.fetch({
            type: 'POST',
            dataType: 'jsonp',
            reset: true,
            success: function (collection, response, options) {
                var res = response.response;
                if (res.application_response_code <= 110) {
                    self.showSearchListPage();
                    lastSearchCollection.setData(city, res.total_results);
                } else {
                    self.showError('Entered city not exist in database!');
                }
            },
            error: function () {
                console.log('error!');
            }
        });
    },
    showSearchListPage : function () {
        "use strict";
        var config = {
            container_id: '#screen',
            content: "view.listView",
            animation: 'slide',
            extras: {
                model : RAD.model('searchCollection')
            }
        };
        this.publish('navigation.show', config);
        console.log(config.extras);
    },
    showError : function (errorTextMsg) {
        "use strict";
        var config = {
            content: 'view.error',
            gravity: 'center',
            animation: 'fade',
            extras: {
                title: 'Error input!',
                content: errorTextMsg+' Check it and try again.'
            }
        };
        this.publish('navigation.dialog.show', config);
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
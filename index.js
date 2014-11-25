(function (document, window) {
    'use strict';

    var scripts = [
        "lib/iscroll-lite.js",
        "source/application/application.js",

        "source/models/details.js",

        "source/collections/search.js",
        "source/collections/lastSearch.js",
        "source/collections/faves.js",

        "source/views/start_page/start_page.js",
        "source/views/search_page/search_page.js",
        "source/views/details_page/details_page.js",
        "source/views/error/error.js"
    ];

    function onEndLoad() {

        var core = window.RAD.core,
            application = window.RAD.application,
            coreOptions = {
                defaultBackstack: false,
                defaultAnimation: 'slide',
                animationTimeout: 3000,
                debug: false
            };

        //initialize core by new application object
        core.initialize(application, coreOptions);

        //start
        application.start();
    }

    window.RAD.scriptLoader.loadScripts(scripts, onEndLoad);
}(document, window));
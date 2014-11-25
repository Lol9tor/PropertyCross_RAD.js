RAD.view("view.error", RAD.Blanks.View.extend({
    url: 'source/views/error/error.html',
    className: 'error',
    events: {
        'click button.close': 'closeDialog'
    },
    onInitialize: function () {
        'use strict';
        this.model = new Backbone.Model();
    },
    onNewExtras: function (extras) {
        'use strict';
        this.model.set(extras);
    },
    onEndDetach: function () {
        "use strict";
    },
    closeDialog: function () {
        "use strict";
        this.publish('navigation.dialog.close', {content: this.viewID });
    }
}));

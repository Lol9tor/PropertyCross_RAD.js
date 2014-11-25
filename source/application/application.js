RAD.application({
    start: function () {
        var options = {
            container_id: '#screen',
            content: "view.start_page",
            animation: 'none'
        };
        RAD.core.publish('navigation.show', options);
    }
});

RAD.model('details', Backbone.Model.extend({
    defaults: {
        title: 'Property Details',
        price: 2000,
        place: 'main street',
        bigImg: 'url',
        smallImg: 'some another url',
        bathroomNumber: 1,
        bedroomNumber: 2,
        keywords: 'some words',
        description: 'some description',
        name: 'model',
        guid: '',
        isFaves: false
    }
}), true);


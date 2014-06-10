Ext.define('Rat.store.static.EventCategories', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.static.EventCategory',
    autoLoad: true,
    storeId: 'Locations',

    proxy: {
        type: 'rest',
		url: url('api.static.eventCategories'),
        reader: {
            type: 'json'
        }
    }
});
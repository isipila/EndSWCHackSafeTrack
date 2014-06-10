Ext.define('Rat.store.static.Locations', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.static.Location',
    autoLoad: false,
    storeId: 'Locations',

    proxy: {
        type: 'rest',
		url: url('api.static.locations'),
        reader: {
            type: 'json'
        }
    }
});
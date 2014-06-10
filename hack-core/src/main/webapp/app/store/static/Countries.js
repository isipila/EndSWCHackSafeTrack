Ext.define('Rat.store.static.Countries', {
    extend: 'Ext.data.Store',

    storeId: 'CountryCodes',
    model: 'Rat.model.static.Country',
	autoLoad: true,
	pageSize: 300,

    proxy: {
        type: 'rest',
		url: url('api.static.countries'),
        reader: {
            type: 'json'
        }
    }
});

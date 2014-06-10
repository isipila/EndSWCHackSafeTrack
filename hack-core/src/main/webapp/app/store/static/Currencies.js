Ext.define('Rat.store.static.Currencies', {
    extend: 'Ext.data.Store',

    storeId: 'Currencies',
    model: 'Rat.model.static.Currency',
    autoLoad: true,
	pageSize: 300,
	
    proxy: {
        type: 'rest',
		url: url('api.static.currencies'),
        reader: {
            type: 'json'
        }
    }
});
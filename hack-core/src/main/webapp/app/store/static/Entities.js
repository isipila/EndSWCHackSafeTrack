Ext.define('Rat.store.static.Entities', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.static.Entity',
    autoLoad: false,
    storeId: 'Entities',
	
    proxy: {
        type: 'rest',
		url: url('api.static.entities'),
        reader: {
            type: 'json'
        }
    }
});
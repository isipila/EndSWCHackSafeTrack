Ext.define('Rat.store.static.EventTypes', {
    extend: 'Ext.data.Store',

    storeId: 'EventTypes',
    model: 'Rat.model.static.EventType',
    autoLoad: true,
	pageSize: 200,

    proxy: {
        type: 'rest',
		url: url('api.static.eventTypes'),
        reader: {
            type: 'json'
        }
    }
});
Ext.define('Rat.store.static.ProcessingGroups', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.static.ProcessingGroup',
    autoLoad: false,
    storeId: 'ProcessingGroups',
	pageSize: 100,

    proxy: {
        type: 'rest',
		url: url('api.static.processingGroups'),
        reader: {
            type: 'json'
        }
    }
});
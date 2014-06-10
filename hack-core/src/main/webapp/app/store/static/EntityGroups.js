Ext.define('Rat.store.static.EntityGroups', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.static.EntityGroup',
    autoLoad: false,
    storeId: 'EntityGroups',

    proxy: {
        type: 'rest',
		url: url('api.static.entityGroups'),
        reader: {
            type: 'json'
        }
    }
});
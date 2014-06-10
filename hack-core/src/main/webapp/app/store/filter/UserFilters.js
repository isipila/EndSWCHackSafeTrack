Ext.define('Rat.store.filter.UserFilters', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.filter.UserFilter',
    autoLoad: false,
    storeId: 'UserFilters',

    proxy: {
        type: 'ajax',
        url: url('api.filter.userFilters'),
        reader: {
            type: 'json'
        }
    }
});
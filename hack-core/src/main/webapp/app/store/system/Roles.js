Ext.define('Rat.store.system.Roles', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.system.Role',
    autoLoad: false,
    storeId: 'Roles',

    proxy: {
        type: 'rest',
        url: url('api.system.roles'),
        reader: {
            type: 'json'
        }
    }
});
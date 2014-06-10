Ext.define('Rat.store.system.Accounts', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.system.Account',
    autoLoad: false,
    storeId: 'Accounts',

    proxy: {
        type: 'rest',
        url: url('api.system.accounts'),
        reader: {
            type: 'json'
        }
    }
});
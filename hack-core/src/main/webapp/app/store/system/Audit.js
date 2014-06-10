Ext.define('Rat.store.system.Audit', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.system.AuditEntry',
    autoLoad: true,
    storeId: 'Audit',

    proxy: {
        type: 'rest',
        url: url('api.system.audit'),
        reader: {
            type: 'json'
        }
    }
});
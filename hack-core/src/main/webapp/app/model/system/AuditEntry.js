Ext.define('Rat.model.system.AuditEntry', {
    extend: 'Ext.data.Model',
    fields: [{
		name: 'timeStamp',
		type: 'date',
		dateFormat: 'Y-m-d'
	}, {
		name: 'text',
        type: 'string'
    }]
});
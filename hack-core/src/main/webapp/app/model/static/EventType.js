Ext.define('Rat.model.static.EventType', {
    extend: 'Ext.data.Model',
    idProperty: 'code',
    fields: [{
        name: 'code',
        type: 'string'
	}, {
		name: 'name',
		type: 'string'
    }]
});
Ext.define('Rat.model.static.Currency', {
    extend: 'Ext.data.Model',
    idProperty: 'code',
    fields: [{
        name: 'code',
        type: 'string'
	}, {
		name: 'name',
		type: 'string'
	}, {
		name: 'primary',
		type: 'boolean'
    }]
});
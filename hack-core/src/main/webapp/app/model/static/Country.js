Ext.define('Rat.model.static.Country', {
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
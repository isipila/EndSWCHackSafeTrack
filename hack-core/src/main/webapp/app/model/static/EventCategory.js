Ext.define('Rat.model.static.EventCategory', {
    extend: 'Ext.data.Model',
    idProperty: 'code',
    fields: [{
        name: 'code',
        type: 'string'
	}, {
		name: 'name',
		type: 'string'
	}, {
		name: 'eventTypes',
		type: 'auto'
    }]
});
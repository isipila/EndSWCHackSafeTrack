Ext.define('Rat.model.static.ProcessingGroup', {
    extend: 'Ext.data.Model',
    idProperty: 'code',
    fields: [{
        name: 'code',
        type: 'string'
	}, {
        name: 'name',
        type: 'string'
    }, {
		name: 'locationCode',
		type: 'string'
	}, {
		name: 'processOptimisation',
		type: 'int'
	}, {
		name: 'resourceOptimisation',
		type: 'int'
	}]
});
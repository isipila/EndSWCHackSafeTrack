Ext.define('Rat.model.static.EntityGroup', {
    extend: 'Ext.data.Model',
    idProperty: 'code',
    fields: [{
        name: 'code',
		type: 'string'
	}, {
		name: 'name',
        type: 'string'
    }, {
		name: 'processOptimisation',
		type: 'int'
	}, {
		name: 'resourceOptimisation',
		type: 'int'
	}, {
		name: 'entityCodes',
		type: 'auto'
	}]
});
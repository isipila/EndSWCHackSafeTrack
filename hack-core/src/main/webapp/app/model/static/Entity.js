Ext.define('Rat.model.static.Entity', {
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
		name: 'processMappingRules',
		type: 'auto'
	}],
	
	hasMany: [{
		name: 'processMappingRules',
		model: 'Rat.model.static.ProcessMappingRule'
	}]
});
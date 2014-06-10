Ext.define('Rat.model.system.RiskCoefficient', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'identifiers',
        type: 'auto'
    }, {
    	name: 'name',
    	type: 'string'
	}, {
		name: 'coefficient',
		type: 'float'
	}]
});
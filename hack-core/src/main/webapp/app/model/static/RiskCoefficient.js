Ext.define('Rat.model.static.RiskCoefficient', {
    extend: 'Ext.data.Model',
    fields: [{
		name: 'identifiers',
		type: 'auto'
	}, {
        name: 'coefficient',
        type: 'float'
    }]
});
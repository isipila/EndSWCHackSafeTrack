Ext.define('Rat.model.risk.RiskFilterValue', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'code',
        type: 'string'
    }, {
        name: 'name',
        type: 'string'
	}, {
		name: 'riskCurrency',
		type: 'string'
	}, {
		name: 'riskValue',
		type: 'float'
	}, {
		name: 'selected',
		type: 'boolean'
    }]
});
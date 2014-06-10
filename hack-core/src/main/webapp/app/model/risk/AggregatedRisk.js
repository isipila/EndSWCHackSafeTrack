Ext.define('Rat.model.risk.AggregatedRisk', {
    extend: 'Ext.data.Model',
    fields: [{
		name: 'item',
		type: 'string'
	}, {
		name: 'riskCurrency',
		type: 'string'
	}, {
		name: 'riskValue',
		type: 'float'
    },{
        name: 'eventCount',
        type: 'int'
    },{
        name: 'positionCount',
        type: 'int'
	}]
});
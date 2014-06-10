Ext.define('Rat.model.risk.Position', {
    extend: 'Ext.data.Model',
    fields: [{
		name: 'accountNumber',
        type: 'string'
    },{
		name: 'accountName',
        type: 'string'
    },{
		name: 'size',
        type: 'int'
    },{
        name: 'positionType',
        type: 'string'
    },{
        name: 'riskValue',
        type: 'float'
    },{
        name: 'entity',
        type: 'string'
    },{
        name: 'accountType',
        type: 'string'
    },{
        name: 'positionTypeAdjustment',
        type: 'float'
    },{
        name: 'accountTypeAdjustment',
        type: 'float'
    },{
        name: 'processAdjustment',
        type: 'float'
    },{
        name: 'resourceAdjustment',
        type: 'float'
    },{
        name: 'processingGroup',
        type: 'string'
    },{
        name: 'location',
        type: 'string'
    },{
        name: 'riskCurrency',
        type: 'string'
    },{
        name: 'riskValueInBaseCurrency',
        type: 'float'
    }]
});
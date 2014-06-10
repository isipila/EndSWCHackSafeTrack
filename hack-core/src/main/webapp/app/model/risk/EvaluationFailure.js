Ext.define('Rat.model.risk.EvaluationFailure', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'eventId',
        type: 'string'
	}, {
        name: 'reason',
        type: 'string'
    }, {
        name: 'narrative',
        type: 'string'
    }, {
        name: 'eventType',
        type: 'string'
    }, {
        name: 'countryOfIssue',
        type: 'string'
    }, {
        name: 'securityIdentifier',
        type: 'string'
    }, {
        name: 'securityDescription',
        type: 'string'
    }, {
        name: 'senderReference',
        type: 'string'
    }, {
        name: 'securityCurrency',
        type: 'string'
    }, {
        name: 'riskPerShare',
        type: 'float'
    }, {
        name: 'riskRealisationDate',
        type: 'date'
    }]
});
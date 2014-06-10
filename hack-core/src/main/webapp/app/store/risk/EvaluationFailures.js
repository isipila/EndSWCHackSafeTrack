Ext.define('Rat.store.risk.EvaluationFailures', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.risk.EvaluationFailure',
    autoLoad: false,
    storeId: 'EvaluationFailures',

	remoteSort: false,
	
	groupField: 'reason',
	
    proxy: {
        type: 'ajax',
		startParam: undefined,
		limitParam: undefined,
		groupParam: undefined,
		pageParam: undefined,
        url: url('api.risk.evaluationFailures'),
        reader: {
            type: 'json'
        }
    }	

});
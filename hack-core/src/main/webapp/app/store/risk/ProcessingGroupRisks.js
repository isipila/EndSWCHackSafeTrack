Ext.define('Rat.store.risk.ProcessingGroupRisks', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.risk.AggregatedRisk',
    autoLoad: false, // Loaded on demand
    storeId: 'ProcessingGroupRisks',

    proxy: {
        type: 'ajax',
        url: url('api.risk.processingGroupRisks'),
        reader: {
            type: 'json'
        }
    },
	
	setFilterParameters: function(parameters) {
		this.getProxy().url = url('api.risk.processingGroupRisks', parameters);
		this.reload();
	}	
});
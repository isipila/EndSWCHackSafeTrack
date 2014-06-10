Ext.define('Rat.store.risk.EntityGroupRisks', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.risk.AggregatedRisk',
    autoLoad: false, // Loaded on demand
    storeId: 'EntityGroupRisks',

    proxy: {
        type: 'ajax',
        url: url('api.risk.entityGroupRisks'),
        reader: {
            type: 'json'
        }
    },
	
	setFilterParameters: function(parameters) {
		this.getProxy().url = url('api.risk.entityGroupRisks', parameters);
		this.reload();
	}	
});
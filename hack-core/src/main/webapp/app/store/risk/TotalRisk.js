Ext.define('Rat.store.risk.TotalRisk', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.risk.AggregatedRisk',
    autoLoad: false, // Loaded on demand
    storeId: 'TotalRisk',

    proxy: {
        type: 'rest',
        url: url('api.risk.totalRisk'),
        reader: {
            type: 'json'
        }
    },
	
	setFilterParameters: function(parameters) {
		this.getProxy().url = url('api.risk.totalRisk', parameters);
		this.load();
	}	
});
Ext.define('Rat.store.risk.RealisationDateRisks', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.risk.AggregatedRisk',
    autoLoad: false, // Loaded on demand
    storeId: 'RealisationDateRisks',

	pageSize: 31,
	
    proxy: {
        type: 'ajax',
        url: url('api.risk.realisationDateRisks'),
        reader: {
            type: 'json'
        }
    },
	
	setFilterParameters: function(parameters) {
		this.getProxy().url = url('api.risk.realisationDateRisks', parameters);
		this.reload();
	}	
});
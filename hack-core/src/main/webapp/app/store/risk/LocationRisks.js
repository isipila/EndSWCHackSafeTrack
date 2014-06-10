Ext.define('Rat.store.risk.LocationRisks', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.risk.AggregatedRisk',
	autoLoad: false, // Loaded on demand
    storeId: 'LocationRisks',

	proxy: {
        type: 'ajax',
        url: url('api.risk.locationRisks'),
        reader: {
            type: 'json'
        }
    },
	
	setFilterParameters: function(parameters) {
		this.getProxy().url = url('api.risk.locationRisks', parameters);
		this.reload();
	}	
});
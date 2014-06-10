Ext.define('Rat.store.risk.EventTypeRisks', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.risk.AggregatedRisk',
	autoLoad: false, // Loaded on demand
    storeId: 'EventTypeRisks',

	proxy: {
        type: 'ajax',
        url: url('api.risk.eventTypeRisks'),
        reader: {
            type: 'json'
        }
    },
	
	setFilterParameters: function(parameters) {
		this.getProxy().url = url('api.risk.eventTypeRisks', parameters);
		this.reload();
	}	
});
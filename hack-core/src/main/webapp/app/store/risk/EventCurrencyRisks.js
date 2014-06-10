Ext.define('Rat.store.risk.EventCurrencyRisks', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.risk.AggregatedRisk',
	autoLoad: false, // Loaded on demand
    storeId: 'EventCurrencyRisks',

	proxy: {
        type: 'ajax',
        url: url('api.risk.eventCurrencyRisks'),
        reader: {
            type: 'json'
        }
    },
	
	setFilterParameters: function(parameters) {
		this.getProxy().url = url('api.risk.eventCurrencyRisks', parameters);
		this.reload();
	}	
});
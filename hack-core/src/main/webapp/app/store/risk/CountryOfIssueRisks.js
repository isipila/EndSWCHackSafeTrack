Ext.define('Rat.store.risk.CountryOfIssueRisks', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.risk.AggregatedRisk',
    autoLoad: false, // Loaded on demand
    storeId: 'CountryOfIssueRisks',

    proxy: {
        type: 'ajax',
        url: url('api.risk.countryOfIssueRisks'),
        reader: {
            type: 'json'
        }
    },
	
	setFilterParameters: function(parameters) {
		this.getProxy().url = url('api.risk.countryOfIssueRisks', parameters);
		this.reload();
	}	
});
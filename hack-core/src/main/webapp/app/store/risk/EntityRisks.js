Ext.define('Rat.store.risk.EntityRisks', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.risk.AggregatedRisk',
    autoLoad: false, // Loaded on demand
    storeId: 'EntityRisks',

    proxy: {
        type: 'ajax',
        url: url('api.risk.entityRisks'),
        reader: {
            type: 'json'
        }
    },
	
	setFilterParameters: function(parameters) {
		this.getProxy().url = url('api.risk.entityRisks', parameters);
		this.reload();
	}	
});
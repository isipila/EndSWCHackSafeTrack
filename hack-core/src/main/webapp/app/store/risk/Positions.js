Ext.define('Rat.store.risk.Positions', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.risk.Position',
    autoLoad: false,
    storeId: 'Positions',

	remoteSort: true,
	sorters: [{
		property : 'riskValueInBaseCurrency',
        direction: 'DESC'
	}],
	
    proxy: {
        type: 'ajax',
        url: url('api.risk.events/{eventId}/positions'),
        reader: {
            type: 'json'
        }
    },
	
	loadEventPositions: function(eventId) {
		this.getProxy().url = url('api.risk.events/' + eventId + '/positions');
		this.reload();
	}	

});
Ext.define('Rat.store.risk.Events', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.risk.Event',
    autoLoad: true,
    storeId: 'Events',

	remoteSort: true,
	sorters: [{
		property : 'totalRisk',
        direction: 'DESC'
	}],
	
    proxy: {
        type: 'ajax',
        url: url('api.risk.events'),
        reader: {
            type: 'json'
        }
    },
	
	setFilterParameters: function(parameters) {
		this.getProxy().url = url('api.risk.events', parameters);
		this.reload();
	},
	
	loadEvent: function(eventId) {
		this.getProxy().url = url('api.risk.events/' + eventId);
		this.reload();
	}
});
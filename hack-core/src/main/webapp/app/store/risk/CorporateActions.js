Ext.define('Rat.store.risk.CorporateActions', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.risk.CorporateAction',
    autoLoad: false, // Load on request
    storeId: 'CorporateActions',

    proxy: {
        type: 'rest',
		url: url('api.risk.events/{eventId}/source', ['format=json'])
    },
    
	loadCorporateAction: function(eventId) {
		this.getProxy().url = url('api.risk.events/' + eventId + '/source', ['format=json']);
		this.reload();
	}
});
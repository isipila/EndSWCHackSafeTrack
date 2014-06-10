Ext.define('Rat.store.system.DataKeys', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.system.DataKey',
    autoLoad: false, // Load on request
    storeId: 'DataKeys',

    proxy: {
        type: 'rest',
		url: url('api.system/resetKey'),
        reader: {
			getResponseData: function(response) {
				var result = new Rat.model.system.DataKey({code: response.responseText})
				
				return Ext.data.ResultSet.create({
					records: [result],
					success: true,
					loaded: true,
					total: 1
				});
			}
        }
    }
});
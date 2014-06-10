Ext.define('Rat.store.system.LoggedInAccount', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.system.Account',
    autoLoad: false,
    storeId: 'LoggedInAccount',

    proxy: {
        type: 'rest',
        url: url('api.system.loggedInAccount'),
        reader: {
            type: 'json'
        }
    },
	
	listeners: {
		/**
		 * Gets the current user profile from this store and makes it available
		 * to the rest of the application.
		 */
		load: function(store, records) {
			if (records.length != 1) {
				return;
			}
			
			Rat.model.system.LoggedInAccount.setUsername(records[0].get('username'));
			Rat.model.system.LoggedInAccount.setFullName(records[0].get('fullName'));
		}
	}
});
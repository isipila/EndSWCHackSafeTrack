Ext.define('Rat.controller.Startup', {
    extend: 'Ext.app.Controller',
   
	/**
	 * Loads app startup data asynchronously.
	 * 
	 * After all stores specified in the stores config property have
	 * loaded the completion call back function is invoked.
	 */
	load: function(stores, progressUpdater, callback, application) {
		for (var i = 0; i < stores.length; i++) {
			Ext.StoreMgr.lookup(stores[i]).load();
		}
		this.wait(stores, progressUpdater, this.wait, callback, application);
	},
	
	/**
	 * Task will keep resubmitting itself until all stores loaded.
	 */
	wait: function(stores, progressUpdater, wait, callback, application) {
		var loading = 0;
		for (var i = 0; i < stores.length; i++) {
			var store = Ext.StoreMgr.lookup(stores[i]);
			if (store.isLoading()) {
				loading++;
			}
		}
			
		var progress = (stores.length - loading) / stores.length;
		progressUpdater(progress);
			
		if (progress === 1) {
			// Always wait before deciding if we have finished because it allows the progress to complete nicely
			new Ext.util.DelayedTask(function() {
				// Get here implies all stores loaded. Note: getCompletion() returns a function
				callback(application);
			}).delay(500);			

		} else {
			new Ext.util.DelayedTask(function() {
				wait(stores, progressUpdater, wait, callback, application);
			}).delay(250);			
		}			
	}
});

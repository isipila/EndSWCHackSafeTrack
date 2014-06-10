function mainApplication(loaderViewport) {
	Ext.application({
		name: 'Rat',

		models: [
			// System Data
			'system.Account',
			'system.Role',
			'system.DataKey',
			'system.RiskCoefficient',
			'system.AuditEntry',
			
			// Filter Data
			'filter.UserFilter',
			
			// Static data
			'static.Country',
			'static.Currency',
			'static.EventType',
			'static.EntityGroup',
			'static.Entity',
			'static.ProcessMappingRule',
			'static.ProcessingGroup',
			'static.Location',
			'static.EventCategory',
			'static.OptionType',
			
			// Risk Data
			'risk.RiskFilterValue',
			'risk.AggregatedRisk',
			'risk.CorporateAction',
			'risk.Event',
			'risk.EvaluationFailure',
			'risk.Position'
		],

		stores: [
			// System Data
			'system.Accounts', 
			'system.LoggedInAccount',
			'system.Roles', 
			'system.DataKeys',
			'system.RiskCoefficients',
			'system.Audit',
				
			// Filter Data
			'filter.UserFilters',
			
			// Static data
			'static.Countries',
			'static.Currencies',
			'static.EventTypes',
			'static.EntityGroups',
			'static.Entities',
			'static.ProcessingGroups',
			'static.Locations',
			'static.EntityTree',
			'static.EventCategories',
			'static.OptionTypes',

			// Risk data stores
			'risk.TotalRisk',
			'risk.CorporateActions',
			'risk.Events',
			'risk.EvaluationFailures',
			'risk.Positions',
			'risk.CountryOfIssueRisks',
			'risk.EventCurrencyRisks',
			'risk.EventTypeRisks',
			'risk.ProcessingGroupRisks',
			'risk.EntityRisks',
			'risk.EntityGroupRisks',
			'risk.LocationRisks',
			'risk.RealisationDateRisks'	
		],

		views: [
			'Renderer',
			'ScreenViewPort'
		],

		controllers: [
			'Dashboard',
			'Events',
			'Navigation',
			'ClientSetup',
			'DataManagement',
			'RiskFilter',
			'Accounts', 
			'Coefficients',
			'Notification',
			'User'
		],

		requires: [
			'Rat.model.system.LoggedInAccount'
		],
		
		launch: function() {
			Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
			
			var navigationController = this.getController('Navigation');
			
			var preloadStores = [
				'system.Roles',
				'system.LoggedInAccount',
				'static.EntityGroups',
				'static.Entities',
				'static.ProcessingGroups',
				'static.Locations'
			];
			
			var showApplication = function(application) {
				loaderViewport.destroy();
				Ext.create('Rat.view.ScreenViewPort');
				
				Rat.view.Renderer.initialise();
				navigationController.selectInitialPanel();
				application.fireEvent('startup');				
			};
			
			var progressUpdater = function(progress) {
				loaderViewport.updateProgress(progress);
			};
			
			// Add a create listener to the end of the store load process
			this.getController('Startup').load(preloadStores, progressUpdater, showApplication, this);
		} 
	});
}

function url(stem, parameters) {
	var parameterString = (parameters && parameters.length > 0) ? '?' + parameters.join('&') : '';
	if (location.host === 'localhost') {
		// Local path
		var localStem = stem.replace('api.', '').replace(/\./g, '/').replace(/\/([a-z])(\w+)$/, function(s, $1, $2) {
			return '/' + $1.toUpperCase() + $2; 
		});
		return 'data/' + localStem + 'TestData.json' + parameterString; // Parameters not used locally but good for debugging
	} else {
		// Remote path - trim category name if present e.g. category.path
		var path = stem.replace('api.', 'api/v1/').replace(/\w+\./, '');
		return path + parameterString;
	}
}

Ext.Ajax.on('requestexception', function (conn, response, options) {
//    logger.log('Exception detected');
});

// Determine if we are already logged in
Ext.Ajax.request({
    url: url('api.system.loggedInAccount'),
    method: 'GET',
    callback: function(options, success, response) {
        if (success && response.responseText.charAt(0) === '{') {
        	// We seem to be logged in (NB. Owing to redirects the response is OK even if you get sent to login)
        	mainApplication({
        		destroy: function() {},
        		updateProgress: function() {}
        	});
        } else {
        	// Not logged in - go via login page
        	Ext.application({
        		name : 'Rat',
        		launch : function() {
        			var loaderViewport = Ext.create('Rat.LoaderViewPort', {
        				loginCallback: function() {
        					mainApplication(loaderViewport);
        				}
        			});		
        		}
        	});
        }
    }    
});

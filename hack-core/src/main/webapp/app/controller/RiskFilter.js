Ext.define('Rat.controller.RiskFilter', {
	extend: 'Ext.app.Controller',
    
	stores: [
		'filter.UserFilters',
		'risk.Events'
	],
	
	requires: [
		'Rat.view.filter.UserFilterForm'
	],
	
    refs: [{
		ref: 'viewPort',
		selector: 'viewport'
	}, {
		ref: 'activeRiskFilterPanel',
		selector: '#activeRiskFilters'
	}, {
		ref: 'navigationPanel',
		selector: 'navigation'
	}],

	cachedParameters: [], // Used to cancel window
	filterForm: null, // Only want to create once
	
	init: function() {
		this.control({
			'riskfilterform#risk button[action=clear]': { click: this.clearFilterWindow },
			'riskfilterform#risk button[action=recalculate]': { click: this.recalculateFilters },
			'riskfilterform#risk button[action=apply]': { click: this.applyFilters },
			'riskfilterform#risk button[action=cancel]': { click: this.cancelFilterWindow },
			
			'activeriskfilterpanel #saveFilter': {click: this.showUserFilterForm },
			
			'userfilterform button[action=saveUserFilter]': {click: this.saveUserFilter },
			'userfilterform button[action=cancelUserFilterForm]': {click: this.cancelUserFilterForm }
		});

		// Listen to application navigation event for filters
		this.application.on('subLocationfiltersShow', this.showMaximizedFilters, this);
		this.application.on('subLocationfiltersHide', this.hideMaximizedFilters, this);		
		this.application.on('riskFilterParameters', this.populateActiveFilterPanel, this);
		this.application.on('riskFilterParameters', this.populateFilterForm, this);
		this.application.on('riskFilterParameters', this.filterRiskEvents, this);
		
		// Initialise user filters
		this.getFilterUserFiltersStore().on('load', this.populateUserFilters, this);
		this.application.on('startup', this.loadUserFilters, this);
    },

	getFilterForm: function() {
		if (!this.filterForm) {
			this.filterForm = Ext.create('Rat.view.filter.RiskFilterForm', {
				itemId: 'risk',
				showAggregations: true,
				x: 8, 
				y: 72
			});
			this.resizeFilterForm(this.getViewPort());
			this.getViewPort().addListener('resize', this.resizeFilterForm, this);
		}

		return this.filterForm;
	},
	
	filterRiskEvents: function(parameters) {
		this.getRiskEventsStore().setFilterParameters(parameters);
	},	
	
	/**
	 * Updates the panel of selected filters.
	 */
	populateActiveFilterPanel: function(parameters) {
		this.getActiveRiskFilterPanel().setFilters(parameters);
		this.getActiveRiskFilterPanel().down('#saveFilter').setDisabled(parameters.length === 0);
	},
		
	/**
	 * Catches event that user removes a filter.
	 */
	filterPanelConditionRemoved: function() {
		// Determine which condition it was
		
		// Update the navigation controller
	},

	/**
	 * Updates the panel of selected filters.
	 */
	populateFilterForm: function(parameters) {
		this.cachedParameters = parameters;
		this.getFilterForm().setFilters(parameters);
	},
		
	/**
	 * Method to pop up the full screen filter dialog.
	 */
	showMaximizedFilters: function() {
		this.getFilterForm().show(this.getActiveRiskFilterPanel());
		
		// Reload all the aggregation summaries
		this.loadAggregation('risk.EntityGroupRisks', this.getFilterForm().down('#entityGroupIn'));
		this.loadAggregation('risk.EntityRisks', this.getFilterForm().down('#entityIn'));
		this.loadAggregation('risk.ProcessingGroupRisks', this.getFilterForm().down('#processingGroupIn'));
		this.loadAggregation('risk.LocationRisks', this.getFilterForm().down('#locationIn'));
		this.loadAggregation('risk.EventTypeRisks', this.getFilterForm().down('#eventTypeIn'));
		this.loadAggregation('risk.CountryOfIssueRisks', this.getFilterForm().down('#countryOfIssueIn'));
		this.loadAggregation('risk.EventCurrencyRisks', this.getFilterForm().down('#eventCurrencyIn'));
	},

	/**
	 * Responds to navigation event to hide filters.
	 */
	hideMaximizedFilters: function() {
		this.getFilterForm().hide(this.getActiveRiskFilterPanel());
	},

	
	/**
	 * Removes all selected filters without any navigation.
	 */
	clearFilterWindow: function() {
		this.getFilterForm().clear();
	},
	
	
	/**
	 * Applies filters to the application without navigating away.
	 */
	recalculateFilters: function() {
		// Extract all filter values and send to navigation...?
		this.getController('Navigation').navigate({ queryParameters: this.getFilterForm().getFilters()});
	},
	
	/** 
	 * Navigates away from filter window and applies filters.
	 */
	applyFilters: function() {
		this.getController('Navigation').navigate({ subLocation: null, queryParameters: this.getFilterForm().getFilters()});
	},
		
	/**
	 * Triggers a navigation away from the window and resets it.
	 */
	cancelFilterWindow: function() {
		this.getController('Navigation').navigate({ subLocation: null, queryParameters: this.cachedParameters});
	},

	loadAggregation: function(store, panel) {
		Ext.data.StoreManager.lookup(store).load({ scope: panel, callback: panel.applyAggregations});
	},
	
	resizeFilterForm: function(viewPort) {
		this.getFilterForm().setWidth(viewPort.getWidth() - 16);
		this.getFilterForm().setHeight(viewPort.getHeight() - 112);			
	},

	loadUserFilters: function() {
		this.getFilterUserFiltersStore().load();
	},
	
	populateUserFilters: function(store, records) {
		this.getNavigationPanel().loadUserFilters(records);
	},
	
	showUserFilterForm: function() {
		var userFilter = Ext.create('Rat.model.filter.UserFilter', {
			name: 'New Filter',
			content: this.getActiveRiskFilterPanel().getFilters().join('&')
		});
		var view = Ext.widget('userfilterform');
		view.down('form').loadRecord(userFilter);
		view.show();
	},
	
    saveUserFilter: function(button) {
        var view = button.up('panel');
		var form = view.down('form');
		
        form.getRecord().set(form.getValues());
		this.assignNewCode(form.getRecord(), this.getFilterUserFiltersStore());
		this.getFilterUserFiltersStore().add(form.getRecord());
		this.getFilterUserFiltersStore().sync();

        view.hide();
		view.destroy();
    },

    cancelUserFilterForm: function(button) {
		var panel = button.up('panel');
		panel.hide();
		panel.destroy();
	},
	
	assignNewCode: function(item, store) {
		var stem = item.get('name').replace(/\W/g, '').substr(0, 4);
		var suffix = 1;
		var candidate = stem; // deliberately leave off suffix first time
		while (this.codeExistsInStore(candidate, store)) {
			candidate = stem + (++suffix); // starts at stem2
		}
		item.set('code', candidate);
	},
	
	codeExistsInStore: function(code, store) {
		for (var i = 0; i < store.getCount(); i++) {
			if (store.getAt(i).get('code') === code) {
				return true;
			}
		}
		return false;
	}

});
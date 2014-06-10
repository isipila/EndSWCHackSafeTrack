Ext.define('Rat.controller.Events', {
    extend: 'Ext.app.Controller',

	stores: [
	    'risk.CorporateActions', 
	    'risk.EvaluationFailures',
	    'risk.Positions'
	],
	
	refs: [{
		ref: 'corporateActionForm',
		selector: 'corporateactionform'
	}, {
		ref: 'eventRiskForm',
		selector: 'eventriskform'
	}, {
		ref: 'evaluationFailureGrid',
		selector: 'evaluationfailuregrid'
	}],
		
	init: function() {
		this.getController('Navigation').initialiseLocation({
			location: 'event',
			subLocation: 'details',
			queryScope: 'event'
		});
	
        this.control({
			'eventgrid': {
				itemdblclick: this.displayEvent
			},
	
			'evaluationfailuregrid': {
				itemdblclick: this.displayEvent,
				render: this.loadEvaluationFailures
			},

			'eventsearch': {
				afterrender: this.setupSearchKeyboardNavigation
			},
			
			'eventsearch button[action=search]': {
				click: this.searchEvents
			},

			'eventsearch button[action=clear]': {
				click: this.clearEventSearch
			},
			
            'corporateactionform button[action=showEventDetails]': { click: this.eventDetailsClick },
            'corporateactionform button[action=showSwiftMessage]': { click: this.swiftMessageClick }
        });
        
        this.getRiskPositionsStore().on('load', this.hidePositionsMask, this);
        this.getRiskCorporateActionsStore().on('load', this.populateCorporateAction, this);
		
		this.eventStore = Ext.create('Rat.store.risk.Events');
		this.eventStore.on('load', this.populateEvent, this);
		
		this.application.on('eventParameters', this.loadEventDetails, this);
		this.application.on('subLocationDetailsShow', this.showEventDetails, this);
		this.application.on('subLocationSwiftShow', this.showSwiftMessage, this);		
    },

    displayEvent: function(grid, record) {
    	// Load some new data
    	this.getController('Navigation').navigate({ location: 'event', queryParameters: ['eventId=' + record.get('eventId')]});
    },

	loadEventDetails: function(parameters) {
		// Check we have an event Id before continuing
		var eventId = null;
		for (var i = 0; i < parameters.length; i++) {
			if (parameters[i].indexOf('eventId=') === 0) {
				eventId = parameters[i].slice(8);
			}
		}
		
		if (eventId) {
			this.getRiskPositionsStore().loadEventPositions(eventId);
			this.getRiskCorporateActionsStore().loadCorporateAction(eventId);
			this.eventStore.loadEvent(eventId);
		}
	},
    
    populateCorporateAction: function(store, records) {
		if (records && records.length == 1) {
        	this.getCorporateActionForm().loadCorporateAction(records[0]);
		}
    },

    populateEvent: function(store, records) {
		if (records && records.length == 1) {
        	this.getCorporateActionForm().loadRiskEvent(records[0]);
			this.getEventRiskForm().loadRiskEvent(records[0]);
		}
    },

    hidePositionsMask: function() {
    	
    },
    
	eventDetailsClick: function(button) {
    	this.getController('Navigation').navigate({ subLocation: 'details' });
	},
	
	swiftMessageClick: function(button) {
    	this.getController('Navigation').navigate({ subLocation: 'swift' });
	},
	
    showEventDetails: function() {
		this.getCorporateActionForm().layout.setActiveItem('eventDetails');		
    },
    
    showSwiftMessage: function() {
    	var form = this.getCorporateActionForm();
    	form.layout.setActiveItem('swiftMessage');		
    },
	
	loadEvaluationFailures: function() {
		this.getRiskEvaluationFailuresStore().load();
	},
	
	setupSearchKeyboardNavigation: function(container) {
        var searchButton = container.down('button[action=search]');
		container.keyNav = Ext.create('Ext.util.KeyNav', container.el, {
			enter: function() {
				this.searchEvents(searchButton);
			},
			scope : this
		});
	},
	
	searchEvents: function(button) {
		var parameters = [];
		var searchPanel = button.up('panel');
		var securityIdentifier = searchPanel.down('#securityIdentifier').getValue();
		if (securityIdentifier && securityIdentifier !== '') {
			parameters.push('securityId=' + securityIdentifier);
		}
		var corporateActionReference = searchPanel.down('#corporateActionReference').getValue();
		if (corporateActionReference && corporateActionReference !== '') {
			parameters.push('eventId=' + corporateActionReference);
		}
		var senderReference = searchPanel.down('#senderReference').getValue();
		if (senderReference && senderReference !== '') {
			parameters.push('senderReference=' + senderReference);
		}
		
		var eventGrid = searchPanel.next('eventgrid');
		eventGrid.getStore().setFilterParameters(parameters);
	},
	
	clearEventSearch: function(button) {
		var fields = button.up('panel').query('textfield');
		for (var i = 0; i < fields.length; i++) {
			fields[i].setValue('');
		}
	}
})
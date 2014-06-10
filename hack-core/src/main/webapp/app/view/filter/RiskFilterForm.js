Ext.define('Rat.view.filter.RiskFilterForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.riskfilterform',

	title: 'Risk Filters',
	
	floating: true,
	closable: false,
	shadow: false,
	
	requires: [
        'Rat.view.filter.FilterValuesSelector',
        'Rat.view.filter.DateRangeSelector'
    ],

	config: {
		showAggregations: false 
	},
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	// Creates a series of identical rows
	defaults: {
		xtype: 'container',
		flex: 1,
		padding: '8 0 0 8',
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		
		defaults: {
			margin: '0 8 8 0',
			autoScroll: true,
			flex: 1
		}
	},
	
	items: [{
		xtype: 'container',
		flex: 0,
		
		items: [{
			xtype: 'label',
			flex: 1,
			text: 'Select filters and then Apply'
		}, {
			xtype: 'button',
			flex: 0,
			action: 'clear',
			text: 'Clear'
		}, {
			xtype: 'button',
			flex: 0,
			action: 'recalculate',
			text: 'Recalculate',
			hidden: true
		}, {
			xtype: 'button',
			flex: 0,
			action: 'apply',
			text: 'Apply'
		}, {
			xtype: 'button',
			flex: 0,
			action: 'cancel',
			text: 'Cancel'
		}]
	}, {
		itemId: 'filterRow1',
		
		items: [{
			xtype: 'filtervaluesselector',
			itemId: 'entityGroupIn',
			title: 'Region',
			store: 'static.EntityGroups',
			renderer: Rat.view.Renderer.entityGroup
		}, {
			xtype: 'filtervaluesselector',
			itemId: 'entityIn',
			title: 'Entity',
			store: 'static.Entities',
			renderer: Rat.view.Renderer.entity
		}, {
			xtype: 'filtervaluesselector',
			itemId: 'processingGroupIn',
			title: 'Processing Group',
			store: 'static.ProcessingGroups',
			renderer: Rat.view.Renderer.processingGroup
		}, {
			xtype: 'filtervaluesselector',
			itemId: 'locationIn',
			title: 'Event Location',
			store: 'static.Locations',
			renderer: Rat.view.Renderer.location
		}]
	}, {
		itemId: 'filterRow2',
		
		items: [{
			xtype: 'filtervaluesselector',
			itemId: 'eventCurrencyIn',
			title: 'Event Currency',
			store: 'static.Currencies',
			renderer: Rat.view.Renderer.currency
		}, {
			xtype: 'filtervaluesselector',
			itemId: 'countryOfIssueIn',
			title: 'Event Country',
			store: 'static.Countries',
			renderer: Rat.view.Renderer.country
		}, {
			xtype: 'filtervaluesselector',
			itemId: 'eventTypeIn',
			title: 'Event Type',
			store: 'static.EventTypes',
			renderer: Rat.view.Renderer.eventType
		}, {
			xtype: 'daterangeselector',
			itemId: 'riskRealisationDate',
			title: 'Effective Date'
		}]
	}],
	
	/** 
	 * Extracts all query parameters from the filter window.
	 */
	getFilters: function() {
		var result = [];
		var filterPanels = this.query('component[getFilterValue]');
		for (var i = 0; i < filterPanels.length; i++) {
			var panel = filterPanels[i];
			var value = panel.getFilterValue();
			if (value && value !== '') {
				result.push(panel.getItemId() + '=' + value);
			}
		}
		
		return result;
	},
	
	setFilters: function(filters) {
		this.clear();
		for (var i = 0; i < filters.length; i++) {
			// Break on equals (of the form <fieldOperator>=value
			var nameValue = filters[i].split('=');
			if (nameValue.length != 2) {
				continue;
			} 

			var parameterPanel = this.down('#' + nameValue[0]);
			if (parameterPanel) {
				parameterPanel.setFilterValue(nameValue[1]);
			}
		}
	},
	
	clear: function() {
		var panels = this.query('panel');
		for (var i = 0; i < panels.length; i++) {
			if (panels[i].clear) {
				panels[i].clear();
			}
		}
	},
	
	initComponent: function() {
		this.callParent();
		this.down('button[action=recalculate]').setVisible(this.getShowAggregations());
	}
});

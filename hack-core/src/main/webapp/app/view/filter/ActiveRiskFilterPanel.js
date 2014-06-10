Ext.define('Rat.view.filter.ActiveRiskFilterPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.activeriskfilterpanel',

	requires: [
		'Rat.view.filter.FilterValuesList',
		'Rat.view.filter.DateRangeList'
	],
	
	defaults: {
		style: {
			width: '100%'
		}
	},

	items: [{
		xtype: 'filtervalueslist',
		itemId: 'entityGroupIn',
		title: 'Region',
		store: 'static.EntityGroups',
		renderer: Rat.view.Renderer.entityGroup,
		hidden: true
	}, {
		xtype: 'filtervalueslist',
		itemId: 'entityIn',
		title: 'Entity',
		store: 'static.Entities',
		renderer: Rat.view.Renderer.entity,
		hidden: true
	}, {
		xtype: 'filtervalueslist',
		itemId: 'processingGroupIn',
		title: 'Processing Group',
		store: 'static.ProcessingGroups',
		renderer: Rat.view.Renderer.processingGroup,
		hidden: true
	}, {
		xtype: 'filtervalueslist',
		itemId: 'locationIn',
		title: 'Location',
		store: 'static.Locations',
		renderer: Rat.view.Renderer.location,
		hidden: true
	}, {
		xtype: 'filtervalueslist',
		itemId: 'countryOfIssueIn',
		title: 'Country of Issue',
		store: 'static.Countries',
		renderer: Rat.view.Renderer.country,
		hidden: true
	}, {
		xtype: 'filtervalueslist',
		itemId: 'eventCurrencyIn',
		title: 'Event Currency',
		store: 'static.Currencies',
		renderer: Rat.view.Renderer.currency,
		hidden: true
	}, {
		xtype: 'filtervalueslist',
		itemId: 'eventTypeIn',
		title: 'Event Type',
		store: 'static.EventTypes',
		renderer: Rat.view.Renderer.eventType,
		hidden: true
	}, {
		xtype: 'daterangelist',
		itemId: 'riskRealisationDate',
		title: 'Effective Date',
		hidden: true
	}, {
		xtype: 'menu',
		plain: true,
		floating: false,
		border: false,
		defaults: {
			cls: 'plain-menu-item'
		},
		items: [{
			navigationTarget: { subLocation: 'filters'},
			text: 'Edit Filter'
		}, {
			itemId: 'saveFilter',
			disabled: true,
			text: 'Save Filter'
		}]
	}],
	
	setFilters: function(filters) {
		this.filters = filters;
	
		this.items.each(function(item) {
			if (item.clear) {
				item.clear();
			}
		});		
		
		for (var i = 0; i < filters.length; i++) {
			// Break on equals (of the form <fieldOperator>=value
			var nameValue = filters[i].split('=');
			if (nameValue.length != 2) {
				continue;
			} 

			var parameterPanel = this.down('#' + nameValue[0]);
			if (parameterPanel) {
				parameterPanel.setFilterValue(nameValue[1].split(','));
			}
		}
	},
	
	getFilters: function() {
		return this.filters;
	}
});


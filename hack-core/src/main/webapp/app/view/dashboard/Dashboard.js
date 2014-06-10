Ext.define('Rat.view.dashboard.Dashboard', {
	extend: 'Ext.container.Container',
    alias: 'widget.dashboard',
	
	layout: 'border',
	
	requires: [
		'Rat.view.dashboard.TotalRisk',
		'Rat.view.dashboard.EntityGroupRisksGrid',
		'Rat.view.dashboard.EntityRisksGrid',
		'Rat.view.dashboard.ProcessingGroupRisksGrid',
		'Rat.view.dashboard.LocationRisksGrid',
		'Rat.view.dashboard.EventTypeRisksGrid',
		'Rat.view.dashboard.CurrencyRisksGrid',
		'Rat.view.dashboard.CountryRisksGrid',
		'Rat.view.dashboard.RealisationDateRisksChart',
		'Rat.view.dashboard.DateRiskChart',
		'Rat.view.event.EventGrid'
	],

	items: [{
		xtype: 'eventgrid',
		title: 'Primary Risks',
		stateId: 'primaryRisks',
		region : 'center',
		flex: 2,
		margin: '0, 0, 8, 0'
	}, {
		xtype: 'container',
		itemId: 'aggregationContainer',
		flex: 1,
		region: 'west',
		margin: '0, 8, 8, 0',
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'totalrisk',
			margin: '0, 0, 8, 0'
		}, {
			xtype: 'panel',
			itemId: 'dynamicAggregation',
			flex: 1
			}]
	}, {
		xtype: 'panel',
		itemId: 'timeline',
		title: 'Time Line',
		region: 'south',
		layout: 'fit',
		flex: 2,
		
		items: [], // Dynamically created
		
		bbar: [{ 
			xtype: 'datefield',
			format: 'd M Y',
			itemId: 'startDate',
			padding: 2
		}, {
			xtype: 'datefield',
			format: 'd M Y',
			itemId: 'endDate',
			padding: 2
		}, {
			xtype: 'button',
			text: 'Update Chart',
			action: 'updateTimelineRange',
			padding: 2
		}]
	}],
	
	/**
	 * Replaces aggregation panel with a new one specified by config.
	 */
	createAggregationPanel: function(type) {
		var aggregationContainer = this.down('#aggregationContainer');
		var newPanel = Ext.widget({
			xtype: type,
			itemId: 'dynamicAggregation',
			flex: 1
		});
		
		aggregationContainer.remove(aggregationContainer.down('#dynamicAggregation'));
		aggregationContainer.add(newPanel);
		return newPanel;
	},
	
	initComponent: function() {
		// Set up the dates
		this.callParent();

		this.down('#startDate').setValue(new Date());
		var endDate = new Date();
		endDate.setMonth(endDate.getMonth() + 1);
		this.down('#endDate').setValue(endDate);
	}
});

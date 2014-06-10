/** 
 * General controller for hooking up events on dashboard widgets.
 */
Ext.define('Rat.controller.Dashboard', {
    extend: 'Ext.app.Controller',
   
	stores: ['risk.TotalRisk'],

	lastChartParameters: [],
	
	init: function() {
		this.getController('Navigation').initialiseLocation({
			location: 'dashboard',
			queryScope: 'riskFilter'
		});
		
		this.control('dashboard button[action=updateTimelineRange]', {
			click: this.updateTimelineRange
		});
		
		this.application.on('riskFilterParameters', this.loadTotalRisk, this);
		this.application.on('riskFilterParameters', this.updateAggregationPanel, this);
		this.application.on('riskFilterParameters', this.updateTimelineChart, this);
		
		this.getRiskTotalRiskStore().on('load', this.updateTotalRiskPanel);
    },
	
	loadTotalRisk: function(parameters) {
		var panel = Ext.ComponentQuery.query('totalrisk')[0];
		panel.loadingMask.show();
		this.getRiskTotalRiskStore().setFilterParameters(parameters);
	},
	
	updateTimelineRange: function() {
		this.updateTimelineChart(this.lastChartParameters);
	},
	
	updateTotalRiskPanel: function(store, records) {
		var panel = Ext.ComponentQuery.query('totalrisk')[0];
		if (records.length != 1) {
			return;
		}		
		
		var totalRisk = records[0];
		var text = totalRisk.get('positionCount') + ' positions on ' + totalRisk.get('eventCount') + ' events'; 
		panel.down('#currency').setText(totalRisk.get('riskCurrency') + ' ');
		panel.down('#value').setText(Ext.util.Format.number(totalRisk.get('riskValue'), '0,000.00'));
		panel.down('#summaryText').setText(text);
		panel.loadingMask.hide();
	},
	
	updateAggregationPanel: function(parameters) {
		var dashboard = Ext.ComponentQuery.query('dashboard')[0];
		var specifiedFields = this.determineSpecifiedFilterFields(parameters);
		var newPanelType = 'panel';
		var newParameterName = '';

		if (!specifiedFields.entityGroup) {
			// 1 Entity Group
			newPanelType = 'entitygrouprisksgrid';		
			newParameterName = 'entityGroupIn';
			
		} else if (!specifiedFields.processingGroup) {
			// 2 Processing Group
			newPanelType = 'processinggrouprisksgrid';		
			newParameterName = 'processingGroupIn';
		
		} else if (!specifiedFields.entity) {
			// 3 Risk by entity
			newPanelType = 'entityrisksgrid';		
			newParameterName = 'entityIn';
		
		} else if (!specifiedFields.location) { 
			// 4 Risk by location
			newPanelType = 'locationrisksgrid';
			newParameterName = 'locationIn';
			
		} else if (!specifiedFields.eventType) { 
			// 5 Risk by event type
			newPanelType = 'eventtyperisksgrid';
			newParameterName = 'eventTypeIn';
		
		} else if (!specifiedFields.countryOfIssue) { 
			// 6 Risk by country of issue
			newPanelType = 'countryrisksgrid';
			newParameterName = 'countryOfIssueIn';
			
		} else if (!specifiedFields.eventCurrency) { 
			// 7 Risk by currency
			newPanelType = 'currencyrisksgrid';
			newParameterName = 'eventCurrencyIn';
		}
			
		var panel = dashboard.createAggregationPanel(newPanelType);
		panel.parameter = 'Hello bob';
		panel.getStore().setFilterParameters(parameters);
		
		panel.on('itemclick', function(viewm, model) {
			parameters.push(newParameterName + '=' + model.get('item'));
			this.getController('Navigation').navigate({ queryParameters: parameters});
		}, this);
	},
	
	updateTimelineChart: function(parameters) {
		this.lastChartParameters = parameters;
		var specifiedFields = this.determineSpecifiedFilterFields(parameters);
		var dashboard = Ext.ComponentQuery.query('dashboard')[0];

		if (specifiedFields.realisationDate) {
			// Hide the chart since a single date is chosen
			dashboard.down('#timeline').setVisible(false);
		} else {
			// Show the chart - generate categories
			dashboard.down('#timeline').setVisible(true);
			var startDate = dashboard.down('#startDate').getValue();
			var endDate = dashboard.down('#endDate').getValue();
			
			if (startDate && endDate && endDate > startDate) {
				var categories = [];
				var categoryCount = 0;
				var category = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
				while (category <= endDate && categoryCount < 32) {
					categories.push(category);
					category = new Date(category.getFullYear(), category.getMonth(), category.getDate() + 1);
					categoryCount++;
				}

				// Set up special parameters including this date range
				var chartParameters = [];
				for (var i = 0; i < parameters.length; i++) {
					chartParameters.push(parameters[i]);
				}
				chartParameters.push('riskRealisationDateGreaterThanOrEqualTo=' + Ext.util.Format.date(startDate, 'Y-m-d'));				
				chartParameters.push('riskRealisationDateLessThanOrEqualTo=' + Ext.util.Format.date(endDate, 'Y-m-d'));
				
				var seriesKeys = [];
				if (specifiedFields.entityGroup) {
					seriesKeys.push('riskValue');
				} else {
					var entityGroupsStore = Ext.data.StoreManager.lookup('static.EntityGroups');
					entityGroupsStore.each(function(item) {
						seriesKeys.push(item.get('code'));
					});
				}
				
				var store = Ext.create('Rat.store.risk.MultiAggregationRisks', {
					baseStore: 'Rat.store.risk.RealisationDateRisks',
					categoryKeys: categories,
					seriesKeys: seriesKeys,
					seriesParameterGenerator: function(seriesKey) {
						return 'entityGroupIn=' + seriesKey;
					}
				});
				store.initialise();

				var existingChart = dashboard.down('dateriskchart');
				if (existingChart) {
					existingChart.getStore().destroyStore();
					dashboard.down('#timeline').remove(existingChart, true);
				} 
				
				dashboard.down('#timeline').add({
					xtype: 'dateriskchart',
					seriesKeys: seriesKeys,
					store: store
				});
					
				store.loadAll(chartParameters, function() {
					dashboard.down('dateriskchart').redraw();
				});
			}
		}
	},
	
	determineSpecifiedFilterFields: function(parameters) {
		var specifiedFields = {
			entityGroup: false,
			entity: false,
			processingGroup: false,
			location: false,
			eventType: false,
			eventCurrency: false,
			countryOfIssue: false,
			realisationDate: false,
		};
		
		var dateMax = null;
		var dateMin = null;
		for (var i = 0; i < parameters.length; i++) {
			var nameValue = parameters[i].split('=');
			if (nameValue.length == 2) {
				var values = nameValue[1].split(',');
				switch (nameValue[0])
				{
				case 'entityGroupIn':
					specifiedFields.entityGroup = values.length === 1;
					break;
				case 'entityIn':
					specifiedFields.entity = values.length === 1;
					break;
				case 'processingGroupIn':
					specifiedFields.processingGroup = values.length === 1;
					break;
				case 'locationIn':
					specifiedFields.location = values.length === 1;
					break;
				case 'eventTypeIn':
					specifiedFields.eventType = values.length === 1;
					break;
				case 'eventCurrencyIn':
					specifiedFields.eventCurrency = values.length === 1;
					break;
				case 'countryOfIssueIn':
					specifiedFields.countryOfIssue = values.length === 1;
					break;
				case 'riskRealisationDateGreaterThanOrEqualTo':
					dateMin = values;
					break;
				case 'riskRealisationDateLessThanOrEqualTo':
					dateMax = values;
					break;
				}
			}
		}
		if (dateMin !== null && dateMax !== null) {
			specifiedFields.realisationDate = dateMin === dateMax;
		}
		return specifiedFields;
	}
});

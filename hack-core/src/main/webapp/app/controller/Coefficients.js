Ext.define('Rat.controller.Coefficients', {
	extend: 'Ext.app.Controller',
    
	stores: ['system.RiskCoefficients'],
	
	refs: [{
		ref: 'coefficientsPanel',
		selector: 'coefficients'
	}],

	init: function() {
		this.getController('Navigation').initialiseLocation({
			location: 'riskCoefficients',
			subLocation: 'external'
		});
	
		this.control('coefficients', {
            render: this.loadCoefficients
        });
			
		this.control('coefficients', {
			tabchange: this.tabChange
		});
		
		// Listen to application navigation event for filters
		this.application.on('subLocationExternalShow', this.showExternalFactors, this);
		this.application.on('subLocationInternalShow', this.showInternalFactors, this);		
		this.application.on('subLocationPositionShow', this.showPositionFactors, this);		
    },
	
	tabChange: function(panel, newCard) {
		// Make sure this gets pushed to the navigation
		this.getController('Navigation').navigate({ subLocation: newCard.getItemId()});
	},
	
	showExternalFactors: function() {
		this.showPanel('external');
	},

	showInternalFactors: function() {
		this.showPanel('internal');
	},
	
	showPositionFactors: function() {
		this.showPanel('position');
	},

	showPanel: function(ref) {
		if (this.getCoefficientsPanel().getActiveTab().getItemId() === ref) {
			return; // Already selected
		}

		var panel = this.getCoefficientsPanel().down('#' + ref);
		this.getCoefficientsPanel().setActiveTab(panel);
	},
	
	loadCoefficients: function() {
		this.getSystemRiskCoefficientsStore().load({
			scope: this,
			callback: this.populateCoefficientsPanel
		});
	},
	
	populateCoefficientsPanel: function(records) {
		var countryFactors = {};
		var eventTypeFactors = {};
		var overrides = {};
		
		var processFactorStore = this.getCoefficientsPanel().down('#processFactors grid').getStore();
		var resourceFactorStore = this.getCoefficientsPanel().down('#resourceFactors grid').getStore();
		var accountTypeFactorStore = this.getCoefficientsPanel().down('#accountTypeFactors grid').getStore();
		var positionTypeFactorStore = this.getCoefficientsPanel().down('#positionTypeFactors grid').getStore();
		
		var countryFactors = {};
		var eventTypeFactors = {};
		var overrideFactors = {};
		
		for (var i = 0; i < records.length; i++) {
			var riskCoefficient = records[i];
			var identifiers = riskCoefficient.get('identifiers');
			
			if (identifiers && identifiers.length > 0) {
				riskCoefficient.set('name', identifiers[0].value);
				
				switch (identifiers[0].type) {
				case 'COUNTRY':
					if (identifiers.length > 1) {					
						var overrideKey = identifiers[0].value + identifiers[1].value + (identifiers.length > 2 ? ' (' + identifiers[2].value.charAt(0) + ')' : '');
						overrideFactors[overrideKey] = riskCoefficient.get('coefficient');
					} else {
						// Regular country factor
						countryFactors[identifiers[0].value] = riskCoefficient.get('coefficient');
					}
					break;
				case 'EVENT_TYPE':
					var key = identifiers[0].value + (identifiers.length > 1 ? ' (' + identifiers[1].value.charAt(0) + ')' : ''); 
					eventTypeFactors[key] = riskCoefficient.get('coefficient');
					break;
				case 'PROCESS':
					processFactorStore.add(riskCoefficient);
					break;
				case 'RESOURCE':
					resourceFactorStore.add(riskCoefficient);
					break;
				case 'POSITION_TYPE':
					positionTypeFactorStore.add(riskCoefficient);
					break;
				case 'ACCOUNT_TYPE':
					accountTypeFactorStore.add(riskCoefficient);
					break;
				}
			}
		}
		
		var sortedCountries = [];
		for (var country in countryFactors) {
			sortedCountries.push(country);
		}
		sortedCountries.sort();
		
		var sortedEventTypes = [];
		for (var eventType in eventTypeFactors) {
			sortedEventTypes.push(eventType);
		}
		sortedEventTypes.sort();
		
		// Done as native HTML for performance - big table of data
		var content = '<table class="factors_table"><tr><td></td><td></td>';
		for (var i = 0; i < sortedCountries.length; i++) {
			content += '<td class="country">' + sortedCountries[i] + '</td>';
		}
		content += '</tr>';
		content += '<tr><td></td><td></td>';
		for (var i = 0; i < sortedCountries.length; i++) {
			var country = sortedCountries[i]
			content += '<td class="country_factor">' + countryFactors[country] + '</td>';
		}
		content += '</tr>';
		
		for (var i = 0; i < sortedEventTypes.length; i++) {
			var eventType = sortedEventTypes[i];
			content += '<tr><td class="event_type">' + eventType + '</td>';
			content += '<td class="event_type_factor">' + eventTypeFactors[eventType] + '</td>';
			for (var country in countryFactors) {
				var override = overrideFactors[country + eventType];
				var value = override ? override : eventTypeFactors[eventType] * countryFactors[country];
				content += '<td' + (override ? ' class="coefficient_override"' : '') + '>' + Rat.view.Renderer.riskPercentage(value) + '</td>';
			}
			content += '</tr>';
		}
		
		content += '</table>';
		
		var panel = this.getCoefficientsPanel().down('#external');
		panel.update(content);
		panel.addCls('coefficients_container');
	}
});


/*
for (var eventType in eventTypeFactors) {
var splitEventType = splitEventTypes[eventType];
var splitEventKeys = splitEventType ? Object.keys(splitEventType) : [];  

if (splitEventKeys.length > 1) {
	// First (main) row for this event type
	content += '<tr><td class="event_type">' + eventType + ' ' + splitEventKeys[0] + '</td>';

	// Other rows for different split lines
	for (var i = 1; i < splitEventKeys.length; i++) {
		splitEventType[splitEventKeys[i]] += '<tr><td class="event_type">' + eventType + ' ' + splitEventKeys[i] + '</td>';
	}
} else {
	content += '<tr><td class="event_type">' + eventType + '</td>';
}

for (var country in countryFactors) {
	var override = overrideFactors[country + eventType];
	if (override) {
		if (splitEventKeys.length > 1) {
			// Output first override value in this row
			content += this.cellValue(override[splitEventKeys[0]], 1, 'coefficient_override');
			
			// Output other overrides in other rows
			// Other rows for different split lines
			for (var i = 1; i < splitEventKeys.length; i++) {
				splitEventType[splitEventKeys[i]] += this.cellValue(override[splitEventKeys[i]], 1, 'coefficient_override');
			}
		} else {
			// Single override
			content += this.cellValue(override[splitEventKeys[0]], splitEventKeys.length, 'coefficient_override');
		}
		
	} else {
		content += this.cellValue(eventTypeFactors[eventType] * countryFactors[country], splitEventKeys.length);
	}
}
content += '</tr>';

// Flush other rows
for (var i = 1; i < splitEventKeys.length; i++) {
	content += splitEventType[splitEventKeys[i]];
}
}*/
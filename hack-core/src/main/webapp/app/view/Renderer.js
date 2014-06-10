Ext.define('Rat.view.Renderer', {
	singleton : true,
	
	constructor : function(config){
        this.initConfig(config);
    },
	
	initialise: function() {
		this.processingGroups = Ext.StoreManager.lookup('static.ProcessingGroups');
		this.eventCategories = Ext.StoreManager.lookup('static.EventCategories');
		this.eventTypes = Ext.StoreManager.lookup('static.EventTypes');
		this.currencies = Ext.StoreManager.lookup('static.Currencies');
		this.countries = Ext.StoreManager.lookup('static.Countries');
		this.optionTypes = Ext.StoreManager.lookup('static.OptionTypes');
		this.locations = Ext.StoreManager.lookup('static.Locations');
		this.entities = Ext.StoreManager.lookup('static.Entities');
		this.entityGroups = Ext.StoreManager.lookup('static.EntityGroups');
		
		this.roles = Ext.StoreManager.lookup('system.Roles');
	},
	
	lookup: function(store, value, blankValue) {
		if (value && value !== '') {
			var item = store.getAt(store.findExact('code', value))
			if (item) {
				return item.get('name');
			}
		}
		return blankValue ? blankValue : '';
	},

	eventCategory: function(value) {
		return Rat.view.Renderer.lookup(Rat.view.Renderer.eventCategories, value);
	},
	
	eventType: function(value) {
		var decode = Rat.view.Renderer.lookup(Rat.view.Renderer.eventTypes, value);
		return value && decode ? (value + ' (' + decode + ')') : 'No Event Type';
	},
	
	currency: function(value) {
		return value && value !== '' ? value : 'No Currency'; // this.lookup(this.currencies, value);
	},

	country: function(value) {
		return value && value !== '' ? value : 'No Country'; // this.lookup(this.countries, value);
	},

	location: function(value) {
		return Rat.view.Renderer.lookup(Rat.view.Renderer.locations, value, 'No Location');
	},

	entity: function(value) {
		return value && value !== '' ? value + ' - ' + Rat.view.Renderer.lookup(Rat.view.Renderer.entities, value) : 'No Entity';
	},

	entityGroup: function(value) {
		return value && value !== '' ? value + ' - ' + Rat.view.Renderer.lookup(Rat.view.Renderer.entityGroups, value) : 'No Entity Group';
	},

	optionType: function(value) {
		return Rat.view.Renderer.lookup(Rat.view.Renderer.optionTypes, value);
	},
	
	processingGroup: function(value) {
		return Rat.view.Renderer.lookup(Rat.view.Renderer.processingGroups, value, 'No Processing Group');
	},
	
	riskPercentage: function(value) {
		return Ext.util.Format.number(Math.round(value * 1000) / 10, '0.0 %');
	},
	
	role: function(value) {
		if (value instanceof Array) {
			var result = [];
			for (var i = 0; i < value.length; i++) {
				result.push(Rat.view.Renderer.lookup(Rat.view.Renderer.roles, value[i]));
			}
			return result.join();
		} else {
			return Rat.view.Renderer.lookup(Rat.view.Renderer.roles, value);
		}
	},
	
	evaluationFailureReason: function(reason) {
		switch(reason) {
		case 'UNKNOWN_REALISATION_DATE':
			return 'No realisation date'
		case 'RISK_PER_SHARE_CALCULATION':
			return 'Error determining risk per share';
		case 'COUNTRY_FACTOR':
			return 'Country of Issue';
		case 'EVENT_TYPE_FACTOR':
			return 'Event Type';
		case 'PROCESSING_GROUP_MAPPING':
			return 'Processing Group Mapping';
		case 'NEGATIVE_RISK_PER_SHARE':
			return 'Risk per share is negative';				
		case 'UNSUPPORTED_EVENT_TYPE':
			return 'Event type requires manual intervention';				
		case 'TECHNICAL':
			return 'System Errors';
		
		default:
			return reason;					
		} 				
	}
});
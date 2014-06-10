Ext.define('Rat.store.risk.MultiAggregationRisks', {
    extend: 'Ext.data.Store',

	config: {
		baseStore: null,
		categoryKeys: null,
		seriesKeys: null,
		seriesParameterGenerator: null,
	},
	
    model: 'Rat.model.risk.AggregatedRisk',
	autoLoad: false,

	data: [],
	
	initialise: function() {
		// Seed the store with all categories
		for (var i = 0; i < this.getCategoryKeys().length; i++) {
			var category = Ext.util.Format.date(this.getCategoryKeys()[i], 'Y-m-d');
			var compoundAggregation = Ext.create('Rat.model.risk.AggregatedRisk', {
				item: category
			});
			for (var k = 0; k < this.getSeriesKeys().length; k++) {
				compoundAggregation.set(this.getSeriesKeys()[k], 0);
			}
			this[category] = compoundAggregation;
			this.add(compoundAggregation);
		}
	},
	
	loadAll: function(parameters, callBack) {
		var seriesProcessor = function(store, records) {
			var seriesKey = store.seriesKey;
			for (var i = 0; i < records.length; i++) {
				var record = records[i];
				var category = this[record.get('item')];
				if (category) {
					category.set(seriesKey, record.get('riskValue'));
				}
			}
			if (callBack) {
				callBack();
			}
		};

		
		for (var j = 0; j < this.getSeriesKeys().length; j++) {
			var seriesKey = this.getSeriesKeys()[j];
			var queryStore = Ext.create(this.getBaseStore());
			queryStore.seriesKey = seriesKey;
			queryStore.on('load', seriesProcessor, this);

			if (this.getSeriesParameterGenerator()) {
				var seriesParameters = parameters.slice(0); 
				seriesParameters.push(this.getSeriesParameterGenerator()(seriesKey));
				queryStore.setFilterParameters(seriesParameters);
			} else {
				queryStore.setFilterParameters(parameters);
			}
		}
	}
});
Ext.define('Rat.view.filter.FilterValuesSelector', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.filtervaluesselector',

	config: {
		store: null,
		renderer: null
    },
	
	header: {
		border: 0,
		cls: 'sub-panel-header'
	},
	
    layout: {
		type: 'vbox',
		align: 'stretch'
	},

	border: false,
	bodyBorder: false,

	clear: function() {
		this.down('grid').getStore().each(function(item) {
			item.set('selected', false);
		});
	},
	
	getFilterValue: function() {
		var result = [];
		this.down('grid').getStore().each(function(item) {
			if (item.get('selected')) {
				result.push(item.get('code'));
			}
		});
		return result.join(',');
	},
	
	setFilterValue: function(valuesString) {
		var values = valuesString.split(',');
		this.down('grid').getStore().each(function(item) {
			for (var i = 0; i < values.length; i++) {
				if (values[i] === item.get('code')) {
					item.set('selected', true);
					return;
				}
			}
			item.set('selected', false);
		});
	},
	
	applyAggregations: function(records) {
		var store = this.down('grid').getStore();
		for (var i = 0; i < records.length; i++) {
			var index = store.find('code', records[i].get('item'));
			if (index >= 0) {
				var filterRecord = store.getAt(index);
				filterRecord.set('riskCurrency', records[i].get('riskCurrency'));
				filterRecord.set('riskValue', records[i].get('riskValue'));
			}
		}
		
		// Show and sort in risk descending order
		store.sort('riskValue', 'DESC');
		this.down('#riskColumn').setVisible(true);
	},
	
	initComponent: function() {
		var sourceStore = Ext.data.StoreManager.lookup(this.getStore());
		var store = Ext.create('Ext.data.Store', {
			model: 'Rat.model.risk.RiskFilterValue'
		});

		// Copy contents across
		sourceStore.each(function(record) {
			store.add({
				code: record.get('code'),
				description: record.get('name'),
				selected: false
			});
		});
		this.items = [{
			xtype: 'grid',
			border: 0,
			store: store,
			hideHeaders: true,
			viewConfig: {
				markDirty: false
			},
			columns: [{
				xtype:'checkcolumn',
				itemId: 'check',
				dataIndex: 'selected',
				width:24
			}, {
				xtype: 'gridcolumn',
				dataIndex: 'code',
				renderer: this.getRenderer(),
				flex: 1
			}, {
				xtype: 'gridcolumn',
				dataIndex: 'riskValue',
				itemId: 'riskColumn',
				hidden: true,
				renderer: function(value, metaData, record) {
					return record.get('riskCurrency') + ' ' + Ext.util.Format.number(value, '0,000.00');
				}
			}]
		}]

		this.callParent();
    }
});
Ext.define('Rat.view.filter.FilterValuesList', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.filtervalueslist',

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
		this.down('grid').getStore().removeAll();
		this.setVisible(false);
	},
	
	setFilterValue: function(values) {
		var gridStore = this.down('grid').getStore();
		gridStore.removeAll();
		Ext.data.StoreManager.lookup(this.getStore()).each(function(record) {
			for (var i = 0; i < values.length; i++) {
				if (values[i] === record.get('code')) {
					gridStore.add(record);
				}
			}
		});
		this.setVisible(true);
	},
	
	initComponent: function() {
		var baseStore = Ext.data.StoreManager.lookup(this.getStore());
		var modelName = Ext.ModelManager.getModel(baseStore.model).getName();
		var store = Ext.create('Ext.data.Store', {
			model: modelName
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
				xtype: 'gridcolumn',
				dataIndex: 'code',
				renderer: this.getRenderer(),
				flex: 1
			}]
		}];

		this.callParent();
    }
});
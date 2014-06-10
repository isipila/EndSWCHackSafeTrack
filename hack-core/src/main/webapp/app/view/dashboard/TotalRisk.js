Ext.define('Rat.view.dashboard.TotalRisk', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.totalrisk',

	title: 'Total Risk',
	minHeight: 64,
	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	defaults: {
		padding: 8,
		layout: {
			type: 'hbox',
			align: 'stretch'
		}
	},
	
	items: [{
		xtype: 'container',

		defaults: {
			style: {
				fontSize: 24
			}
		},
		
		items: [{
			xtype: 'label',
			itemId: 'currency',
			padding: '0, 8, 0, 0'
		}, {
			xtype: 'label',
			itemId: 'value',
			text: '-'
		}]
	}, {
		xtype: 'container',
		items: [{
			xtype: 'label',
			itemId: 'summaryText'
		}]
	}],
	
	initComponent: function() {
		this.loadingMask = new Ext.LoadMask(this, {msg:"Loading"});
		this.callParent();
	}
});

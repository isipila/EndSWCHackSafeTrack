Ext.define('Rat.view.filter.DateRangeList', {
	extend: 'Ext.panel.Panel',	
	alias: 'widget.daterangelist',

	header: {
		border: 0,
		cls: 'sub-panel-header',
	},
	
	layout: 'fit',
	
	border: false,
	bodyBorder: false,

	items: [{
		// Nested panel for border hack
		xtype: 'panel',
		
		border: false,
		style: {
			borderTop: '1px solid #C5C5C5'
		},
		
		defaults: {
			padding: 4,
			xtype: 'container',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			defaults : {
				xtype: 'label',
				flex: 1
			}
		},

		layout: {
			type: 'vbox',
			align: 'stretch'
		}
	}],
	
	clear: function() {
		this.down('#startValue').setText('');
		this.down('#endValue').setText('');
		this.down('#' + this.getItemId() + 'GreaterThanOrEqualTo').setVisible(false);
		this.down('#' + this.getItemId() + 'LessThanOrEqualTo').setVisible(false);
		this.setVisible(false);
	},
	
	initComponent: function() {
		var startId = this.getItemId() + 'GreaterThanOrEqualTo'; 
		var endId = this.getItemId() + 'LessThanOrEqualTo'; 
		
		this.items[0].items = [{
			itemId: startId,
			items: [{
				text: 'Start:'
			}, {
				itemId: 'startValue'
			}],
			setFilterValue: function(value) {
				this.down('#startValue').setText(value);
				this.setVisible(true);
				this.up('daterangelist').setVisible(true);
			}
		}, {
			itemId: endId,
			items: [{
				text: 'End:'
			}, {
				itemId: 'endValue'
			}],
			setFilterValue: function(value) {
				this.down('#endValue').setText(value);
				this.setVisible(true);
				this.up('daterangelist').setVisible(true);
			}
		}];
		
		this.callParent();
	}
});
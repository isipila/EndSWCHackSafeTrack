Ext.define('Rat.view.filter.DateRangeSelector', {
	extend: 'Ext.panel.Panel',	
	alias: 'widget.daterangeselector',

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
			labelWidth: 64
		},

		layout: {
			type: 'vbox',
			align: 'stretch'
		}
	}],
	
	clear: function() {
		this.down('#' + this.getItemId() + 'GreaterThanOrEqualTo').setValue(null);
		this.down('#' + this.getItemId() + 'LessThanOrEqualTo').setValue(null);
	},
	
	initComponent: function() {
		var startId = this.getItemId() + 'GreaterThanOrEqualTo'; 
		var endId = this.getItemId() + 'LessThanOrEqualTo'; 
		
		this.items[0].items = [{
			xtype: 'datefield',
			fieldLabel: 'Start',
			format: 'Y-m-d',
			itemId: startId,
			getFilterValue: function() {
				return Ext.util.Format.date(this.getValue(), 'Y-m-d');
			},
			setFilterValue: function(value) {
				this.setValue(value);
			}
		}, {
			xtype: 'datefield',
			fieldLabel: 'End',
			format: 'Y-m-d',
			itemId: endId,
			getFilterValue: function() {
				return Ext.util.Format.date(this.getValue(), 'Y-m-d');
			},
			setFilterValue: function(value) {
				this.setValue(value);
			}
		}];
					
		this.callParent();
	}
});
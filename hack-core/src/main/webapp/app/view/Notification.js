Ext.define('Rat.view.Notification', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.notification',

	floating: true,
	
	width: 240,
	height: 80,
	paadding: 8,	
		
	config: {
		message: undefined
	},

	layout: {
		type: 'fit'
	},

	initComponent: function() {
		this.items = [{
			xtype: 'label',
			margin: 8,
			text: this.getMessage()
		}];
		
        this.callParent();
    }
});

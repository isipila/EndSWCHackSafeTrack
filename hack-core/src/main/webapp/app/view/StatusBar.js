Ext.define('Rat.view.StatusBar', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.statusbar',
	
	itemId: 'statusBar',
	
	height: 32,

	layout: {
		type: 'hbox',
		align: 'middle',
		defaultMargins: 4
	},

	items: [{
		xtype: 'label',
		text: 'Application Prototype v0.1'
	}]
});

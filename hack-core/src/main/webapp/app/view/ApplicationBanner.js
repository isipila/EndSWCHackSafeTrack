Ext.define('Rat.view.ApplicationBanner', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.applicationbanner',
	
	requires: [
		'Rat.view.system.ActiveUserPanel'
	],
	
	height: 64,
	
	layout: 'border',
	
	items: [{
		xtype: 'panel',
		region: 'center',
		border: false,
		layout: {
			type: 'hbox',
			align: 'middle'
		},
		items: [{
			xtype: 'image',
			width: 164,
			height: 48,
			src: 'resources/images/ibacas-logo-small.gif'
		}, {
			xtype: 'label',
			text: 'Corporate Actions Risk Management Application',
			padding: '0, 0, 0, 50',
			style: {
				fontFamily: 'Verdana, Tahoma, Arial, Sans-Serif',
				fontSize: 32,
				color: '#202060'
			}
		}] 
	}, {
		xtype: 'activeuser',
		region: 'east',
		border: false
	}]
});

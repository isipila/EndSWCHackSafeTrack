Ext.define('Rat.view.scenario.Status', {
	extend: 'Ext.panel.Panel',
	xtype: 'scenariostatus',

	layout: {
		type: 'vbox',
		align: 'stretch',
		defaultMargins: 8
	},

	border: false,
	
	style: {
		borderStyle: 'solid',
		borderColor: 'red',
	},

	header: false,
	
	items: [{
		xtype: 'container',
		layout: {
			type: 'vbox',
			align: 'center'
		},
		items: [{
			xtype: 'image',
			src: 'resources/images/warning.jpg'
		}]
	}, {
		xtype: 'label',
		text: 'Scenario [Other Scenario] is currenty active. Risk numbers are not representative'
	}, {
		xtype: 'button',
		text: 'End Scenario'
	}]
});
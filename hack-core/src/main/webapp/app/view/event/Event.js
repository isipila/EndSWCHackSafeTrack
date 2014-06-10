Ext.define('Rat.view.event.Event', {
	extend: 'Ext.container.Container',
	alias: 'widget.eventview',

    layout: 'border',

	requires: [
		'Rat.view.event.EventRiskForm',
		'Rat.view.event.PositionGrid',
		'Rat.view.event.CorporateActionForm'
	],
	
	items: [{
		xtype: 'positiongrid',
		region: 'center',
		stateId: 'positionsGrid',
		flex: 1
	}, {
		xtype: 'container',
		region: 'north',
		margin: '0, 0, 8, 0',
		flex: 1,
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'corporateactionform',
			margin: '0, 4, 0, 0',
			flex: 1
		}, {
			xtype: 'container',
			margin: '0, 0, 0, 4',
			flex: 1,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'eventriskform',
				title: 'Event Risk Calculation',
				margin: '0, 0, 4, 0',
				flex: 1
			}, {
				xtype: 'panel',
				title: 'Risks by Position Type',
				margin: '4, 0, 0, 0',
				flex: 1
			}]
		}]
    }] 
});
Ext.define('Rat.view.system.Coefficients', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.coefficients',

    requires: ['Rat.view.system.CoefficientsGrid'],
    
    title: 'Risk Coefficients',
	tabPosition: 'left',
	
	items: [{
		title: 'External',
		itemId: 'external',
		layout: 'fit',
		id: 'external_factors_container'
	}, {
		title: 'Internal',
		itemId: 'internal',
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'coefficientsgrid',
			title: 'Process Coefficients',
			itemId: 'processFactors',
			margin: 8
		}, {
			xtype: 'coefficientsgrid',
			margin: 8,
			title: 'Resource Coefficients',
			itemId: 'resourceFactors'
		}]
	}, {
		title: 'Position',
		itemId: 'position',
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'coefficientsgrid',
			title: 'Account Type Coefficients',
			itemId: 'accountTypeFactors',
			margin: 8
		}, {
			xtype: 'coefficientsgrid',
			margin: 8,
			title: 'Position Type Coefficients',
			itemId: 'positionTypeFactors'
		}]
	}]
});


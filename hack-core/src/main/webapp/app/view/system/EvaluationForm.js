Ext.define('Rat.view.system.EvaluationForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.evaluationform',
				
	bodyPadding: 8,
	
	defaults: {
		labelWidth: 140
	},
	
	items: [{
		xtype: 'checkbox',
		name: 'external',
		fieldLabel: 'External'
	}, {
		xtype: 'checkbox',
		name: 'process',
		fieldLabel: 'Process Optimisation'
	}, {
		xtype: 'checkbox',
		name: 'resource',
		fieldLabel: 'Resource Optimisation'
	}, {
		xtype: 'checkbox',
		name: 'accountType',
		fieldLabel: 'Account Type'
	}, {
		xtype: 'checkbox',
		name: 'positionType',
		fieldLabel: 'Position Type'
	}, {
		xtype: 'checkbox',
		name: 'positionRisk',
		fieldLabel: 'Unadjusted Risk'
	}, {
		xtype: 'button',
		text: 'Select All',
		action: 'selectAll'
	}],
	
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		layout: {
			type: 'hbox',
			pack: 'end'
		},
		defaults: {
			padding: '0, 10, 0, 10',
			margin: 2
		},
		items: [{
			xtype: 'button',
			itemId: 'submitButton',
			text: 'Apply',
			disabled: true // Start disabled
		}]
	}]
});

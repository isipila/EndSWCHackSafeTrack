Ext.define('Rat.view.system.DataManagement', {
	extend: 'Ext.container.Container',
	alias: 'widget.datamanagement',
	
	requires: [
		'Rat.view.system.FileUploadForm',
		'Rat.view.system.DataUrlForm',
		'Rat.view.system.EvaluationForm'
	],
	
	layout: {
		type: 'vbox',
		align: 'left'
	},
		
	overflowY: 'auto',
	
	defaults: {
		width: 480,
		padding: '0, 0, 8, 0'
	},
	
	items: [{
		xtype: 'dataurlform',
		title: 'Full Database Reset',
		url: url('api.system/resetDB')
	}, {
		xtype: 'dataurlform',
		title: 'Configure Test Client',
		url: url('api.system/populateStaticData')
	}, {
		xtype: 'fileuploadform',
		title: 'Event Upload',
		url: url('api.system/events'),
		flags: [{
			xtype: 'checkbox',
			name: 'evaluate',
			fieldLabel: 'Evaluate on Upload'
		}]
	}, {
		xtype: 'dataurlform',
		title: 'Generate Positions',
		url: url('api.system/regeneratePositions'),
		flags: [{
			xtype: 'checkbox',
			name: 'evaluate',
			fieldLabel: 'Evaluate on Creation'
		}]
	}, {
		xtype: 'evaluationform',
		title: 'Risk Evaluation',
		url: url('api.system/evaluate')
	}, {
		xtype: 'fileuploadform',
		title: 'Coefficients Upload',
		url: url('api.riskCoefficients')
	}]
});

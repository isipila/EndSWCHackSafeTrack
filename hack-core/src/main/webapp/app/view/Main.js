Ext.define('Rat.view.Main', {
    extend: 'Ext.container.Container',
	alias: 'widget.main',
	
	requires: [
		'Rat.view.dashboard.Dashboard',
        'Rat.view.event.Event',
		'Rat.view.event.EventSearch',
        'Rat.view.event.EvaluationFailureGrid',
		'Rat.view.configuration.ClientConfiguration',
		'Rat.view.system.DataManagement',
        'Rat.view.system.AccountList',
        'Rat.view.system.Audit',
		'Rat.view.system.Coefficients'
	],
	
	layout: {
		type: 'card',
		deferredRender: true
	},
	
	items: [{
		xtype: 'dashboard',
		id: 'dashboardPanel'
	}, {
		xtype: 'eventview',
		id: 'eventPanel'
	}, {
		xtype: 'eventsearch',
		id: 'eventSearchPanel'
	}, {
		xtype: 'evaluationfailuregrid',
		id: 'evaluationFailurePanel'
	}, {
		xtype: 'clientconfiguration',
		id: 'clientSetupPanel'
	}, {
		xtype: 'datamanagement',
		id: 'dataManagementPanel'
	}, {
        xtype: 'accountlist',
        id: 'accountListPanel'
	}, {
        xtype: 'audit',
        id: 'auditPanel'
    }, {
		xtype: 'coefficients',
		id: 'riskCoefficientsPanel'
	}]
});
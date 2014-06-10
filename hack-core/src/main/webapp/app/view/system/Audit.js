Ext.define('Rat.view.system.Audit', {
	extend: 'Ext.container.Container',
	alias: 'widget.audit',
	title: 'Audit Trail',

	requires: [
		'Rat.view.system.AuditGrid',
		'Rat.view.system.AuditDetailPanel'
	],
	
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	
	items: [{
		xtype: 'auditgrid',
		margin: '0, 4, 0, 0',
		flex: 1
	}, {
		xtype: 'auditdetailpanel',
		margin: '0, 0, 0, 4',
		flex: 1
	}]
});
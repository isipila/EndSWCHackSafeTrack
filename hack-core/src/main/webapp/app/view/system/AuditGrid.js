Ext.define('Rat.view.system.AuditGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.auditgrid',
	title: 'Audit Trail',
	
	store: 'system.Audit',
	
	hideHeaders: true,
	
	columns: [{
		text: 'Time Stamp',
		flex: 1,
		dataIndex: 'timeStamp'
	}, {
		text: 'Entry',
		flex: 1,
		dataIndex: 'text'
    }] 
});
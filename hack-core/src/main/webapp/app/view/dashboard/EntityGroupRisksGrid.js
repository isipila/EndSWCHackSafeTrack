Ext.define('Rat.view.dashboard.EntityGroupRisksGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.entitygrouprisksgrid',
	title: 'Risk by Entity Group',
	
	store: 'risk.EntityGroupRisks',
	
	columns: [{
		text: 'Entity Group',
		flex: 1,
		dataIndex: 'item',
		renderer: Rat.view.Renderer.entityGroup
	}, {
		header: 'Risk',
		dataIndex: 'riskValue',
		flex: 2,
		renderer: function(value, meta, record) {
			//return value;
			return record.data['riskCurrency'] + ' ' + Ext.util.Format.number(value, '0,000.00');
		}
	}, {
		type: 'numbercolumn',
		text: 'Events',
		flex: 1,
		dataIndex: 'eventCount',
		format: '0,000'
    }]
});

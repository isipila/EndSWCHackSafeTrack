Ext.define('Rat.view.dashboard.EntityRisksGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.entityrisksgrid',
	title: 'Risk by Entity',
	
	store: 'risk.EntityRisks',
	
	columns: [{
		text: 'Entity',
		flex: 1,
		dataIndex: 'item',
		renderer: Rat.view.Renderer.entity
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

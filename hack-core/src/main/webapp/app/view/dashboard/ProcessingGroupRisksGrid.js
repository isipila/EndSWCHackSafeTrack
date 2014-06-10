Ext.define('Rat.view.dashboard.ProcessingGroupRisksGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.processinggrouprisksgrid',
	title: 'Risk by Processing Group',
	
	store: 'risk.ProcessingGroupRisks',
	
	columns: [{
		text: 'Processing Group',
		flex: 1,
		dataIndex: 'item',
		renderer: Rat.view.Renderer.processingGroup
	}, {
		header: 'Risk',
		dataIndex: 'riskValue',
		flex: 2,
		renderer: function(value, meta, record) {
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

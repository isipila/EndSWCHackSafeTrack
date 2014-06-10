Ext.define('Rat.view.dashboard.EventTypeRisksGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.eventtyperisksgrid',
	title: 'Risk by Event Type',
	
	store: 'risk.EventTypeRisks',
	
	columns: [{
		text: 'Event Type',
		flex: 1,
		dataIndex: 'item',
		renderer: Rat.view.Renderer.eventType
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

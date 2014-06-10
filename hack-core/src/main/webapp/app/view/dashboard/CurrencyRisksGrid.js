Ext.define('Rat.view.dashboard.CurrencyRisksGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.currencyrisksgrid',
	title: 'Risk by Currency',
	
	store: 'risk.EventCurrencyRisks',
	
	columns: [{
		text: 'Event Currency',
		flex: 1,
		dataIndex: 'item',
		renderer: Rat.view.Renderer.currency
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

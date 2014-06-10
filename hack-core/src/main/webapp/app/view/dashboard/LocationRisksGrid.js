Ext.define('Rat.view.dashboard.LocationRisksGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.locationrisksgrid',
	title: 'Risk by Location',
	
	store: 'risk.LocationRisks',
	
	columns: [{
		text: 'Location',
		flex: 1,
		dataIndex: 'item',
		renderer: Rat.view.Renderer.location
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

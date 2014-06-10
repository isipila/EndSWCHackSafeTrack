Ext.define('Rat.view.dashboard.CountryRisksGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.countryrisksgrid',
	title: 'Risk by Country of Issue',
	
	store: 'risk.CountryOfIssueRisks',
	
	columns: [{
		text: 'Country of Issue',
		flex: 1,
		dataIndex: 'item',
		renderer: Rat.view.Renderer.country
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

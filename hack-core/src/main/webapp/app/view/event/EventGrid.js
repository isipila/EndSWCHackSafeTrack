Ext.define('Rat.view.event.EventGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.eventgrid',

	store: 'risk.Events',
	
	stateful: true,
	stateEvents: ['columnresize', 'columnmove', 'columnhide', 'columnshow'],
	
	emptyText: 'No Events Found',
	
	columns: [{
		text: 'Event Type',
		dataIndex: 'eventType'
	}, {
		text: 'Security',
		dataIndex: 'securityId',
		renderer: function(value, meta, record) {
			return value + ' (' + record.data['securityDescription'] + ')';
		}
	}, {
		xtype: 'numbercolumn',
		text: 'Total Position',
		dataIndex: 'totalPosition',
		format: '0,000'
	}, {
		xtype: 'numbercolumn',
		text: 'Unadjusted Risk Per Share',
		dataIndex: 'riskPerShare',
		format: '0,000.######'
	}, {
		xtype: 'datecolumn', 
		text: 'Risk Realisation Date',
		dataIndex: 'riskRealisationDate',
		format: 'd/m/Y'
	}, {
		text: 'Country of Issue',
		dataIndex: 'countryOfIssue'
	}, {
		header: 'Total Risk',
		dataIndex: 'totalRiskInSecurityCurrency',
		renderer: function(value, meta, record) {
			//return value;
			return record.data['securityCurrency'] + ' ' + Ext.util.Format.number(value, '0,000.00');
		}
	}, {
		header: 'Total Risk',
		dataIndex: 'totalRiskInBaseCurrency',
		renderer: function(value, meta, record) {
			//return value;
			return 'GBP ' + Ext.util.Format.number(value, '0,000.00');
		}
    }]
});

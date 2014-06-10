Ext.define('Rat.view.event.EvaluationFailureGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.evaluationfailuregrid',

	title: 'Evaluation Failures',
	
	store: 'risk.EvaluationFailures',
	
	
	features: [{
		ftype: 'grouping',
		
		groupHeaderTpl: new Ext.XTemplate('Reason: {name:this.formatReason}', {
			formatReason: Rat.view.Renderer.evaluationFailureReason
		})
	}],
		
	columns: [{
		text: 'Reason',
		flex: 2,
		dataIndex: 'reason',
		renderer: Rat.view.Renderer.evaluationFailureReason
	}, {
		text: 'Event ID',
		flex: 1,
		dataIndex: 'eventId'
	}, {
		text: 'Event Type',
		flex: 1,
		dataIndex: 'eventType'
	}, {
		text: 'Security',
		flex: 2,
		dataIndex: 'securityIdentifier',
		renderer: function(value, meta, record) {
			return value + ' (' + record.data['securityDescription'] + ')';
		}
	}, {
		xtype: 'numbercolumn',
		text: 'Unadjusted Risk Per Share',
		flex: 1,
		dataIndex: 'riskPerShare',
		format: '0,000.######'
	}, {
		xtype: 'datecolumn', 
		text: 'Risk Realisation Date',
		flex: 1,
		dataIndex: 'riskRealisationDate',
		format: 'd/m/Y'
	}, {
		text: 'Country of Issue',
		flex: 1,
		dataIndex: 'countryOfIssue'
    }]
});

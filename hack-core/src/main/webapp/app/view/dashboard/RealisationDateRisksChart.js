Ext.define('Rat.view.dashboard.RealisationDateRisksChart', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.realisationdateriskschart',
	store: 'risk.EventTypeRisks',
	legend: {
		position: 'right'
	},
	axes: [{
		type: 'Numeric',
		position: 'left',
		fields: ['riskValue'],
		minimum: 0,
		label: {
			renderer: function(value) {
				if (value > 1000000000) {
					return (value / 1000000000) + 'b';
				} else if (value > 1000000) {
					return (value / 1000000) + 'm';
				} else if (value > 1000) {
					return (value / 1000) + 'k';
				} else {
					return value;
				}
			}
		},
		title: 'Risk'
	}, {
		type: 'Category',
		position: 'bottom',
		fields: ['item'],
//		label: {
//			renderer: Ext.util.Format.dateRenderer('d M')
//		},
		title: 'Event Type'
	}],
	series: [{
		type: 'column',
		axis: 'left',
		xField: 'item',
		yField: ['riskValue']
	}]
});
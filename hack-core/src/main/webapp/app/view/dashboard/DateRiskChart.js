Ext.define('Rat.view.dashboard.DateRiskChart', {
	extend: 'Ext.chart.Chart',
	alias: 'widget.dateriskchart',

	config: {
		seriesKeys: null
	},
	
	legend: {
		position: 'right'
	},
	
	theme: 'Blue',
	
	initComponent: function() {
		this.axes = [{
			type: 'Numeric',
			position: 'left',
			minimum: 0,
			fields: this.getSeriesKeys(),
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
			label: {
				renderer: Ext.util.Format.dateRenderer('d M')
			},
			title: 'Date'
		}];
		
		this.series = [{
			type: 'column',
			axis: 'left',
			xField: 'item',
			yField: this.getSeriesKeys()
		}];
		
		this.callParent();
	}
});
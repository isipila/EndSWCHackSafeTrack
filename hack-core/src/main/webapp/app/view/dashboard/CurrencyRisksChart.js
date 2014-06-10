Ext.define('Rat.view.RiskByCurrency', {
	extend: 'Ext.container.Container',
	alias: 'widget.riskbycurrency',
	title: 'Risk by Currency',
	
	layout: 'border',

	items: [{
		xtype: 'currencyriskgrid',
		region: 'west',
		flex: 1,
		layout: 'fit',
		margin: '0, 8, 0, 0',
		border: true
	}, {
		xtype: 'panel',
		region: 'center',
		title: 'Chart',
		layout: 'fit',
		items: [{
			xtype: 'chart',
			region: 'center',
			animate: true,
			shadow: true,
			background: '#FFFFFF',
			store: 'risk.EventCurrencyRisks',
			theme: 'Blue',
			axes: [{
				type: 'Numeric',
				position: 'bottom',
				fields: ['risk'],
				title: 'Risk',
				grid: true,
				label: {
					renderer: function(v) {
						return (v / 1000) + 'k';
					}
				},
				minimum: 0
			}, {
				type: 'Category',
				position: 'left',
				fields: ['currency']
			}],
			series: [{
				type: 'bar',
				axis: 'bottom',
				highlight: true,
				xField: 'currency',
				yField: ['risk']
			}]
		}]
	}]
});

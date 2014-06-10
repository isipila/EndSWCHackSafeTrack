Ext.define('Rat.view.event.PositionGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.positiongrid',

	title: 'Positions',
	
	stateful: true,
	stateEvents: ['columnresize', 'columnmove', 'columnhide', 'columnshow'],
	
	store: 'risk.Positions',
	
	columns: [{
		dataIndex: 'accountNumber',
		text: 'Account Number'
	}, {
		dataIndex: 'accountName',
		text: 'Account Name'
    }, {
        dataIndex: 'accountType',
		text: 'Account Type'
    }, {
		xtype: 'numbercolumn',
		dataIndex: 'size',
		text: 'Size',
		renderer: function(value) {
			// Bug in ext-js 4.2 with formatting negative numbers
			if (value < 0) {
				return '-' + Ext.util.Format.number(value * -1, '0,000');
			} else {
				return Ext.util.Format.number(value, '0,000');
			}
		}
    }, {
        dataIndex: 'positionType',
		text: 'Type'
    }, {
        dataIndex: 'entity',
		text: 'Entity'
    }, {
        dataIndex: 'processingGroup',
		text: 'Processing Group',
		renderer: Rat.view.Renderer.processingGroup
    }, {
        dataIndex: 'location',
		text: 'Location'
    },{
		xtype: 'numbercolumn',
        dataIndex: 'riskValue',
		text: 'Risk',
		renderer: function(value, meta, record) {
			return record.data['riskCurrency'] + ' ' + Ext.util.Format.number(value, '0,000.00');
		}
    }, {
		xtype: 'numbercolumn',
        dataIndex: 'riskValueInBaseCurrency',
		text: 'Risk in Base Currency',
		renderer: function(value, meta, record) {
			return 'GBP' + ' ' + Ext.util.Format.number(value, '0,000.00');
		}
    }, {
		xtype: 'numbercolumn',
        dataIndex: 'positionTypeAdjustment',
		text: 'Position Type Factor',
        renderer: Rat.view.Renderer.riskPercentage
    }, {
		xtype: 'numbercolumn',
        dataIndex: 'accountTypeAdjustment',
		text: 'Account Type Factor',
        renderer: Rat.view.Renderer.riskPercentage
    }, {
		xtype: 'numbercolumn',
        dataIndex: 'resourceAdjustment',
		text: 'Resource Factor',
        renderer: Rat.view.Renderer.riskPercentage
    }, {
		xtype: 'numbercolumn',
        dataIndex: 'processAdjustment',
		text: 'Processing Factor',
        renderer: Rat.view.Renderer.riskPercentage
    }]
});

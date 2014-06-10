Ext.define('Rat.view.event.CorporateActionOptionPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.optionpanel',

	config: {
		optionalFields: null
	},
	
	header: {
		border: 0,
		cls: 'sub-panel-header'
	},
	
    layout: {
		type: 'vbox',
		align: 'stretch'
	},

	border: false,
	bodyBorder: false,

	defaults: {
		labelWidth: 160
	},

	items: [{
		xtype: 'datefield',
		itemId : 'paymentDate',
		fieldLabel: 'Payment Date',
		format: 'd-m-Y',
		readOnly: true,
		hidden: true
	}, {
		xtype: 'datefield',
		itemId : 'earlyPaymentDate',
		fieldLabel: 'Early Payment Date',
		format: 'd-m-Y',
		readOnly: true,
		hidden: true
	}, {
		xtype: 'textfield',
		itemId : 'rate',
		fieldLabel: 'Rate',
		readOnly: true,
		hidden: true
	}, {
		xtype: 'textfield',
		itemId : 'amount',
		fieldLabel: 'Amount',
		readOnly: true,
		hidden: true		
	}, {
		xtype: 'textfield',
		itemId : 'newShares',
		fieldLabel: 'New Shares',
		readOnly: true,
		hidden: true		
	}, {
		xtype: 'textfield',
		itemId : 'oldShares',
		fieldLabel: 'Old Shares',
		readOnly: true,
		hidden: true		
	}, {
		xtype: 'datefield',
		itemId : 'marketDeadline',
		fieldLabel: 'Market Deadline',
		format: 'd-m-Y',
		readOnly: true,
		hidden: true		
	}],

	populate: function(actionOption) {
		this.setField(this.down('#paymentDate'), this.movementValue(actionOption, 'paymentDate'));
		this.setField(this.down('#earlyPaymentDate'), this.movementValue(actionOption, 'earlyPaymentDate'));
		this.setField(this.down('#rate'), this.movementValue(actionOption, 'cashRate'));
		this.setField(this.down('#amount'), this.movementValue(actionOption, 'cashValue'), this.cashRenderer);
		this.setField(this.down('#newShares'), this.movementValue(actionOption, 'newShares'));
		this.setField(this.down('#oldShares'), this.movementValue(actionOption, 'oldShares'));
		this.setField(this.down('#marketDeadline'), actionOption.marketDeadline);
	},
	
	setField: function(field, value, renderer) {
		//field.setVisible(this.getOptionalFields() && this.getOptionalFields()[field.name]);
		if (value) {
			field.setValue(renderer ? renderer(value) : value);
			field.setVisible(true);
		}
	},
	
	cashRenderer: function(cash) {
		return cash.currency + ' ' + Ext.util.Format.number(cash.amount, '0,000.00');
	},
	
	movementValue: function(option, name) {
		for (var i = 0; i < option.movements.length; i++) {
			if (option.movements[i][name]) {
				return option.movements[i][name];
			}
		}
		return null;
	}
});
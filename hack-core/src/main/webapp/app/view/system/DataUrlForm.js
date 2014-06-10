Ext.define('Rat.view.system.DataUrlForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.dataurlform',
				
	bodyPadding: 8,
	
	config: {
		flags: []
	},
	
	defaults: {
		labelWidth: 140
	},
	
	items: [{
		xtype: 'hiddenfield',
        name: 'resetKey'
	}, {
        xtype: 'checkbox',
		itemId: 'confirmationCheckbox',
		fieldLabel: 'Confirm change',
	}],
	
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		layout: {
			type: 'hbox',
			pack: 'end'
		},
		defaults: {
			padding: '0, 10, 0, 10',
			margin: 2
		},
		items: [{
			xtype: 'button',
			itemId: 'submitButton',
			text: 'Apply',
			disabled: true // Start disabled
		}]
	}],
	
	initComponent: function() {
		this.callParent();
		
		this.add(this.getFlags());
	}
});

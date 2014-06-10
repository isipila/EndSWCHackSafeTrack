Ext.define('Rat.view.system.FileUploadForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.fileuploadform',
	
	bodyPadding: 8,
	
	config: {
		flags: []
	},
	
	defaults: {
		labelWidth: 140
	},
	
	items: [{
		xtype: 'filefield',
		fieldLabel: 'Select file',
        name: 'file',
		allowBlank: false,
		anchor: '100%'
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
			disabled: true, // Start disabled
			formBind: true //only enabled once the form is valid
		}]
	}],
	
	initComponent: function() {
		this.callParent();
		
		this.add(this.getFlags());
	}
});

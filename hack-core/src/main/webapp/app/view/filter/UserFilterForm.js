Ext.define('Rat.view.filter.UserFilterForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.userfilterform',

    title: 'Save Filter',

    floating: true,
	draggable: true,
	width: 350,

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	items: [{
		xtype: 'form',
		
		margin: 8,
		
		defaults: {
			margin: 8,
			anchor: '100%',
			labelWidth: 140
		},
		
		items: [{
			xtype: 'textfield',
			name : 'name',
			fieldLabel: 'Name'
		}, {
			xtype: 'hiddenfield',
			name : 'content',
			fieldLanel: 'Test'
		}]
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
			text: 'Save',
			action: 'saveUserFilter'
		}, {
			text: 'Cancel',
			action: 'cancelUserFilterForm'
		}]
	}]
});
Ext.define('Rat.view.configuration.ProcessingGroupForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.processinggroupform',

    title: 'Edit Processing Group',

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
			xtype: 'combo',
			name : 'locationCode',
			fieldLabel: 'Location',
			store: 'static.Locations',
            queryMode: 'local',
			valueField: 'code',
			displayField: 'name',
			forceSelection: true
		}, {
			xtype: 'numberfield',
			name : 'processOptimisation',
			fieldLabel: 'Process Optimisation'
		}, {
			xtype: 'numberfield',
			name : 'resourceOptimisation',
			fieldLabel: 'Resource Optimisation'
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
			action: 'saveProcessingGroup'
		}, {
			text: 'Cancel',
			action: 'cancelProcessingGroupForm'
		}]
	}]
});
Ext.define('Rat.view.configuration.EventCategoryForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.eventcategoryform',
	
    title: 'Edit Event Category',

    floating: true,
	draggable: true,
	width: 350,

	layout: 'fit',

	items: [{
		xtype: 'form',
		
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		
		margin: 8,
		
		defaults: {
			margin: '0, 8, 8, 8',
			labelWidth: 140
		},
		
		items: [{
			xtype: 'textfield',
			name : 'name',
			fieldLabel: 'Name',
			margin: 8
		}, {
			xtype: 'label',
			text: 'Event Types'
		}, {
			xtype: 'grid',
			store: 'static.EventTypes',
			itemId: 'eventTypesGrid',
			height: 300,
			
			selModel: {
				type: 'rowmodel',
				mode: 'SIMPLE'
			},
			
			columns: [{
				text: 'Event Type',
				dataIndex: 'code',
				flex: 1
			}, {
				text: 'Description',
				flex: 2,
				dataIndex: 'name'
			}]
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
			action: 'saveEventCategory'
		}, {
			text: 'Cancel',
			action: 'cancelEventCategoryForm'
		}]
	}],
	
	loadRecord: function(record) {
		this.down('form').loadRecord(record);
		var grid = this.down('#eventTypesGrid');
		var codes = record.get('eventTypes');
		var models = [];
		for (var i = 0; i < codes.length; i++) {
			var index = grid.getStore().findExact('code', codes[i]);
			models.push(grid.getStore().getAt(index));
		}
		grid.getSelectionModel().select(models);
	},
	
	getValues: function() {
		var values = this.down('form').getValues();
		var models = this.down('#eventTypesGrid').getSelectionModel().getSelection();
		var codes = [];
		for (var i = 0; i < models.length; i++) {
			codes.push(models[i].get('code'));
		}
		values.eventTypes = codes;
		return values;
	}
});
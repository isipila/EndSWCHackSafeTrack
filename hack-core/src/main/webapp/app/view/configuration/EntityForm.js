Ext.define('Rat.view.configuration.EntityForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.entityform',
	
    title: 'Edit Entity',

    floating: true,
	draggable: true,
	width: 640,

	layout: 'fit',

	config: {
		codeReadOnly: true
	},
	
	items: [{
		xtype: 'form',
		
		margin: 8,
		
		defaults: {
			margin: 8,
			anchor: '50%',
			labelWidth: 140
		},
		
		items: [{
			xtype: 'textfield',
			itemId: 'codeField',
			name : 'code',
			fieldLabel: 'Code',
			readOnly: true
		}, {
			xtype: 'textfield',
			name : 'name',
			fieldLabel: 'Name'
		}, {
			xtype: 'numberfield',
			name : 'processOptimisation',
			fieldLabel: 'Process Optimisation'
		}, {
			xtype: 'numberfield',
			name : 'resourceOptimisation',
			fieldLabel: 'Resource Optimisation'
		}, {
			xtype: 'container',
			anchor: '100%',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'label',
				text: 'Process Mapping Rules',
				margin: '8, 0, 8, 0'
			}, {
				xtype: 'grid',
				itemId: 'mappingRulesGrid',
				
				plugins: [
					Ext.create('Ext.grid.plugin.CellEditing', {
						clicksToEdit: 1
					})
				],
				
				dockedItems: [{
					xtype: 'toolbar',
					dock: 'top',
					defaults: {
						margin: 1
					},
					items: [{
						text: 'Add Rule', 
						xtype: 'button',
						action: 'addMappingRule'
					}, {
						text: 'Remove Rule',
						xtype: 'button',
						action: 'removeMappingRule',
						disabled: true
					}, {
						text: 'Move Up',
						xtype: 'button',
						action: 'moveMappingRuleUp',
						disabled: true
					}, {
						text: 'Move Down',
						xtype: 'button',
						action: 'moveMappingRuleDown',
						disabled: true
					}]
				}],
		
				columns: [{
					text: 'Sequence',
					dataIndex: 'sequence',
					flex: 1
				}, {
					text: 'Event Category',
					flex: 1,
					dataIndex: 'eventCategoryCode',
					renderer: Rat.view.Renderer.eventCategory,
					editor: {
						xtype: 'combo',
						store: 'static.EventCategories',
						queryMode: 'local',
						valueField: 'code',
						displayField: 'name',
						forceSelection: false
					}
				}, {
					text: 'Country',
					flex: 1,
					dataIndex: 'countryCode',
					editor: {
						xtype: 'combo',
						store: 'static.Countries',
						queryMode: 'local',
						valueField: 'code',
						displayField: 'code',
						forceSelection: false,
						listConfig: {
							getInnerTpl: function() {
								return '<div data-qtip="{code} - {name}">{code}</div>';
							}
						}
					}
				}, {
					text: 'Currency',
					flex: 1,
					dataIndex: 'currencyCode',
					editor: {
						xtype: 'combo',
						store: 'static.Currencies',
						queryMode: 'local',
						valueField: 'code',
						displayField: 'code',
						forceSelection: false,
						listConfig: {
							getInnerTpl: function() {
								return '<div data-qtip="{code} - {name}">{code}</div>';
							}
						}
					}
				}, {
					text: 'Option Type',
					flex: 1,
					dataIndex: 'eventOptionType',
					renderer: Rat.view.Renderer.optionType,
					editor: {
						xtype: 'combo',
						store: 'static.OptionTypes',
						queryMode: 'local',
						valueField: 'code',
						displayField: 'name',
						forceSelection: false
					}
				}, {
					text: 'Processing Group',
					flex: 2,
					dataIndex: 'processingGroupCode',
					renderer: Rat.view.Renderer.processingGroup,
					editor: {
						xtype: 'combo',
						store: 'static.ProcessingGroups',
						queryMode: 'local',
						valueField: 'code',
						displayField: 'name',
						forceSelection: true
					}
				}]
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
			action: 'saveEntity'
		}, {
			text: 'Cancel',
			action: 'cancelEntityForm'
		}]
	}],
	
	initComponent: function() {
		this.callParent();
		this.down('#codeField').setReadOnly(this.getCodeReadOnly());
	}
});
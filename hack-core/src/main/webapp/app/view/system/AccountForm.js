Ext.define('Rat.view.system.AccountForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.accountform',

    title: 'Edit User Account',

	config: { isNewAccount: null },

	requires: [ 'Rat.view.filter.FilterValuesList' ],
	
    floating: true,
	draggable: true,
	width: 350,

	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	items: [{
		xtype: 'panel',
		
		margin: 8,
		
		defaults: {
			margin: 8,
			width: 318
		},
		
		items: [{
			xtype: 'textfield',
			name : 'username',
			itemId: 'username',
			fieldLabel: 'Username',
			allowBlank: false,
			readOnly: true,
		}, {
			xtype: 'textfield',
			name : 'fullName',
			fieldLabel: 'Fullname',
		}, {
			xtype: 'combo',
			name : 'roles',
			itemId: 'roles',
			fieldLabel: 'Roles',
			store: 'system.Roles',
            multiSelect: true,
			queryMode: 'local',
			valueField: 'code',
			displayField: 'name',
			forceSelection: true,
		}, {
			xtype: 'combo',
			name : 'location',
			fieldLabel: 'Location',
			store: 'static.Locations',
			queryMode: 'local',
			valueField: 'code',
			displayField: 'name',
			forceSelection: true,
		}, {
            xtype: 'checkboxfield',
			valueField: 'enabled',
            name: 'enabled',
            fieldLabel: 'Enabled'
        }]
	}, {
		xtype: 'panel',
		
		margin: '0, 8, 8, 8',
		defaults: {
			margin: 8,
			width: 318
		},
		
		items: [{
			xtype: 'textfield',
			itemId: 'password',
			fieldLabel: 'Password',
			name: 'password',
			inputType: 'password',
			validator: function(value) {
				return this.up('form').getIsNewAccount() && (!value || value === '') ? 'Password must be set' : true;
			}
		}, {
			xtype: 'textfield',
			itemId: 'confirmpasswprd',
			fieldLabel: 'Confirm Password',
			inputType: 'password',
			validator: function(value) {
				var other = this.previousSibling('#password');
				return value !== other.getValue() ? 'Passwords do not match' : true;
			}
		}]
	}, {
		xtype: 'panel',
		itemId: 'filters',
		margin: '0, 8, 8, 8',
		
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		
		items: [{
			xtype: 'container',
			layout: 'column',
			defaults: {
				xtype: 'container',
				margin: 8,
				defaults: {
					margin: '0, 0, 8, 0'
				}
			},
			
			items: [{
				itemId: 'filterColumn1',
				columnWidth: 0.49,
				items: [{
					xtype: 'filtervalueslist',
					title: 'Regions',
					itemId: 'entityGroupIn',
					store: 'static.EntityGroups',
					renderer: Rat.view.Renderer.entityGroup
				}, {
					xtype: 'filtervalueslist',
					title: 'Entities',
					itemId: 'entityIn',
					store: 'static.Entities',
					renderer: Rat.view.Renderer.entity
				}, {
					xtype: 'filtervalueslist',
					title: 'Processing Groups',
					itemId: 'processingGroupIn',
					store: 'static.ProcessingGroups',
					renderer: Rat.view.Renderer.processingGroup
				}, {
					xtype: 'filtervalueslist',
					title: 'Locations',
					itemId: 'locationIn',
					store: 'static.Locations',
					renderer: Rat.view.Renderer.location
				}, {
					xtype: 'filtervalueslist',
					title: 'Event Types',
					itemId: 'eventTypeIn',
					store: 'static.EventTypes',
					renderer: Rat.view.Renderer.eventType
				}, {
					xtype: 'filtervalueslist',
					title: 'Countries',
					itemId: 'countryOfIssueIn',
					store: 'static.Countries',
					renderer: Rat.view.Renderer.country
				}, {
					xtype: 'filtervalueslist',
					title: 'Currencies',
					itemId: 'eventCurrencyIn',
					store: 'static.Currencies',
					renderer: Rat.view.Renderer.currency
				}]
			}, {
				itemId: 'filterColumn2',
				columnWidth: 0.49,
				items: []
			}]
		}, {
			xtype: 'container',
			layout: {
				type: 'hbox',
				pack: 'end'
			},
			items: [{
				xtype: 'button',
				text: 'Edit Account Filters...',
				action: 'editAccountFilters',
				padding: '0, 10, 0, 10',
				margin: 8
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
			action: 'saveAccount'
		}, {
			text: 'Cancel',
			action: 'cancelAccountForm'
		}]
	}],

	populateFilterSummary: function(filterRule) {
		var filterPanel = this.down('#filters');
		
		// Hide them all
		var panels = filterPanel.query('filtervalueslist');
		for (var i = 0; i < panels.length; i++) {
			panels[i].clear();
		}
		
		// Populate the ones with content
		var columnLengths = {
			filterColumn1: 0, 
			filterColumn2: 0
		};
		var parameters = filterRule ? filterRule.split('&') : [];
		for  (var i = 0; i < parameters.length; i++) {
			var nameValue = parameters[i].split('=');
			var filterList = filterPanel.down('#' + nameValue[0]);
			if (filterList) {
				var values = nameValue[1].split(',');
				var targetColumn = columnLengths.filterColumn1 > columnLengths.filterColumn2 ? 'filterColumn2' : 'filterColumn1';
				var currentColumn = filterList.up('container').getItemId();
				
				if (targetColumn !== currentColumn) {
					filterPanel.down('#' + currentColumn).remove(filterList, false);
					filterPanel.down('#' + targetColumn).add(filterList);
				}
				
				filterList.setFilterValue(values);
				columnLengths[targetColumn] += values.length;
			}
		}
	},
	
	loadRecord: function(record) {
		this.getForm().loadRecord(record);
		this.populateFilterSummary(record.get('filterRule'));		
	},
	
	initComponent: function() {
		this.callParent();		
		this.down('#username').setReadOnly(!this.getIsNewAccount());
	}
});
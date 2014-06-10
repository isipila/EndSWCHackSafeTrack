Ext.define('Rat.view.Navigation', {
	extend: 'Ext.container.Container',
	alias: 'widget.navigation',
	
	width: 200,
	
	layout: 'border',
		 
    requires: [
        'Rat.view.filter.ActiveRiskFilterPanel'
    ],

	defaults: {
		xtype: 'menu',
		floating: false,
		collapsible: true,
		animCollapse: false,
		margins: '0, 0, 8, 0'
	},
	
	itemId: 'riskInquiryMenu',
	
	items: [{
		title: 'Risk Inquiry',
		region: 'north',
		items: [{
			xtype: 'menuitem',
			itemId: 'dashboard',
			navigationTarget: { location: 'dashboard' },
			text: 'Dashboard',
			icon: 'resources/icons/dashboard.ico'
		}, {
			xtype: 'menuitem',
			itemId: 'event',
			navigationTarget: { location: 'event' },
			text: 'Event Details',
			icon: 'resources/icons/cal.png'
		}, {
			xtype: 'menuitem',
			itemId: 'eventSearch',
			navigationTarget: { location: 'eventSearch' },
			text: 'Event Search',
			icon: 'resources/icons/search.gif'
		}, {
			xtype: 'menuitem',
			itemId: 'evaluationFailure',
			navigationTarget: { location: 'evaluationFailure' },
			text: 'Evaluation Failures',
			icon: 'resources/icons/exclamation.png'
		}]
	}, {
		title: 'User Filters',
		region: 'north',
		itemId: 'userFilterMenu'
	}, {
		xtype: 'activeriskfilterpanel',
		title: 'Active Filters',
		itemId: 'activeRiskFilters',
		region: 'center',
		overflowY: 'auto'
	}, {
		title: 'Scenarios',
		region: 'south',
		collapsed: true,
		items: [{
			xtype: 'menuitem',
			navigationTarget: { location: 'scenario1' },
			text: 'Scenario 1',
			icon: 'resources/icons/scenario.gif'
		}, {
			xtype: 'menuitem',
			navigationTarget: { location: 'otherScenario' },
			text: 'Other Scenario',
			icon: 'resources/icons/scenario.gif'
		}, {
			xtype: 'menuitem',
			navigationTarget: { location: 'newScenario' },
			text: 'New Scenario',
			icon: 'resources/icons/scenario-add.gif'
		}]
	}, {
		title: 'System',
		region: 'south',
		collapsed: true,
		margins: 0,
		items: [{
			xtype: 'menuitem',
			itemId: 'accountList',
			navigationTarget: { location: 'accountList' },
			text: 'Accounts',
			icon: 'resources/icons/people.png'
		}, {
			xtype: 'menuitem',
			itemId: 'audit',
			navigationTarget: { location: 'audit' },
			text: 'Audit',
			icon: 'resources/icons/settings.png'
		}, {
			xtype: 'menuitem',
			itemId: 'clientSetup',
			navigationTarget: { location: 'clientSetup' },
			text: 'Client Setup',
			icon: 'resources/icons/office-building.png'
		}, {
			xtype: 'menuitem',
			itemId: 'riskCoefficients',
			navigationTarget: { location: 'riskCoefficients' },
			text: 'Coefficients',
			icon: 'resources/icons/product.png'
		}, {
			xtype: 'menuitem',
			itemId: 'dataManagement',
			navigationTarget: { location: 'dataManagement' },
			text: 'Data Management',
			icon: 'resources/icons/system.png'
		}]
	}],
	
	loadUserFilters: function(records) {
		var menu = this.down('#userFilterMenu');
		var userFilterItems = menu.query('menuitem[userFilter=true]');
		for (var i = 0; i < userFilterItems.length; i++) {
			menu.remove(userFilterItems[i]);
			userFilterItems[i].destroy();
		}
		
		for (var i = 0; i < records.length; i++) {
			menu.add(Ext.widget('menuitem', {
				text: records[i].get('name'),
				navigationTarget: { location: 'dashboard', queryParameters: records[i].get('content').split('&') },
				icon: 'resources/icons/user-filter.png',
				userFilter: true
			}));
		}
	}
});

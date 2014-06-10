Ext.define('Rat.view.system.AccountList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.accountlist',

    title: 'User Accounts',
	layout: 'fit',
	store: 'system.Accounts',
	
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',
		defaults: {
			margin: 1
		},
		items: [{
			text: 'Add Account', 
			xtype: 'button',
			action: 'addAccount'
		}, {
			text: 'Edit Account',
			xtype: 'button',
			action: 'editAccount',
			disabled: true
		}, {
			text: 'Remove Account',
			xtype: 'button',
			action: 'removeAccount',
			disabled: true
		}]
	}],

	columns: [{
		text: 'Username',
		dataIndex: 'username',
		flex: 1
	},{
		flex: 1,
		text: 'Fullname',
		dataIndex: 'fullName'
	},{
		flex: 1,
		text: 'Enabled?',
		dataIndex: 'enabled'
	},{
		text: 'Roles',
		dataIndex: 'roles',
		flex: 1,
		renderer: Rat.view.Renderer.role
	},{
		text: 'Location',
		dataIndex: 'location',
		flex: 1,
		renderer: Rat.view.Renderer.location
	}],
	
	initComponent: function() {
		this.loadingMask = new Ext.LoadMask(this, {msg:"Loading"});
		this.callParent();
	}
});


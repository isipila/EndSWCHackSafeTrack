Ext.define('Rat.view.system.ActiveUserPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.activeuser',
	
	layout: {
		type: 'hbox',
		align: 'middle',
		pack: 'end'
	},

	initComponent: function() {
		this.items = [{
			xtype: 'button',
			text: Rat.model.system.LoggedInAccount.getFullName(),
			padding: '0, 8, 0, 0',
			border: false,
			style: {
				background: 'transparent'
			},
			menu: {
				xtype: 'menu',
				items: [{
					text: 'Logout',
					itemId: 'logout'
				}]
			}
		}];
		
		this.callParent();
	}
});

Ext.define('Rat.LoaderViewPort', {
	extend: 'Ext.container.Viewport',
	
	config: {
		loginCallback: null
	},
	
	layout: {
		type: 'vbox',
		align: 'center'
	},
	
	defaults: {
		width: 300
	},
	
	items: [ {
		xtype: 'container',
		flex: 1
	}, {
		xtype: 'form',
		title: 'Corporate Actions Risk Management Application',
		url: url('system.login'),
		height: 128,
		width: 300,
		layout: {
			type: 'vbox',
			align: 'center',
			padding: 8
		},
		defaults: {
			xtype: 'textfield',
			allowBlank: false
		},
		items: [{
			fieldLabel: 'User Name',			
			name: 'username'
		}, {
			fieldLabel: 'Password',
			inputType: 'password',
			name: 'password'
		}],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			layout: {
				type: 'hbox',
				pack: 'end'
			},
			
			items: [{
				xtype: 'progressbar',
				hidden: true,
				border: false,
				flex: 1
			}, {
				xtype: 'label',
				text: 'Login Failed',
				itemId: 'failureMessage',
				hidden: true,
				flex: 1
			}, {
				xtype: 'button',
				margin: 2,
				itemId: 'submitButton',
				text: 'Login',
				formBind: true, //only enabled once the form is valid
				handler: function() {
					this.login();
				}
			}]
		}]
	}, {
		xtype: 'container',
		flex: 2
	}],
	
	listeners: {
	    afterRender: function(form, options){
			this.down('textfield[name=username]').focus();
			this.down('#submitButton').on('click', this.login, this);
	        this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {                    
	            enter: this.login,
	            scope: this
	        });			
	    }
	},

	login: function() {
		var viewport = this;
		viewport.down('button').setDisabled(true);
		this.down('form').getForm().submit({
			success: function(form, action) {
				viewport.down('button').setVisible(false);
				viewport.down('#failureMessage').setVisible(false);
				viewport.down('progressbar').setVisible(true);
				viewport.down('progressbar').updateProgress(0, 'Loading');
				viewport.getLoginCallback()();
			},
			failure: function(form, action) {
				viewport.down('#failureMessage').setVisible(true);
				viewport.down('button').setDisabled(false);
			}
		});
	},

	updateProgress: function(value) {
		this.down('progressbar').updateProgress(value, 'Loading', true);
	}
});

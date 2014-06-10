Ext.define('Rat.controller.User', {
    extend: 'Ext.app.Controller',
	
	init: function() {
        this.control({
            'activeuser #logout': { click: this.logout }
        });
    },

	logout: function() {
		var form = Ext.widget('form', {
			url: url('system.logout')
		});
		
		form.getForm().submit({
			success: function(form, action) {
				window.location.replace(window.location.origin);
			},
			failure: function(form, action) {
				Ext.Msg.alert('User Account', 'Logout Unsuccessful');
			}
		});
	}
});
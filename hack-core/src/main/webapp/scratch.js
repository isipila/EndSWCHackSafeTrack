Ext.define('Scratch.LoginViewport', {
	extend: 'Ext.container.Viewport',
	
	padding: 8,
	
	items: [{
		xtype: 'form',
		title: 'Login',
		buttons : [{
			text : 'Login',
			handler : function() {
				Ext.application({
					name: 'Scratch App',
					launch: function() {
						var task = new Ext.util.DelayedTask(function() {
							Ext.create('Scratch.ScreenViewport');
						});
						task.delay(300);
					}
				});		
			}
		}]
	}]
});

Ext.define('Scratch.ScreenViewport', {
	extend: 'Ext.container.Viewport',
	
	padding: 8,
	
	items: [{
		xtype: 'label',
		text: 'progress'
	}, {
		xtype: 'button',
		text: 'long message',
		handler: function() {
			Ext.Msg.alert('Alert', '<div style="overflow: auto;">Line<br />Line<br />Line<br />Line<br />Line<br />Line<br />Line<br />This is a much longer line to see about h scrolling<br />Line<br />Line<br />LineLine<br />Line<br />Line<br />Line</div>');
		}
	}]
});

Ext.application({

    name: 'Scratch Login',
	
    launch: function() {
		Ext.create('Scratch.LoginViewport');
	}
});
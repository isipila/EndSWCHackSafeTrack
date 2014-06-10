
Ext.define('Rat.view.ScreenViewPort', {
    extend: 'Ext.container.Viewport',
    
	requires: [
		'Rat.view.ApplicationBanner', 
		'Rat.view.StatusBar', 
		'Rat.view.Navigation',
		'Rat.view.Main'
	],

	layout: {
        type: 'border'
    },
	
	items: [{
		xtype: 'applicationbanner',
		region: 'north'
	}, {
		xtype: 'statusbar',
		region: 'south'
	}, {
		xtype: 'navigation',
		itemId: 'navigation',
		region: 'west',
		margin: '8, 8, 8, 8'
	}, {
		xtype: 'main',
		itemId: 'mainContent',
		id: 'mainContent',
		region: 'center',
		margin: '8, 8, 8, 0'
	}]
});
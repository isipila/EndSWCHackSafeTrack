Ext.define('Rat.view.event.EventSearch', {
	extend: 'Ext.container.Container',
	alias: 'widget.eventsearch',

	requires: [
		'Rat.view.event.EventGrid'
	],
	
    layout: 'border',

	items: [{
		xtype: 'panel',
		title: 'Event Search',
		region: 'north',
		
		layout: {
			type: 'hbox',
			align: 'top'
		},
		
		defaults: {
			header: {
				border: 0,
				cls: 'sub-panel-header'
			},
	
			margin: 8,
			border: false,
			bodyBorder: false,
			
			defaults: {
				labelWidth: 160
			}
		},
		
		items: [{
			xtype: 'panel',
			title: 'Security',
			items: [{
				xtype: 'combo',
				fieldLabel: 'Identifier Type',
				store: ['Sedol'],
				value: 'Sedol'
			}, {
				xtype: 'textfield',
				fieldLabel: 'Identifier',
				itemId: 'securityIdentifier'
			}]
		}, {
			xtype: 'panel',
			title: 'Event',
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Corporate Action Reference',
				itemId: 'corporateActionReference'
			}, {
				xtype: 'textfield',
				fieldLabel: 'Sender Reference',
				itemId: 'senderReference'
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
				margin: 2
            },
			
			items: [{
				xtype: 'button',
				action: 'search',
				text: 'Search'
			}, {
				xtype: 'button',
				action: 'clear',
				text: 'Clear'
			}]
		}]
	}, {
		xtype: 'eventgrid',
		title: 'Search Results',
		region: 'center',
		stateId: 'eventSearchResults',
		margin: '8, 0, 0, 0',
		store: Ext.create('Rat.store.risk.Events', {
			autoLoad: false
		})
    }]
});
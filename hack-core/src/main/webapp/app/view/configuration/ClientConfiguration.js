var factorRenderer = function(value) {
	return value == 0 ? '' : value;
};

var processFactorValidator = function(value) {
	if (value < 0 || value > 100) {
		return 'Value must be in the range 0 to 100';
	} else {
		return true;
	}
};

var resourceFactorValidator = function(value) {
	if (value < 0 || value > 10) {
		return 'Value must be in the range 0 to 10';
	} else {
		return true;
	}
};

Ext.define('Rat.view.configuration.ClientConfiguration', {
	extend: 'Ext.container.Container',
	alias: 'widget.clientconfiguration',
	
	layout: 'border',
			
	items: [{
		xtype: 'container',
		region: 'west',
		flex: 1,

		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		
		items: [{
			xtype: 'treepanel', 
			title: 'Entities',
			itemId: 'entityTree',
			store: 'static.EntityTree',
			rootVisible: true,
			bodyCls: 'x-tree-noicon',
			flex: 3,
			
			viewConfig: {
				// We don't need this since the tree is not persisted
				markDirty: false
			},
				
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				defaults: {
					margin: 1
				},
				items: [{
					text: 'Add Entity', 
					xtype: 'button',
					action: 'addTreeEntity',
					disabled: true
				}, {
					text: 'Edit Entity',
					xtype: 'button',
					action: 'editTreeEntity',
					disabled: true
				}, {
					text: 'Remove Entity',
					xtype: 'button',
					action: 'removeTreeEntity',
					disabled: true
				}]
			}],
			
			columns: [{
				xtype: 'treecolumn',
				text: 'Entity',
				dataIndex: 'name',
				flex: 2
			}, {
				text: 'Processing Optimisation',
				dataIndex: 'processOptimisation',
				renderer: factorRenderer,
				flex: 1
			}, {
				text: 'Resource Optimisation',
				dataIndex: 'resourceOptimisation',
				renderer: factorRenderer,
				flex: 1
			}]
		}, {
			xtype: 'grid',
			title: 'Event Categories',
			itemId: 'eventCategoriesGrid',
			margin: '8, 0, 0, 0',
			flex: 2,

			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				defaults: {
					margin: 1
				},
				items: [{
					xtype: 'button',
					text: 'Add Category', 
					action: 'addEventCategory'
				}, {
					xtype: 'button',
					text: 'Edit Category',
					action: 'editEventCategory',
					disabled: true
				}, {
					xtype: 'button',
					text: 'Remove Category', 
					action: 'removeEventCategory',
					disabled: true
				}]
			}],

			store: 'static.EventCategories',
			columns: [{
				dataIndex: 'name',
				text: 'Name',
				flex: 1
			}]
		}]
	}, {
		xtype: 'container',
		region: 'center',
		margin: '0, 0, 0, 8',
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		
		items: [{
			xtype: 'grid',
			title: 'Processing Groups',
			itemId: 'processingGroupsGrid',
			flex: 3,
			
			store: 'static.ProcessingGroups',
			
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				defaults: {
					margin: 1
				},
				items: [{
					xtype: 'button',
					text: 'Add Group', 
					action: 'addProcessingGroup'
				}, {
					xtype: 'button',
					text: 'Edit Group',
					action: 'editProcessingGroup',
					disabled: true
				}, {
					xtype: 'button',
					text: 'Remove Group', 
					action: 'removeProcessingGroup',
					disabled: true
				}]
			}],
			
			columns: [{
				text: 'Name',
				flex: 2,
				dataIndex: 'name'
			}, {
				text: 'Processing Optimisation',
				flex: 1,
				dataIndex: 'processOptimisation',
				renderer: factorRenderer
			}, {
				text: 'Resource Optimisation',
				flex: 1,
				dataIndex: 'resourceOptimisation',
				renderer: factorRenderer
			}]
		}, {
			xtype: 'grid',
			title: 'Locations',
			itemId: 'locationsGrid',
			margin: '8, 0, 0, 0',
			flex: 2,
			
			store: 'static.Locations',
			
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				defaults: {
					margin: 1
				},
				items: [{
					xtype: 'button',
					text: 'Add Location', 
					action: 'addLocation'
				}, {
					xtype: 'button',
					text: 'Edit Location', 
					action: 'editLocation',
					disabled: true
				}, {
					xtype: 'button',
					text: 'Remove Location', 
					action: 'removeLocation',
					disabled: true
				}]
			}],
	
			columns: [{
				text: 'Name',
				dataIndex: 'name',
				flex: 2
			}, {
				text: 'Processing Optimisation',
				dataIndex: 'processOptimisation',
				renderer: factorRenderer,
				flex: 1
			}, {
				text: 'Resource Optimisation',
				dataIndex: 'resourceOptimisation',
				renderer: factorRenderer,
				flex: 1
			}]
		}]
	}]
});
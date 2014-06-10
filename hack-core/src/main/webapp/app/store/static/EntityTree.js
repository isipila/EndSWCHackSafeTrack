Ext.define('Rat.store.static.TreeItem', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'name',
		type: 'string'
	}, {
		name: 'processOptimisation',
		type: 'int'
	}, {
		name: 'resourceOptimisation',
		type: 'int'
	}]
});

Ext.define('Rat.store.static.EntityTree', {
    extend: 'Ext.data.TreeStore',

    model: 'Rat.store.static.TreeItem',
    autoLoad: true,
    storeId: 'EntityTree',

	root: {
		name: 'Ibacas Test Client',
		expanded: true,
		children: []
	}
});
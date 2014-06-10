Ext.define('Rat.store.static.OptionTypes', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.static.OptionType',
    autoLoad: true, 
    storeId: 'OptionTypes',

    data: [{	
		code: 'MANDATORY',
		name: 'Mandatory'
	}, {
		code: 'VOLUNTARY',
		name: 'Voluntary'
	}, {
		code: 'CHOICE',
		name: 'Choice'
	}]
});
Ext.define('Rat.model.static.ProcessMappingRule', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'sequence',
        type: 'int'
	}, {
        name: 'processingGroupCode',
        type: 'string'
    }, {
		name: 'eventCategoryCode',
		type: 'string'
	}, {
		name: 'countryCode',
		type: 'string'
	}, {
		name: 'currencyCode',
		type: 'string'
	}, {
		name: 'eventOptionType',
		type: 'string'
	}]
});
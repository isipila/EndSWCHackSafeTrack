Ext.define('Rat.model.filter.UserFilter', {
    extend: 'Ext.data.Model',

    fields: [{
        name: 'code',
        type: 'string'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'content',
        type: 'string'
    }]
});
Ext.define('Rat.model.system.Role', {
    extend: 'Ext.data.Model',
    idProperty: 'name',
    fields: [{
        name: 'code',
        type: 'string'
    },{
        name: 'name',
        type: 'string'
    }]
});
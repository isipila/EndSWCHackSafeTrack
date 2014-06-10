Ext.define('Rat.model.system.Account', {
    extend: 'Ext.data.Model',
    idProperty: 'username',
    fields: [{
        name: 'username',
        type: 'string'
    },{
        name: 'fullName',
        type: 'string'
    },{
        name: 'password',
        type: 'string'
    },{
        name: 'roles',
        type: 'auto'
    },{
        name: 'filterRule',
        type: 'string'
    },{
        name: 'location',
        type: 'string'
    },{
        name: 'enabled',
        type: 'boolean'
    }]
});
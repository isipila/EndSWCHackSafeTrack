Ext.define('Rat.view.filter.TextboxPanel', {
    extend: 'Ext.container.Container',
    alias: 'widget.textboxpanel',

    config: {
        model: null,
        store: null,
        validation: null,
        validationErrorMessage: null
    },

    layout:'fit',

    initComponent: function() {
        var selectedItemsStore = Ext.create('Ext.data.Store', {
            model: this.getModel()
        });

        var internalComboStore = Ext.create('Ext.data.Store', {
            model: this.getModel()
        });

        // Populate internal combo box store
        var masterStore = Ext.data.StoreManager.lookup(this.getStore());
        internalComboStore.add(masterStore.getRange());

        // Make this accessible to controller
        this.selectedItemsStore = selectedItemsStore;

        this.items = [{
            xtype: 'grid',
            border: 0,
            store: selectedItemsStore,
            hideHeaders: true,

            dockedItems: [{
                xtype: 'container',
                defaults: {
                    margin: 4
                },
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
//				style: {background: 'white'},
                align: 'stretch',
                dock: 'top',
                items: [{
                    xtype: 'combo',
                    itemId: 'searchField',
                    store: internalComboStore,
                    enableKeyEvents: 'true',
                    queryMode: 'local',
                    displayField: 'code',
                    flex: 1,
                    valueField: 'code',
                    hideTrigger:true,
                    hideLabel: true
                    //TOMAYBEDO: this is where a tooltip for the highlighted combobox item would be configured
                    /* listConfig: {
                     getInnerTpl: function() {
                     }
                     }*/
                },{
                    xtype: 'button',
                    text: 'Add',
                    itemId: 'addButton'
                }]
            }],

            columns: [{
                width: 170,
                xtype: 'gridcolumn',
                flex: 1,
                dataIndex: 'code',
                renderer: function(value, metaData, record){
                    metaData.tdAttr =  'data-qtip="' + record.data.description + '"';
                    return value;}
            },{
                xtype:'actioncolumn',
                itemId: 'delete',
                width:30,
                items: [{
                    icon: 'resources/icons/delete-icon.gif',
                    tooltip: 'Delete',
                    handler: function(grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        grid.getStore().removeAt(rowIndex);
                        //alert("Delete " + rec.get('description'));
                    }
                }]
            }]
        }];

        this.callParent();
    }
});

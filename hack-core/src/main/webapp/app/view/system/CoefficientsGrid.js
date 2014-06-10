Ext.define('Rat.view.system.CoefficientsGrid', {
    extend: 'Ext.container.Container',
    alias: 'widget.coefficientsgrid',

    config: {
    	title: 'Factors'
    },

    width: 320,

    layout: {
    	type: 'vbox',
    	align: 'stretch'
    },
        
    initComponent: function() {
		this.items = [{
	    	xtype: 'label',
	    	itemId: 'headerLabel',
	    	text: this.getTitle()
	    }, {
	    	xtype: 'grid',
		    border: 1,
		    flex: 1,
		    overflowY: 'auto',
		    overflowX: 'hidden',
		    store: Ext.create('Rat.store.system.RiskCoefficients'),
		    hideHeaders: true,
			viewConfig: {
				// We don't need this since the tree is not persisted
				markDirty: false
			},
						    
		    columns: [{
		    	dataIndex: 'name',
			}, {
				type: 'numberColumn',
				text: 'Risk Factor',
				dataIndex: 'coefficient',
				renderer: Rat.view.Renderer.riskPercentage
			}]
	    }];		
		
		this.callParent();
	}
});
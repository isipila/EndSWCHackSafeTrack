Ext.define('Rat.store.static.RiskCoefficients', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.static.RiskCoefficient',
    autoLoad: false,
    storeId: 'RiskCoefficients',

    proxy: {
        type: 'rest',
		url: url('api.static.riskCoefficients'),
        reader: {
            type: 'json'
        }
    }
});
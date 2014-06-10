Ext.define('Rat.store.system.RiskCoefficients', {
    extend: 'Ext.data.Store',

    model: 'Rat.model.system.RiskCoefficient',
    autoLoad: false, // Load on request
    storeId: 'RiskCoefficients',

    proxy: {
        type: 'rest',
		url: url('api.system.riskCoefficients'),
        reader: {
            type: 'json'
        }
    }
});
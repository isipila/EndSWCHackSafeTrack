Ext.define('Rat.model.system.LoggedInAccount', {
    singleton : true,
    
	config : {
        username: null,
        fullName: null
    },
	
    constructor : function(config){
        this.initConfig(config);
    }

});
Ext.define('Rat.controller.Test', {
    extend: 'Ext.app.Controller',
    init: function() {
		this.control({
			'five button[hewing=benning]': {
				click: this.onMoreValueAdded
			}
		});
    },
	
	onValueAdded: function() {

	},
	
	onMoreValueAdded: function() {
		Ext.Msg.alert('Megabenning received', 'Tobys shaved balls');
	}
});

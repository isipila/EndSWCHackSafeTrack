Ext.define('Rat.controller.DataManagement', {
	extend: 'Ext.app.Controller',

	stores: [
		'system.DataKeys'
	],
	
	init: function() {
		this.control({
			'dataurlform #confirmationCheckbox': { 
				change: this.confirmationChange
			},

			'dataurlform #submitButton': { 
				click: this.submitTask
			},

			'evaluationform checkbox': { 
				change: this.evaluationChange
			},

			'evaluationform button[action=selectAll]': { 
				click: this.selectAllEvaluationPhases
			},

			'evaluationform #submitButton': { 
				click: this.submitEvaluation
			},

			'fileuploadform #submitButton': { 
				click: this.submitFile
			}
		});
    },

	confirmationChange: function(checkbox, newValue) {
		var submitButton = checkbox.up('form').down('#submitButton');
		submitButton.setDisabled(!newValue);
	},
	
	submitTask: function(button) {
		var form = button.up('form');
		var checkbox = form.down('#confirmationCheckbox');
		if (checkbox.getValue()) {
			// Reset
			checkbox.setValue(false);
		} else {
			return;
		}
		
		// Handler for the task we want to perform
		var triggerDataChange = function(store, records) {
			if (records == null || records.length !== 1) {
				Ext.Msg.alert('Data Management', 'Failed to retrieve data key');
			}			
			
			form.getForm().setValues({resetKey: records[0].get('code')});
			form.getForm().submit({
				success: function(form, action) {
					Ext.Msg.alert('Data Management', 'Database update successful');
				},
				failure: function(form, action) {
					Ext.Msg.alert('Data Management', 'Database update failed');
				}
			});
			
			this.getSystemDataKeysStore().un('load', triggerDataChange, this);
		};
		
		// Get a data key and set callback
		this.getSystemDataKeysStore().on('load', triggerDataChange, this);
		this.getSystemDataKeysStore().load();
	},
	
	evaluationChange: function(checkbox, newValue) {
		var submitButton = checkbox.up('form').down('#submitButton');
		submitButton.setDisabled(false);
	},
	
	selectAllEvaluationPhases: function(button) {
		var form = button.up('form');
		var checkboxes = form.query('checkbox');
		for (var i = 0; i < checkboxes.length; i++) {
			checkboxes[i].setValue(true);
		}
	},
	
	submitEvaluation: function(button) {
		var form = button.up('form');
		var checkboxes = form.query('checkbox');
		form.getForm().submit({
			success: function(form, action) {
				Ext.Msg.alert('Data Management', 'Evaluation started');
				for (var i = 0; i < checkboxes.length; i++) {
					checkboxes[i].setValue(false);
				}
			},
			failure: function(form, action) {
				Ext.Msg.alert('Data Management', 'Evaluation request failed');
			}
		});		
	},
	
	submitFile: function(button) {
		var form = button.up('form');
		
		// Handler for the task we want to perform
		if (form.isValid()) {
			var fields = form.query('field');
			form.getForm().submit({
				success: function(form, action) {
					Ext.Msg.alert('Data Management', 'Database update successful');
					for (var i = 0; i < fields.length; i++) {
						fields[i].setValue(null);
					}					
				},
				failure: function(form, action) {
					var message = 'Database update failed';
					if (action.result.errors) {
						message = '<div style="overflow: auto;">' + message;
						for (var i = 0; i < action.result.errors.length && i < 10; i++) {
							message =  message + '<br />' + action.result.errors[i];
						}
						message = message + '</div>';
					}
					Ext.Msg.alert('Data Management', message);
				}
			});
		}
	}
	
});
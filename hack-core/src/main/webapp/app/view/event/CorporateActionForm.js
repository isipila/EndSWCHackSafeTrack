Ext.define('Rat.view.event.CorporateActionForm', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.corporateactionform',
	
	title: 'Event Details',

	requires: ['Rat.view.event.CorporateActionOptionPanel'],
	
	layout: 'card',
	
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',
		defaults: {
			margin: 1
		},
		items: [{
			text: 'Corporate Action Event', 
			xtype: 'button',
			action: 'showEventDetails'
		}, {
			text: 'Swift Message',
			xtype: 'button',
			action: 'showSwiftMessage'
		}]
	}],

	items: [{
		xtype: 'form',
		itemId: 'eventDetails',
		overflowY: 'auto',
		
		border: false,
		
		defaults: {
			margin: 8,
			anchor: '100%',
			labelWidth: 160
		},
		
		items: [{
			xtype: 'textfield',
			name : 'corporateActionReference',
			fieldLabel: 'Corporate Action Reference',
			readOnly: true
		}, {
			xtype: 'textfield',
			name : 'senderReference',
			fieldLabel: 'Sender Reference',
			readOnly: true
		}, {
			xtype: 'datefield',
			itemId : 'riskRealisationDate',
			fieldLabel: 'Realisation Date',
			format: 'd-m-Y',
			readOnly: true
		}, {
			xtype: 'datefield',
			itemId : 'archiveDate',
			fieldLabel: 'Archive Date',
			format: 'd-m-Y',
			readOnly: true
		}, {
			xtype: 'textfield',
			name : 'eventOptionType',
			fieldLabel: 'Event Type',
			readOnly: true
		}, {
			xtype: 'textfield',
			name : 'eventType',
			fieldLabel: 'Event',
			readOnly: true
		}, {
			xtype: 'textfield',
			name : 'securitySedolCode',
			fieldLabel: 'Security Identifier',
			readOnly: true
		}, {
			xtype: 'textfield',
			name : 'securityName',
			itemId: 'securityName',
			fieldLabel: 'Security Name',
			readOnly: true
		}, {
			xtype: 'datefield',
			name : 'announcementDate',
			fieldLabel: 'Announcement Date',
			format: 'd-m-Y',
			readOnly: true,
			optional: true
		}, {
			xtype: 'datefield',
			name : 'exDate',
			fieldLabel: 'Ex Date',
			format: 'd-m-Y',
			readOnly: true,
			optional: true
		}, {
			xtype: 'datefield',
			name : 'effectiveDate',
			fieldLabel: 'Effective Date',
			format: 'd-m-Y',
			readOnly: true,
			optional: true
		}, {
			xtype: 'datefield',
			name : 'recordDate',
			fieldLabel: 'Record Date',
			format: 'd-m-Y',
			readOnly: true,
			optional: true
		}, {
			xtype: 'numberfield',
			name : 'minimumSecurityQuantity',
			fieldLabel: 'Minimum Security Quantity',
			readOnly: true,
			optional: true
		}, {
			xtype: 'numberfield',
			name : 'maximumSecurityQuantity',
			fieldLabel: 'Maximum Security Quantity',
			readOnly: true,
			optional: true
		}, {
			xtype: 'numberfield',
			name : 'warrantParity',
			fieldLabel: 'Warrant Parity',
			readOnly: true,
			optional: true
		}, {
			xtype: 'textfield',
			name : 'eventStage',
			fieldLabel: 'Event Stage',
			readOnly: true,
			optional: true
		}, {
			xtype: 'textfield',
			name : 'offeror',
			fieldLabel: 'Offeror',
			readOnly: true,
			optional: true
		}]
	}, {
		xtype: 'container',
		itemId: 'swiftMessage',
		margin: 8,
		overflowY: 'auto'
	}],
	
	loadCorporateAction: function(corporateAction) {
		var eventDetailsForm = this.down('#eventDetails');
		
		this.down('#swiftMessage').update('<pre>' + corporateAction.get('originalMessage') + '</pre>');
		eventDetailsForm.loadRecord(corporateAction);
		
		var fields = eventDetailsForm.query('field[optional=true]');
		var optionalFields = this.eventTypeOptionalFields[corporateAction.get('eventType')];
		for (var i = 0; i < fields.length; i++) {
			fields[i].setVisible(optionalFields && optionalFields[fields[i].name]);
		}
		
		// Clear any existing option panels
		var optionPanels = eventDetailsForm.query('optionpanel');
		for (var i = 0; i < optionPanels.length; i++) {
			eventDetailsForm.remove(optionPanels[i]);
			optionPanels[i].destroy();
		}
		
		var options = corporateAction.get('options');
		for (var i = 0; i < options.length; i++) {
			var optionPanel = Ext.widget('optionpanel', {
				title: this.optionTitle(options[i]),
				optionalFields: optionalFields
			});
			optionPanel.populate(options[i]);
			eventDetailsForm.add(optionPanel);
		}
	},
	
	loadRiskEvent: function(event, corporateAction) {
		var eventDetailsForm = this.down('#eventDetails') 
		eventDetailsForm.down('#securityName').setValue(event.get('securityDescription'));
		eventDetailsForm.down('#riskRealisationDate').setValue(event.get('riskRealisationDate'));
		eventDetailsForm.down('#archiveDate').setValue(event.get('archiveDate'));
	},

	optionTitle: function(option) {
		var type = null;
		if (option.cash && option.security) {
			type = 'Cash and Shares';
		} else if (option.cash) {
			type = 'Cash';
		} else if (option.security) {
			type = 'Shares';
		}
		return 'Option ' + option.optionNumber + (type ? ' ' + type : '');
	},
	
	eventTypeOptionalFields: {
		BIDS: { recordDate: true, minimumSecurityQuantity: true, maximumSecurityQuantity: true },
		BONU: { exDate: true, recordDate: true },
		CAPD: { exDate: true, recordDate: true },
		CAPG: { exDate: true, recordDate: true },
		CHAN: { effectiveDate: true, recordDate: true },
		CONV: { },
		DECR: { effectiveDate: true, recordDate: true },
		DLST: { announcementDate: true, effectiveDate: true },
		DRCA: { exDate: true, recordDate: true },
		DRIP: { exDate: true, recordDate: true },
		DVCA: { exDate: true, recordDate: true },
		DVOP: { exDate: true, recordDate: true },
		DVSE: { exDate: true, recordDate: true },
		EXOF: { },
		EXRI: { },
		EXWA: { warrantParity: true },
		INTR: { exDate: true, recordDate: true },
		LIQU: { exDate: true, recordDate: true },
		MCAL: { recordDate: true },
		MRGR: { effectiveDate: true, recordDate: true },
		OTHR: { recordDate: true },
		PARI: { recordDate: true },
		PRED: { exDate: true, recordDate: true },
		PRIO: { exDate: true, recordDate: true },
		REDM: { recordDate: true, earlyPayDate: true },
		RHDI: { exDate: true, recordDate: true },
		RHTS: { exDate: true, recordDate: true },
		SHPR: { exDate: true, recordDate: true },
		SOFF: { exDate: true, recordDate: true },
		SPLF: { effectiveDate: true, recordDate: true },
		SPLR: { exDate: true, recordDate: true },
		TEND: { eventStage: true, offeror: true }
	}
});

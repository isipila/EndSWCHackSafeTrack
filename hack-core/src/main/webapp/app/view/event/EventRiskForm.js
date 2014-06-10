Ext.define('Rat.view.event.EventRiskForm', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.eventriskform',
	
	overflowY: 'auto',

	items: [{
		xtype: 'form',
		itemId: 'riskCalculation',
		
		border: false,
		
		defaults: {
			margin: 8,
			anchor: '100%',
			labelWidth: 160
		},
		
		items: [{
			xtype: 'textfield',
			name: 'externalRiskPercentage',
			fieldLabel: 'External Factor',
			readOnly: true
		}, {
			xtype: 'textfield',
			name: 'riskPerShare',
			fieldLabel: 'Base Risk Per Share',
			readOnly: true
		}, {
			xtype: 'textfield',
			name: 'totalPosition',
			fieldLabel: 'Total Position',
			readOnly: true
		}, {
			xtype: 'textfield',
			name: 'totalRisk',
			fieldLabel: 'Total Risk',
			readOnly: true
		}, {
			xtype: 'textfield',
			name: 'baseRisk',
			fieldLabel: 'Base Total Risk',
			readOnly: true
		}]
	}],
	
	loadRiskEvent: function(riskEvent) {
		var riskCalculationForm = this.down('#riskCalculation');
		
		var externalFactor = riskEvent.get('eventTypeAdjustmentFactor') * riskEvent.get('countryOfIssueAdjustmentFactor');
		riskCalculationForm.down('textfield[name=externalRiskPercentage]').setValue(Rat.view.Renderer.riskPercentage(externalFactor));
		riskCalculationForm.down('textfield[name=riskPerShare]').setValue(Ext.util.Format.number(riskEvent.get('riskPerShare'), '0,000.######'));
		riskCalculationForm.down('textfield[name=totalRisk]').setValue(riskEvent.get('securityCurrency') + ' ' + Ext.util.Format.number(riskEvent.get('totalRiskInSecurityCurrency'), '0,000.00'));
		riskCalculationForm.down('textfield[name=baseRisk]').setValue('GBP' + ' ' + Ext.util.Format.number(riskEvent.get('totalRiskInBaseCurrency'), '0,000.00'));
		riskCalculationForm.down('textfield[name=totalPosition]').setValue(Ext.util.Format.number(riskEvent.get('totalPosition'), '0,000'));
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

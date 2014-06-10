Ext.define('Rat.controller.Accounts', {
    extend: 'Ext.app.Controller',

	stores: ['system.Accounts'],
	
    requires: [
        'Rat.view.system.AccountForm'
    ],
	
	refs: [{
		ref: 'viewPort',
		selector: 'viewport'
	}, {
        ref: 'accountsGrid',
        selector: 'accountlist'
	}],
		
 	filterForm: null, // Only want to create once
	accountForm: null,
	
	init: function() {
        this.control({
			'accountlist': {
				render: this.loadAccounts,
				selectionchange: this.accountSelection,
				itemdblclick: this.editAccount
			},
	
            'accountlist button[action=addAccount]': { click: this.addAccount },
            'accountlist button[action=editAccount]': { click: this.editAccount },
            'accountlist button[action=removeAccount]': { click: this.deleteAccount },
            'accountform button[action=saveAccount]': { click: this.saveAccount },
            'accountform button[action=cancelAccountForm]': { click: this.cancelAccountForm },
            'accountform button[action=editAccountFilters]': { click: this.showFilterForm },
			
			'riskfilterform#account button[action=clear]': { click: this.clearFilterWindow },
			'riskfilterform#account button[action=apply]': { click: this.applyFilters },
			'riskfilterform#account button[action=cancel]': { click: this.cancelFilterWindow }
        });
    },

	loadAccounts: function() {
		var grid = this.getAccountsGrid();
		grid.loadingMask.show();
		this.getSystemAccountsStore().load({
			callback: function() {
				grid.loadingMask.hide();
			}
		});
	},
	
	accountSelection: function(selection, selectedModels) {
		var grid = this.getAccountsGrid();
		var canEdit = selectedModels.length === 1;
		grid.down('button[action=editAccount]').setDisabled(!canEdit);
		grid.down('button[action=removeAccount]').setDisabled(!canEdit);
	},
	
    addAccount: function(button) {
        var newAccount = Ext.create('Rat.model.system.Account', {
			enabled: true
		});
		this.showAccountForm(newAccount);
    },

	removeAccount: function(button) {
		var grid = button.up('gridpanel');
		var selected = grid.getSelectionModel().getSelection()[0];
		this.getSystemAccountsStore().remove(selected.model);
		this.getSystemAccountsStore().sync();
	},

    editAccount: function() {	
		var grid = this.getAccountsGrid();
		var selected = grid.getSelectionModel().getSelection()[0];
		this.showAccountForm(selected);
    },

	showAccountForm: function(account) {
		var form = Ext.widget('accountform', {
			isNewAccount: this.getSystemAccountsStore().indexOf(account) < 0
		});
		form.loadRecord(account);
		form.down('checkbox').checked = account.get('enabled');
		form.show();
	},
	
    saveAccount: function(button) {
        var form = button.up('form');
		if (form.getForm().isValid()) {
			form.getRecord().set(form.getValues());
			form.getRecord().set('enabled', form.down('checkbox').checked);
			if (!form.getRecord().get('roles')) {
				form.getRecord().set('roles', []);
			}
			if (this.getSystemAccountsStore().indexOf(form.getRecord()) < 0) {
				this.getSystemAccountsStore().add(form.getRecord());
			}
			
			this.getSystemAccountsStore().sync();
			form.hide();
			form.destroy();
		}
    },

    cancelAccountForm: function(button) {
		var form = button.up('form');
		form.hide();
		form.destroy();
	},
	
	getFilterForm: function() {
		if (!this.filterForm) {
			this.filterForm = Ext.create('Rat.view.filter.RiskFilterForm', {
				itemId: 'account',
				showAggregations: false,
				x: 8, 
				y: 72,
				width: this.getViewPort().getWidth() - 16,
				height: this.getViewPort().getHeight() - 112
			});
		}

		return this.filterForm;
	},
	
	/**
	 * Method to pop up the full screen filter form.
	 */
	showFilterForm: function(button) {
		this.accountForm = button.up('form');
		if (this.accountForm.getRecord()) {
			this.getFilterForm().setFilters(this.accountForm.getRecord().get('filterRule').split('&'));
			this.getFilterForm().show(this.accountForm);
			this.accountForm.hide();
		}
	},

	/**
	 * Removes all selected filters without any navigation.
	 */
	clearFilterWindow: function() {
		this.getFilterForm().clear();
	},
		
	/** 
	 * Navigates away from filter window and applies filters.
	 */
	applyFilters: function() {
		if (this.accountForm) {
			var filterRule = this.getFilterForm().getFilters().join('&');
			this.accountForm.getRecord().set('filterRule', filterRule);
			this.accountForm.populateFilterSummary(filterRule);
			this.accountForm.show();
		}
		this.getFilterForm().hide();
	},
		
	/**
	 * Triggers a navigation away from the window and resets it.
	 */
	cancelFilterWindow: function() {
		this.getFilterForm().hide();
	}
});
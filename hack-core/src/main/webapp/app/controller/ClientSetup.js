Ext.define('Rat.controller.ClientSetup', {
    extend: 'Ext.app.Controller',
   
	requires: [
		'Rat.view.configuration.EntityGroupForm',
		'Rat.view.configuration.EntityForm',
		'Rat.view.configuration.EventCategoryForm',
		'Rat.view.configuration.ProcessingGroupForm',
		'Rat.view.configuration.LocationForm'
	],
   
	stores: [
		'static.EntityGroups',
		'static.Entities',
		'static.EntityTree',
		'static.EventCategories',
		'static.ProcessingGroups',
		'static.Locations'
	],

	refs: [{
        ref: 'entityTree',
        selector: '#entityTree'
	}, {
        ref: 'eventCategoriesGrid',
        selector: '#eventCategoriesGrid'
	}, {
        ref: 'processingGroupsGrid',
        selector: '#processingGroupsGrid'
	}, {
		ref: 'locationsGrid',
		selector: '#locationsGrid'
    }, {
		ref: 'mappingRulesGrid',
		selector: '#mappingRulesGrid'
    }],

	init: function() {
		this.mapActions('clientconfiguration', [
			'addTreeEntity',
			'editTreeEntity',
			'removeTreeEntity',
			'addEventCategory',
			'editEventCategory',
			'removeEventCategory',
			'addProcessingGroup',
			'editProcessingGroup',
			'removeProcessingGroup',
			'addLocation',
			'editLocation',
			'removeLocation'
		]);
	
		this.mapActions('entitygroupform', [
			'saveEntityGroup', 
			'cancelEntityGroupForm'
		]);
	
		this.mapActions('entityform', [
			'saveEntity', 
			'cancelEntityForm',
			'addMappingRule',
			'removeMappingRule',
			'moveMappingRuleUp',
			'moveMappingRuleDown'
		]);
	
		this.mapActions('eventcategoryform', [
			'saveEventCategory', 
			'cancelEventCategoryForm'
		]);
	
		this.mapActions('processinggroupform', [
			'saveProcessingGroup', 
			'cancelProcessingGroupForm'
		]);
	
		this.mapActions('locationform', [
			'saveLocation', 
			'cancelLocationForm'
		]);
	
		this.control('clientconfiguration #entityTree', {
			selectionchange: this.entityTreeSelection,
			itemdblclick: this.editTreeEntity
		});

		this.control('clientconfiguration #eventCategoriesGrid', {
			selectionchange: this.eventCategorySelection,
			itemdblclick: this.editEventCategory
		});
	
		this.control('clientconfiguration #processingGroupsGrid', {
			selectionchange: this.processingGroupSelection,
			itemdblclick: this.editProcessingGroup
		});
	
		this.control('clientconfiguration #locationsGrid', {
			selectionchange: this.locationSelection,
			itemdblclick: this.editLocation
		});
	
		this.control('entityform #mappingRulesGrid', {
			selectionchange: this.mappingRuleSelection,
		});
	
		this.application.on('startup', function() {
			this.populateEntityTree();
			this.getStaticEntityGroupsStore().on('load', this.populateEntityTree, this);
			this.getStaticEntitiesStore().on('load', this.populateEntityTree, this);
		}, this);
    },

	mapActions: function(container, actions) {
		for (var i = 0; i < actions.length; i++) {
			var action = actions[i];
			this.control(container + ' button[action=' + action + ']', {
				click: this[action]
			});
		}
	},
	
	
	//
	// Entities and Entity Groups
	//
	populateEntityTree: function(entities, records) {
		this.getStaticEntityTreeStore().getRootNode().removeAll();
		var entities = this.getStaticEntitiesStore();
		var entityGroups = this.getStaticEntityGroupsStore();
		
		if (entities.isLoading() || entityGroups.isLoading()) {
			return;
		}
		
		var rootNode = this.getStaticEntityTreeStore().getRootNode();
		
		entityGroups.each(function(entityGroup) {
			var groupNode = rootNode.appendChild({leaf: false});
			this.populateEntityTreeNode(groupNode, entityGroup);
			
			var entityCodes = entityGroup.get('entityCodes');			
			for (var i = 0; i < entityCodes.length; i++) {
				var entity = entities.getAt(entities.findExact('code', entityCodes[i]));
				if (entity) {
					var entityNode = groupNode.appendChild({leaf: true});
					this.populateEntityTreeNode(entityNode, entity);
				}
			}
		}, this);		
	},
	
	populateEntityTreeNode: function(node, model) {
		node.set('name', model.get('name'));
		node.set('processOptimisation', model.get('processOptimisation'));
		node.set('resourceOptimisation', model.get('resourceOptimisation'));
		node.model = model;
	},
	
	entityTreeSelection: function(selection, selectedModels) {
		var tree = this.getEntityTree();
		var canEdit = selectedModels.length === 1 && !selectedModels[0].isRoot();
		tree.down('button[action=editTreeEntity]').setDisabled(!canEdit);
		tree.down('button[action=removeTreeEntity]').setDisabled(!canEdit);
		
		// Must have root or region selected to add child
		var canAdd = selectedModels.length === 1 && !selectedModels[0].isLeaf();
		tree.down('button[action=addTreeEntity]').setDisabled(!canAdd);
	},
	
	addTreeEntity: function(button) {
		var tree = button.up('treepanel');
		if (tree.getSelectionModel().getSelection()[0].isRoot()) {
			// Add an entity group
			var entityGroup = Ext.create('Rat.model.static.EntityGroup', {
				name: 'New Entity Group'
			});
			entityGroup.virgin = true;
			this.showEntityGroupForm(entityGroup);
		} else {
			var entity = Ext.create('Rat.model.static.Entity', {
				name: 'New Entity'
			});
			entity.virgin = true;
			this.showEntityForm(entity);
		}
	},

	removeTreeEntity: function(button) {
		var tree = button.up('treepanel');
		var selected = tree.getSelectionModel().getSelection()[0];
		if (selected.isLeaf()) {
			this.getStaticEntitiesStore().remove(selected.model);
			this.getStaticEntitiesStore().sync();
			this.saveEntityGroupMembers(selected.parentNode);
		} else {
			this.getStaticEntityGroupsStore().remove(selected.model);
			this.getStaticEntityGroupsStore().sync();
		}
		selected.remove();
	},

    editTreeEntity: function() {
		var tree = this.getEntityTree();
		var selected = tree.getSelectionModel().getSelection()[0];
		if (selected.isLeaf()) {
			this.showEntityForm(selected.model);
		} else {
			this.showEntityGroupForm(selected.model);
		}
    },

	showEntityGroupForm: function(entityGroup) {
		var view = Ext.widget('entitygroupform');
		view.down('form').loadRecord(entityGroup);
		view.show();
	},
	
    saveEntityGroup: function(button) {
        var view = button.up('panel')
		var form = view.down('form');
		
        form.getRecord().set(form.getValues());
		if (form.getRecord().virgin) {
			form.getRecord().set('entityCodes', []); // Must initialise or S/L blows up
			this.assignNewCode(form.getRecord(), this.getStaticEntityGroupsStore());
			this.getStaticEntityGroupsStore().add(form.getRecord());
			var newNode = this.getEntityTree().getRootNode().appendChild({leaf: false});
			
			// Select the new node
			this.getEntityTree().getSelectionModel().select(newNode);
		}
		this.populateEntityTreeNode(this.getEntityTree().getSelectionModel().getSelection()[0], form.getRecord());
		this.getStaticEntityGroupsStore().sync();
		
		form.getRecord().virgin = false;
		
        view.hide();
		view.destroy();
    },

	saveEntityGroupMembers: function(groupNode) {
		var entityCodes = [];
		groupNode.eachChild(function(entityNode) {
			entityCodes.push(entityNode.model.get('code'));
		});
		
		groupNode.model.set('entityCodes', entityCodes);
		this.getStaticEntityGroupsStore().sync();
	},
	
    cancelEntityGroupForm: function(button) {
		var panel = button.up('panel');
		panel.hide();
		panel.destroy();
	},

	showEntityForm: function(entity) {
		var view = Ext.widget('entityform', {codeReadOnly: !entity.virgin});
		view.down('form').loadRecord(entity);
		view.down('#mappingRulesGrid').reconfigure(entity.processMappingRules());
		view.down('#mappingRulesGrid').getStore().sort({
			property : 'sequence',
			direction: 'ASC'
		});
		view.show();
	},
	
    saveEntity: function(button) {
        var view = button.up('panel')
		var form = view.down('form');
		
        form.getRecord().set(form.getValues());
		if (form.getRecord().virgin) {
			this.getStaticEntitiesStore().add(form.getRecord());
			var groupNode = this.getEntityTree().getSelectionModel().getSelection()[0];
			var newNode = groupNode.appendChild({leaf: true});
			
			// Select the new node
			groupNode.expand();
			this.getEntityTree().getSelectionModel().select(newNode);
		}
		this.populateEntityTreeNode(this.getEntityTree().getSelectionModel().getSelection()[0], form.getRecord());
		var syncConfig = {};
		if (form.getRecord().virgin) {
			var controller = this;
			syncConfig.callback = function() {
				controller.saveEntityGroupMembers(groupNode);
			};
		}
	
		var mappingRules = form.getRecord().processMappingRules();
		if (mappingRules.getModifiedRecords().length > 0 || mappingRules.getRemovedRecords().length > 0) {
			// Copy rules across
			var rules = [];
			form.getRecord().processMappingRules().each(function(rule) {
				rules.push({
					sequence: rule.get('sequence'),
					eventCategoryCode : rule.get('eventCategoryCode'),
					countryCode : rule.get('countryCode'),
					currencyCode : rule.get('currencyCode'),
					eventOptionType : rule.get('eventOptionType') === '' ? null : rule.get('eventOptionType'),
					processingGroupCode: rule.get('processingGroupCode')
				});
			});
			form.getRecord().set('processMappingRules', rules);

			// Mark parent as dirty
			form.getRecord().setDirty();
		}
		this.getStaticEntitiesStore().sync(syncConfig);
		
		// No longer virgin
		form.getRecord().virgin = false;
		
		// Remove dirty markers
		mappingRules.commitChanges();
		
        view.hide();
		view.destroy();
    },

    cancelEntityForm: function(button) {
		var panel = button.up('panel');
		panel.hide();
		panel.destroy();
	},

	
	//
	// Mapping Rules
	//
	
	mappingRuleSelection: function(selection, selectedModels) {
		var grid = this.getMappingRulesGrid();
		var canEdit = selectedModels.length === 1;
		grid.down('button[action=removeMappingRule]').setDisabled(!canEdit);
		grid.down('button[action=moveMappingRuleUp]').setDisabled(!canEdit);
		grid.down('button[action=moveMappingRuleDown]').setDisabled(!canEdit);
	},
	
	addMappingRule: function(button) {
		var grid = button.up('gridpanel');
		var currentCount = grid.getStore().getCount();
		grid.getStore().add({
			sequence: currentCount + 1
		});
	},

	removeMappingRule: function(button) {
		var grid = button.up('gridpanel');
		var selected = grid.getSelectionModel().getSelection()[0];
		grid.getStore().remove(selected);
		// Re-number
		for (var i = 0; i < grid.getStore().getCount(); i++) {
			grid.getStore().getAt(i).set('sequence', i + 1);
		}
	},

    moveMappingRuleUp: function() {	
		var grid = this.getMappingRulesGrid();
		var selected = grid.getSelectionModel().getSelection()[0];
		var currentSequence = selected.get('sequence');
		if (currentSequence > 1) {
			var previous = grid.getStore().getAt(grid.getStore().findExact('sequence', currentSequence - 1));
			previous.set('sequence', currentSequence);
			selected.set('sequence', currentSequence - 1);
		}
		grid.getStore().sort();
    },

	moveMappingRuleDown: function() {
		var grid = this.getMappingRulesGrid();
		var selected = grid.getSelectionModel().getSelection()[0];
		var currentSequence = selected.get('sequence');
		if (currentSequence <= grid.getStore().getCount()) {
			var next = grid.getStore().getAt(grid.getStore().findExact('sequence', currentSequence + 1));
			next.set('sequence', currentSequence);
			selected.set('sequence', currentSequence + 1);
		}
		grid.getStore().sort();
	},

	
	//
	// Event Categories
	//
	
	eventCategorySelection: function(selection, selectedModels) {
		var grid = this.getEventCategoriesGrid();
		var canEdit = selectedModels.length === 1;
		grid.down('button[action=editEventCategory]').setDisabled(!canEdit);
		grid.down('button[action=removeEventCategory]').setDisabled(!canEdit);
	},
	
	addEventCategory: function(button) {
		var grid = button.up('gridpanel');
		var eventCategory = Ext.create('Rat.model.static.EventCategory', {
			name: 'New Processing Group'
		});
		eventCategory.virgin = true;
		this.showEventCategoryForm(eventCategory);
	},

	removeEventCategory: function(button) {
		var grid = button.up('gridpanel');
		var selected = grid.getSelectionModel().getSelection()[0];
		this.getStaticEventCategoriesStore().remove(selected.model);
		this.getStaticEventCategoriesStore().sync();
	},

    editEventCategory: function() {	
		var grid = this.getEventCategoriesGrid();
		var selected = grid.getSelectionModel().getSelection()[0];
		this.showEventCategoryForm(selected);
    },

	showEventCategoryForm: function(eventCategory) {
		var view = Ext.widget('eventcategoryform');
		view.show();
		view.loadRecord(eventCategory);
	},
	
    saveEventCategory: function(button) {
		var view = button.up('eventcategoryform');
		var form = view.down('form');
		
        form.getRecord().set(view.getValues());
		if (form.getRecord().virgin) {
			this.assignNewCode(form.getRecord(), this.getStaticEventCategoriesStore());
			this.getStaticEventCategoriesStore().add(form.getRecord());
		}
		this.getStaticEventCategoriesStore().sync();
		form.getRecord().virgin = false;
        view.hide();
		view.destroy();
    },

    cancelEventCategoryForm: function(button) {
		var panel = button.up('panel');
		panel.hide();
		panel.destroy();
	},

	
	//
	// Processing Groups
	//
	
	processingGroupSelection: function(selection, selectedModels) {
		var grid = this.getProcessingGroupsGrid();
		var canEdit = selectedModels.length === 1;
		grid.down('button[action=editProcessingGroup]').setDisabled(!canEdit);
		grid.down('button[action=removeProcessingGroup]').setDisabled(!canEdit);
	},
	
	addProcessingGroup: function(button) {
		var grid = button.up('gridpanel');
		var processingGroup = Ext.create('Rat.model.static.ProcessingGroup', {
			name: 'New Processing Group'
		});
		processingGroup.virgin = true;
		this.showProcessingGroupForm(processingGroup);
	},

	removeProcessingGroup: function(button) {
		var grid = button.up('gridpanel');
		var selected = grid.getSelectionModel().getSelection()[0];
		this.getStaticProcessingGroupsStore().remove(selected.model);
		this.getStaticProcessingGroupsStore().sync();
	},

    editProcessingGroup: function() {	
		var grid = this.getProcessingGroupsGrid();
		var selected = grid.getSelectionModel().getSelection()[0];
		this.showProcessingGroupForm(selected);
    },

	showProcessingGroupForm: function(processingGroup) {
		var view = Ext.widget('processinggroupform');
		view.down('form').loadRecord(processingGroup);
		view.show();
	},
	
    saveProcessingGroup: function(button) {
        var view = button.up('panel')
		var form = view.down('form');
		
        form.getRecord().set(form.getValues());
		if (form.getRecord().virgin) {
			this.assignNewCode(form.getRecord(), this.getStaticProcessingGroupsStore());
			this.getStaticProcessingGroupsStore().add(form.getRecord());
		}
		this.getStaticProcessingGroupsStore().sync();
		form.getRecord().virgin = false;
        view.hide();
		view.destroy();
    },

    cancelProcessingGroupForm: function(button) {
		var panel = button.up('panel');
		panel.hide();
		panel.destroy();
	},

	
	//
	// Locations
	//
	
	locationSelection: function(selection, selectedModels) {
		var grid = this.getLocationsGrid();
		var canEdit = selectedModels.length === 1;
		grid.down('button[action=editLocation]').setDisabled(!canEdit);
		grid.down('button[action=removeLocation]').setDisabled(!canEdit);
	},
	
	addLocation: function(button) {
		var grid = button.up('gridpanel');
		var location = Ext.create('Rat.model.static.Location', {
			name: 'New Location'
		});
		location.virgin = true;
		this.showLocationForm(location);
	},

	removeLocation: function(button) {
		var grid = button.up('gridpanel');
		var selected = grid.getSelectionModel().getSelection()[0];
		this.getStaticLocationsStore().remove(selected.model);
		this.getStaticLocationsStore().sync();
	},

    editLocation: function() {
		var grid = this.getLocationsGrid();
		var selected = grid.getSelectionModel().getSelection()[0];
		this.showLocationForm(selected);
    },

	showLocationForm: function(location) {
		var view = Ext.widget('locationform');
		view.down('form').loadRecord(location);
		view.show();
	},
	
    saveLocation: function(button) {
        var view = button.up('panel')
		var form = view.down('form');
		
        form.getRecord().set(form.getValues());
		if (form.getRecord().virgin) {
			this.assignNewCode(form.getRecord(), this.getStaticLocationsStore());
			this.getStaticLocationsStore().add(form.getRecord());
		}
		this.getStaticLocationsStore().sync();
		form.getRecord().virgin = false;
        view.hide();
		view.destroy();
    },

    cancelLocationForm: function(button) {
		var panel = button.up('panel');
		panel.hide();
		panel.destroy();
	},
	
	// 
	// Utility methods
	//
	
	assignNewCode: function(item, store) {
		var stem = item.get('name').replace(/\W/g, '').substr(0, 4);
		var suffix = 1;
		var candidate = stem; // deliberately leave off suffix first time
		while (this.codeExistsInStore(candidate, store)) {
			candidate = stem + (++suffix); // starts at stem2
		}
		item.set('code', candidate);
	},
	
	codeExistsInStore: function(code, store) {
		for (var i = 0; i < store.getCount(); i++) {
			if (store.getAt(i).get('code') === code) {
				return true;
			}
		}
		return false;
	}
});

/**
 * Navigation controller determines all screen routing.
 *
 * Basic navigation process in the controller is as follows:
 *   1) Application components request changes to the location by calling navigate(...) 
 *      and passing in a target object. See navigate document for details.
 *   2) URL hash is updated which the new target location
 *   3) The change causes an event handler to fire (as though the user has changed the browser URL)
 *   4) In response the event we update the application location.
 *   5) Application events are then fired out to inform specific components that new sub items and query parameters 
 * 		have been selected.
 *
 * Other controllers should request changes to the location by calling navigate(...) and then listen to the resulting 
 * events is required.
 *
 * Additionally other controllers may initialise a location by calling initialiseLocation and passing in a standard
 * navigation target object.
 */
Ext.define('Rat.controller.Navigation', {
    extend: 'Ext.app.Controller',

    refs: [{
		ref: 'mainContent',
		selector: '#mainContent'
	}, {
		ref: 'navigation',
		selector: '#navigation'
	}],
	
	/**
	 * Stores the last item navigated to.
	 */
	navigationCache: {
		location: null,
		subLocation: null,
		queryScope: null,
		queryParameters: null,
	},

	/**
	 * Stores a map of location to state to be restored when we return to that location.
	 */
	locationState: {},

	/**
	 * Stores a map of query parameters by query scope.
	 */
	queryState: {},
	
	init: function() {
		this.control({
			'menu': {
				click: this.menuItemClick
			}
		});
		
		// Init the Ext history utility
        Ext.History.init();

        // Navigate on hash change
		Ext.History.on('change', this.urlChange, this);
    },

	/**
	 * Sets the initial configuration for a location. This can also be used to set 
	 * an initial configuration for a location such as default sub location. It is optional and does 
	 * not have to be called in order to use a location in the application.
	 *
	 * For details of the target object see navigate(...)
	 */ 
	initialiseLocation: function(target) {
		if (target.location) {
			this.locationState[target.location] = target; 
		}
	},
	
	/**
	 * Navigates the application to the specified target which must be an object containing at least one of:
	 *
	 * location
	 *		Main application panel to move to. Optional - defaults to the current location. 
	 * subLocation 
	 * 		Sub location to move to within location. Optional - defaults to the cached subLocation for the
	 * 		location being selected. Set to null to remove sub location.
	 * queryContext
	 *		Context name that may be shared across multiple locations. This must be set for a navigation
	 * 		item to store query parameters in the address and is used to fire events out to the rest of
	 *		the application.
	 * queryParameters
	 * 		URL query parameters. Optional - defaults to the cached query parameters for the location being 
	 *		selected. Set to null to remove query parameters.
	 *
	 * Once navigation is completed two application events may be fired:
	 *		<queryContext>QueryParameters()
	 *			Listener should accept array of parameter strings
	 *		<subLocation>SubLocationShow() and <subLocation>SubLocationHide
	 *			Listener methods should accept no arguments.
	 *
	 * Other controllers may listen to these events in order to keep the view up to date with the URL.
	 */
	navigate: function(target) {
		var currentTarget = this.getTargetFromToken(Ext.History.getToken());

		var location = target.location ? target.location : currentTarget.location;
		var locationDefaults = this.locationState[location] ? this.locationState[location] : {
			subLocation: null,
			queryParameters: null
		};
		var subLocation = target.subLocation || target.subLocation === null ? target.subLocation : locationDefaults.subLocation;
		var queryParameters = target.queryParameters || target.queryParameters === null ? target.queryParameters : locationDefaults.queryParameters;
		var parameterString = queryParameters instanceof Array ? queryParameters.join('&') : queryParameters;

		Ext.History.add(location + (subLocation ? '-' + subLocation : '') + (parameterString ? '?' + parameterString : ''));
	},
	
	/**
	 * Responds to changes in the browser URL token and updates the application view.
	 */
    urlChange: function(token) {
		var target = this.getTargetFromToken(token);
		
		// Select primary application panel
		if (this.navigationCache.location !== target.location) {
			this.selectTopLevelPanel(target.location);
		}
		
		// Do we need to fire events for sub locations?
		if (target.subLocation !== this.navigationCache.subLocation && this.navigationCache.subLocation) {
			this.application.fireEvent('subLocation' + this.navigationCache.subLocation + 'Hide');
		}
		
		if (target.subLocation !== this.navigationCache.subLocation && target.subLocation) {
			this.application.fireEvent('subLocation' + target.subLocation + 'Show');
		}
		
		// Is there a query scope
		var queryScope = this.locationState[target.location] ? this.locationState[target.location].queryScope : null;
		if (queryScope && target.queryParameters !== this.queryState[queryScope]) {
			this.application.fireEvent(queryScope + 'Parameters', target.queryParameters ? target.queryParameters.split('&') : []);
		}
		
		// Update the cache / state
		if (!this.locationState[target.location]) {
			this.locationState[target.location] = {};
		}
		this.locationState[target.location].subLocation = target.subLocation;
		this.locationState[target.location].queryParameters = target.queryParameters;
		this.navigationCache = this.locationState[target.location];
		
		if (queryScope) {
			this.queryState[queryScope] = target.queryParameters;
		}
    },

	menuItemClick: function(menu, item) {
        if (item.navigationTarget) {
			this.navigate(item.navigationTarget);
		}
	},

	selectInitialPanel: function() {
		// Navigate if initial hash is provided
		var hash = window.location.hash;
		
		if (hash && hash.charAt(0) == '#') {
			// Simulate arrival by traditional means
			this.urlChange(hash.slice(1)); 
		} else {
			// Set the hash to the first menu item
			Ext.History.add(this.getNavigation().items.getAt(0).items.getAt(0).navigationTarget.location);
		}
	},
	
	selectTopLevelPanel: function(itemName) {
		var mainPanel = this.getMainContent();

        // Set menu and page title
        // Iterate through each menu item
        this.getNavigation().items.each(function(menu) {
			menu.items.each(function(item) {
				// Active
				if (item.getItemId() === itemName) {
					// Disable
					item.addCls('rat-menu-item-selected');
					
					// Make sure menu group is expanded
					menu.expand(false); // Do not animate
					
					// Set page title to menu item text
					window.document.title = 'CARMA - ' + item.text;

					// Set active view
					mainPanel.layout.setActiveItem(itemName + 'Panel');		
				} else {
					// Inactive
					item.removeCls('rat-menu-item-selected');
				}
			});
        });	
	},
	
	getTargetFromToken: function(token) {
		var result = {};
		var components = token.split('?');
		result.queryParameters = components.length > 1 ? components[1] : null;
		var locationComponents = components[0].split('-');
		result.subLocation = locationComponents.length > 1 ? locationComponents[1] : null;
		result.location = locationComponents[0];
		return result;
	}	
});

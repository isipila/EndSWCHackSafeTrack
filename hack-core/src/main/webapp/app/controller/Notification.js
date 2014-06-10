Ext.define('Rat.controller.Notification', {
    extend: 'Ext.app.Controller',

	init: function() {
		if (location.hostname !== 'localhost') {
			this.initialiseConnection();
		}
	},
	
	notification: function(notification) {
		// Broadcast to application
		/*this.application.fireEvent('notification' + this.camelCaseType(notification.type), notification);
		
		var notification = Ext.create('Rat.view.Notification', {
            message: notification.type
		});
		
		var statusBar = Ext.ComponentQuery.query('#statusBar')[0];		
		notification.showBy(statusBar, 'tr', [-280, -60]);
		
		var task = new Ext.util.DelayedTask(function() {
			notification.animate({
				to: {
					opacity: 0
				},
				duration: 1000,
				callback: function() {
					notification.close();
				}
			});
		}); 
		
		task.delay(3000);*/
	},
	
	initialiseConnection: function() {
		"use strict";
		
		var controller = this;
		
		var socket = atmosphere;
		var subSocket;
		var transport = 'websocket';

		var location = document.location.toString();
		var notificationUrl = location.slice(0, location.lastIndexOf('/') + 1) + url('api.notifications');
		
		var request = { 
			url: notificationUrl,
			contentType : "application/json",
			logLevel : 'debug',
			transport : transport ,
			trackMessageLength : false,
			reconnectInterval : 5000,
			enableXDR: true,
			timeout : 60000
		};

		request.onOpen = function(response) {
		};

		request.onMessage = function (response) {
			var message = response.responseBody;
			try {
				var json = atmosphere.util.parseJSON(message);
			} catch (e) {
				return;
			}
			
			controller.notification(json);
		};

		request.onClose = function(response) {
		};

		request.onError = function(response) {
		};

		subSocket = socket.subscribe(request);
	},
	
	camelCaseType: function(notificationType) {
		return ("_" + notificationType).toLowerCase().replace(/(\_[a-zA-Z])/g, function($1) {
			return $1.toUpperCase().replace('_','');
		});
	}
});
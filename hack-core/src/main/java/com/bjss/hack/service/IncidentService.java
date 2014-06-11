package com.bjss.hack.service;

import com.bjss.hack.model.Incident;
import com.bjss.hack.model.Location;
import com.bjss.hack.model.Subscriber;
import com.bjss.hack.model.SubscriberStore;
import com.google.inject.Inject;

public class IncidentService {

	private final MessageService messageService;
	
	private final LocationService locationService;

	@Inject
	public IncidentService(MessageService messageService,
			LocationService locationService) {
		super();
		this.messageService = messageService;
		this.locationService = locationService;
	}

	public void report(final Incident incident) {
		// Find any close registered users
		final Location incidentLocation = locationService.location(incident.getGeoCode());
		
		for (Subscriber subscriber : SubscriberStore.INSTANCE.nearbySubscribers(incidentLocation)) {
			messageService.send(subscriber.getTelephone(), incidentMessage(incident, incidentLocation, subscriber));
		}
	}
	
	private String incidentMessage(final Incident incident, final Location incidentLocation, final Subscriber subscriber) {
		final double range = subscriber.getLocation().rangeTo(incidentLocation);
		final double bearing = subscriber.getLocation().bearingTo(incidentLocation);
		return String.format("Incident %.0f km %s of your location: %s", range, quadrant(bearing), incident.getMessage());
	}
	
	private String quadrant(double bearing) {
		if (bearing < 22.5D) {
			return "north";
		} else if (bearing < 67.5) {
			return "north east";
		} else if (bearing < 112.5) {
			return "east";
		} else if (bearing < 157.5) {
			return "south east";
		} else if (bearing < 202.5) {
			return "south";
		} else if (bearing < 247.5) {
			return "south west";
		} else if (bearing < 292.5) {
			return "west";
		} else if (bearing < 337.5) {
			return "north west";
		} else {
			return "north";
		}
	}
}

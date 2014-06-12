package com.bjss.hack.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bjss.hack.model.Incident;
import com.bjss.hack.model.IncidentStore;
import com.bjss.hack.model.Location;
import com.bjss.hack.model.Subscriber;
import com.bjss.hack.model.SubscriberStore;
import com.google.inject.Inject;

public class IncidentService {

    private static final Logger LOG = LoggerFactory.getLogger(IncidentService.class);

	private final MessageService messageService;
	
	@Inject
	public IncidentService(MessageService messageService) {
		super();
		this.messageService = messageService;
	}

	public void report(final Incident incident) {
		LOG.info("Incident reported: " + incident);
		
		boolean confirmed = IncidentStore.INSTANCE.nearbyIncidents(incident).size() > 0;
		IncidentStore.INSTANCE.addIncident(incident);
		
		// Find any close registered users
		final Location incidentLocation = Location.fromGeoCode(incident.getGeoCode());
		
		for (Subscriber subscriber : SubscriberStore.INSTANCE.nearbySubscribers(incidentLocation)) {
			try {
				messageService.send(subscriber.getTelephone(), incidentMessage(incident, confirmed, incidentLocation, subscriber));
			} catch (Exception e) {
				LOG.error("Error sending notification", e);
			}
		}
	}
	
	private String incidentMessage(final Incident incident, final boolean confirmed, final Location incidentLocation, final Subscriber subscriber) {
		final double range = subscriber.getLocation().rangeTo(incidentLocation);
		final double bearing = subscriber.getLocation().bearingTo(incidentLocation);
		final String confirmationStatus = confirmed ? "Confirmed" : "Unconfirmed";
		final String dateTime = incident.getDateTime().toString("H:m:s d/M/y");
		return String.format("%s incident %.0f km %s of your location at %s: %s", confirmationStatus, range, quadrant(bearing), dateTime, incident.getMessage());
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

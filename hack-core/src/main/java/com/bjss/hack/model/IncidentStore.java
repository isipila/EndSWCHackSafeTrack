package com.bjss.hack.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;

import org.joda.time.DateTime;


public enum IncidentStore {

	INSTANCE;
	
	private static final long DAY_IN_MILLISECONDS = 86400000L;
	
	private final List<Incident> incidents = new ArrayList<>();
	
	public synchronized void addIncident(final Incident incident) {
		incidents.add(incident);
	}

	public Iterable<Incident> allIncidents() {
		List<Incident> result = new ArrayList<>(incidents);
		Collections.sort(result, new IncidentComparator());
		return result;
	}
	
	
	/**
	 * Nearby in time and space
	 * 
	 * @param incidentLocation
	 * @return
	 */
	public List<Incident> nearbyIncidents(final Incident incident) {
		final List<Incident> result = new ArrayList<>();
		for (final Incident candidate : incidents) {
			System.out.println("Considering " + candidate.getMessage());
			if (candidate.getLocation().rangeTo(incident.getLocation()) < 5 && withinDays(candidate.getDateTime(), incident.getDateTime(), 1)) {
				result.add(candidate);
			}
		}
		return result;
	}

	private boolean withinDays(final DateTime instant1, final DateTime instant2, final int days) {
		final long millisApart = Math.abs(instant1.toDate().getTime() - instant2.toDate().getTime());
		return millisApart / DAY_IN_MILLISECONDS < days;
	}
	
	/**
	 * Reverse chronological comparator
	 * 
	 * @author john.mountain
	 *
	 */
	private final class IncidentComparator implements Comparator<Incident> {

		@Override
		public int compare(Incident incident1, Incident incident2) {
			return incident2.getDateTime().compareTo(incident1.getDateTime());
		}
		
	}
}

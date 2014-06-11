package com.bjss.hack.model;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.SortedSet;
import java.util.TreeSet;


public enum IncidentStore {

	INSTANCE;
	
	private final SortedSet<Incident> incidents = new TreeSet<>(new IncidentComparator());
	
	public synchronized void addIncident(final Incident incident) {
		incidents.add(incident);
	}

	public Iterable<Incident> allIncidents() {
		return incidents;
	}
	
	private final class IncidentComparator implements Comparator<Incident> {

		@Override
		public int compare(Incident incident1, Incident incident2) {
			return incident1.getDateTime().compareTo(incident2.getDateTime());
		}
		
	}
}

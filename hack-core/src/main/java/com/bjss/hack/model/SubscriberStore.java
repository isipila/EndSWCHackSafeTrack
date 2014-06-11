package com.bjss.hack.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public enum SubscriberStore {

	INSTANCE;
	
	private final Map<String, Subscriber> subscribers = new HashMap<>();
	
	public synchronized boolean addSubscriber(final Subscriber subscriber) {
		return subscribers.put(subscriber.getTelephone(), subscriber) != null;
	}

	public Iterable<Subscriber> allSubscribers() {
		return subscribers.values();
	}
	
	public Iterable<Subscriber> nearbySubscribers(Location incidentLocation) {
		final List<Subscriber> result = new ArrayList<Subscriber>();
		for (final Subscriber candidate : subscribers.values()) {
			if (candidate.getLocation().rangeTo(incidentLocation) < 20) {
				result.add(candidate);
			}
		}
		return result;
	}
}

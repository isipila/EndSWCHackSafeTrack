package com.bjss.hack.model;

public class Subscriber {

	private final String telephone;
	
	private final Location location;

	public Subscriber(String telephone, Location location) {
		super();
		this.telephone = telephone;
		this.location = location;
	}

	public String getTelephone() {
		return telephone;
	}

	public Location getLocation() {
		return location;
	}
	
}

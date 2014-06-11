package com.bjss.hack.model;

public class Subscriber {

	private String telephone;
	
	private Location location;

	public Subscriber() {
		super();
	}

	public Subscriber(String telephone, Location location) {
		super();
		this.telephone = telephone;
		this.location = location;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}
	
}

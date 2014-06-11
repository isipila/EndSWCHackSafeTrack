package com.bjss.hack.model;

import java.math.BigDecimal;

public class Location {

	private static final double R = 6372.795477598; // Radius of earth km
	
	private final BigDecimal lat;
	
	private final BigDecimal lng;

	public Location(BigDecimal lat, BigDecimal lng) {
		super();
		this.lat = lat;
		this.lng = lng;
	}

	public BigDecimal getLat() {
		return lat;
	}

	public BigDecimal getLng() {
		return lng;
	}

	public double rangeTo(Location target) {
		final double latA = Math.toRadians(lat.doubleValue());
		final double lngA = Math.toRadians(lng.doubleValue());
		final double latB = Math.toRadians(target.getLat().doubleValue());
		final double lngB = Math.toRadians(target.getLng().doubleValue());
		
		return R * Math.acos(Math.sin(latA) * Math.sin(latB) + Math.cos(latA) * Math.cos(latB) * Math.cos(lngA - lngB));
	};
	
	public double bearingTo(Location target) {
		final double latA = Math.toRadians(lat.doubleValue());
		final double lngA = Math.toRadians(lng.doubleValue());
		final double latB = Math.toRadians(target.getLat().doubleValue());
		final double lngB = Math.toRadians(target.getLng().doubleValue());

		final double dphi = Math.log(Math.tan(latB / 2 + Math.PI / 4 ) / Math.tan( latA / 2 + Math.PI / 4) );
		final double dlon = lngB - lngA;
		
		final double result = Math.toDegrees(Math.atan2( dlon ,  dphi )); 
		return result < 0 ? result + 360D : result;
	}
}

package com.bjss.hack.model;

import java.math.BigDecimal;

import com.google.code.geocoder.model.GeocoderResult;

public class Location {

	private static final double R = 6372.795477598; // Radius of earth km
	
	private BigDecimal lat;
	
	private BigDecimal lng;
	
	public Location() {
		super();
	}

	public Location(BigDecimal lat, BigDecimal lng) {
		super();
		this.lat = lat;
		this.lng = lng;
	}

	public static Location fromGeoCode(GeocoderResult geocoderResult) {
		if (geocoderResult == null) {
			return null;
		} else {
			return new Location(geocoderResult.getGeometry().getLocation().getLat(), geocoderResult.getGeometry().getLocation().getLng());
		}
	}

	public BigDecimal getLat() {
		return lat;
	}

	public void setLat(BigDecimal lat) {
		this.lat = lat;
	}

	public BigDecimal getLng() {
		return lng;
	}

	public void setLng(BigDecimal lng) {
		this.lng = lng;
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
	
	@Override
	public String toString() {
		return "Location (" + lat + ", " + lng + ")";
	}
}

package com.bjss.hack.service;

import java.math.BigDecimal;

import com.bjss.hack.model.Location;
import com.google.code.geocoder.model.GeocoderResult;

public class LocationService {

	public Location lookup(String place) {
		return new Location(new BigDecimal("53.1"), new BigDecimal("-1.3"));
	}
	
	public Location location(GeocoderResult geocoderResult) {
		return new Location(geocoderResult.getGeometry().getLocation().getLat(), geocoderResult.getGeometry().getLocation().getLng());
	}
}

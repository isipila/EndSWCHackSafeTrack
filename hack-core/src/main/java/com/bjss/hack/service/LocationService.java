package com.bjss.hack.service;

import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bjss.hack.model.Location;
import com.bjss.hack.route.SmsSubscriptionServlet;
import com.google.code.geocoder.Geocoder;
import com.google.code.geocoder.GeocoderRequestBuilder;
import com.google.code.geocoder.model.GeocodeResponse;
import com.google.code.geocoder.model.GeocoderRequest;
import com.google.code.geocoder.model.GeocoderResult;

public class LocationService {

	private static final Logger LOG = LoggerFactory.getLogger(LocationService.class);


	public GeocoderResult lookup(final String place) {
		try {
			final Geocoder geocoder = new Geocoder();
			GeocoderRequest geocoderRequest = new GeocoderRequestBuilder().setAddress(place).setLanguage("en").getGeocoderRequest();
			GeocodeResponse geocoderResponse = geocoder.geocode(geocoderRequest);
	
			LOG.info("Location search for " + place + " returned " + geocoderResponse.getResults().size() + " results");
	
			if (geocoderResponse.getResults().size() > 0) {
				return geocoderResponse.getResults().get(0);
			} else {
				return null;
			}
		} catch (Exception e) {
			LOG.error("Error making geo lookup", e);
			throw new RuntimeException("Error on geo lookiup", e);
		}
	}
	
	public Location location(GeocoderResult geocoderResult) {
		if (geocoderResult == null) {
			return null;
		} else {
			return new Location(geocoderResult.getGeometry().getLocation().getLat(), geocoderResult.getGeometry().getLocation().getLng());
		}
	}
}

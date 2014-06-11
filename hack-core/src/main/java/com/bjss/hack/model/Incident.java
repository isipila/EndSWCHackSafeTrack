package com.bjss.hack.model;

import org.joda.time.DateTime;

import com.google.code.geocoder.model.GeocoderResult;

public class Incident {

	private GeocoderResult geoCode;
	
	private DateTime dateTime;
	
	private String message;

	public GeocoderResult getGeoCode() {
		return geoCode;
	}

	public void setGeoCode(GeocoderResult geoCode) {
		this.geoCode = geoCode;
	}

	public DateTime getDateTime() {
		return dateTime;
	}

	public void setDateTime(DateTime dateTime) {
		this.dateTime = dateTime;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	@Override
	public String toString() {
		return "Incident at " + geoCode + " at " + dateTime + ": " + message;
	}
}

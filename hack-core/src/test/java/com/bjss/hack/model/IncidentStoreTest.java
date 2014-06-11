package com.bjss.hack.model;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;

import java.math.BigDecimal;
import java.util.List;

import org.joda.time.DateTime;
import org.junit.Test;

import com.google.code.geocoder.model.GeocoderGeometry;
import com.google.code.geocoder.model.GeocoderResult;
import com.google.code.geocoder.model.LatLng;

public class IncidentStoreTest {

	@Test
	public void canDetermineLocalIncidents() {
		Location london = new Location(new BigDecimal("51.508515"), new BigDecimal("-0.1254872"));
		Location paris = new Location(new BigDecimal("48.856614"), new BigDecimal("2.3522219"));
		Location nearParis = new Location(new BigDecimal("48.846614"), new BigDecimal("2.3622219"));
		
		IncidentStore.INSTANCE.addIncident(new Incident(geoCode(london), DateTime.now(), "Incident1"));
		IncidentStore.INSTANCE.addIncident(new Incident(geoCode(paris), DateTime.now(), "Incident2"));

		List<Incident> nearby = IncidentStore.INSTANCE.nearbyIncidents(new Incident(geoCode(nearParis), DateTime.now().plusDays(1).minusHours(3), "Incident3"));
		
		assertThat(nearby.size(), equalTo(1));
		assertThat(nearby.get(0).getMessage(), equalTo("Incident2"));
	}
	
	private GeocoderResult geoCode(final Location location) {
		final GeocoderResult geoResult = new GeocoderResult();
		geoResult.setGeometry(new GeocoderGeometry());
		geoResult.getGeometry().setLocation(new LatLng(location.getLat(), location.getLng()));
		return geoResult;
	}
}
	
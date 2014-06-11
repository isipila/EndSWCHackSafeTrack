package com.bjss.hack.service;

import java.math.BigDecimal;

import org.joda.time.DateTime;
import org.junit.Test;
import org.mockito.Mockito;

import com.bjss.hack.model.Incident;
import com.bjss.hack.model.Location;
import com.bjss.hack.model.Subscriber;
import com.bjss.hack.model.SubscriberStore;
import com.google.code.geocoder.model.GeocoderGeometry;
import com.google.code.geocoder.model.GeocoderResult;
import com.google.code.geocoder.model.LatLng;

public class IncidentServiceTest {

	@Test
	public void canGenerateMessages() {
		Location london = new Location(new BigDecimal("51.508515"), new BigDecimal("-0.1254872"));
		Location nearLondon = new Location(new BigDecimal("51.518515"), new BigDecimal("-0.1254872"));
		
		final GeocoderResult georesult = new GeocoderResult();
		georesult.setGeometry(new GeocoderGeometry());
		georesult.getGeometry().setLocation(new LatLng(nearLondon.getLat(), nearLondon.getLng()));

		final Incident incident = new Incident(georesult, DateTime.now(), "Message text");
		
		SubscriberStore.INSTANCE.addSubscriber(new Subscriber("1234", london));
		
		MessageService mockMessageService = Mockito.mock(MessageService.class);
		
		IncidentService incidentService = new IncidentService(mockMessageService, new LocationService());
		incidentService.report(incident);
		
		Mockito.verify(mockMessageService).send("1234", "Incident 1 km north of your location: Message text");
	}
}

package com.bjss.hack.route;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bjss.hack.model.Incident;
import com.bjss.hack.service.IncidentService;
import com.bjss.hack.service.LocationService;
import com.google.code.geocoder.model.GeocoderResult;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.twilio.sdk.verbs.Sms;
import com.twilio.sdk.verbs.TwiMLException;
import com.twilio.sdk.verbs.TwiMLResponse;


@Singleton
public class SmsIncidentServlet extends HttpServlet {

	private static final Logger LOG = LoggerFactory.getLogger(SmsIncidentServlet.class);

	private final IncidentService incidentService;
	
	private final LocationService locationService;
	
	@Inject
	public SmsIncidentServlet(LocationService locationService, IncidentService incidentService) {
		super();
		this.locationService = locationService;
		this.incidentService = incidentService;
	}
	
	// service() responds to both GET and POST requests.
	// You can also use doGet() or doPost()
	@Override
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		LOG.info("Subscription SMS end point invoked");

		String fromNumber = request.getParameter("From");
		String requestMessage = request.getParameter("Body");

		LOG.info("SMS message: " + requestMessage);
		
		String[] parts = requestMessage.split("[,:;]");
		
		final GeocoderResult geoCode = locationService.lookup(parts[0]);
		final String message = parts.length > 1 ? parts[1] : "";

		String responseText;
		if (geoCode != null) {
			incidentService.report(new Incident(geoCode, DateTime.now(), message));
			responseText = "Incident reported";
		} else {
			responseText = "Unable to determine location from message";
		}
		
		TwiMLResponse twiml = new TwiMLResponse();
		Sms responseMessage = new Sms(responseText);
		try {
			twiml.append(responseMessage);
		} catch (TwiMLException e) {
			LOG.error("Error responding to sms" , e);
			throw new RuntimeException("Error", e);
		}
		response.setContentType("application/xml");
		response.getWriter().print(twiml.toXML());
	}
}

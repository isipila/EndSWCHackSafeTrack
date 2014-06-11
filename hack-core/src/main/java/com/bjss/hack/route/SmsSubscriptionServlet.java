package com.bjss.hack.route;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bjss.hack.model.Location;
import com.bjss.hack.model.Subscriber;
import com.bjss.hack.model.SubscriberStore;
import com.bjss.hack.service.LocationService;
import com.bjss.hack.service.SubscriptionService;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.twilio.sdk.verbs.Sms;
import com.twilio.sdk.verbs.TwiMLException;
import com.twilio.sdk.verbs.TwiMLResponse;


@Singleton
public class SmsSubscriptionServlet extends HttpServlet {

    private static final Logger LOG = LoggerFactory.getLogger(SmsSubscriptionServlet.class);

    private final SubscriptionService subscriptionService;
	
    private final LocationService locationService;
	
	@Inject
	public SmsSubscriptionServlet(LocationService locationService, SubscriptionService subscriptionService) {
		super();
		this.locationService = locationService;
		this.subscriptionService = subscriptionService;
	}
	
	@Override
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		LOG.info("Subscription SMS end point invoked");
		
		String fromNumber = request.getParameter("From");
		String requestMessage = request.getParameter("Body");
	
		LOG.info("SMS message: " + requestMessage);
		
		final Location location = locationService.location(locationService.lookup(requestMessage));
		
		String responseText;
		if (location != null) {
			final boolean newSubscriber = subscriptionService.subscribe(new Subscriber(fromNumber, location));
			
			if (newSubscriber) {
				responseText = "Thank you for registering";
			} else {
				responseText = "Thank you for updating your location";
			}
		} else {
			responseText = "Unable to determine location from message";
		}
		
		TwiMLResponse twiml = new TwiMLResponse();
		Sms message = new Sms(responseText);
		try {
			twiml.append(message);
		} catch (TwiMLException e) {
			LOG.error("Error responding to sms" , e);
			throw new RuntimeException("Error", e);
		}
		response.setContentType("application/xml");
		response.getWriter().print(twiml.toXML());
	}
}

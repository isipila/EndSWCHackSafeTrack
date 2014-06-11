package com.bjss.hack.route;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bjss.hack.model.Location;
import com.bjss.hack.model.Subscriber;
import com.bjss.hack.model.SubscriberStore;
import com.bjss.hack.service.LocationService;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.twilio.sdk.verbs.Sms;
import com.twilio.sdk.verbs.TwiMLException;
import com.twilio.sdk.verbs.TwiMLResponse;


@Singleton
public class SmsRegisterServlet extends HttpServlet {
	
	private final LocationService locationService;
	
	@Inject
	public SmsRegisterServlet(LocationService locationService) {
		super();
		this.locationService = locationService;
	}
	
	// service() responds to both GET and POST requests.
	// You can also use doGet() or doPost()
	@Override
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		String fromNumber = request.getParameter("From");
		String requestMessage = request.getParameter("Body");

		final Location location = locationService.lookup(requestMessage);
		
		String responseText;
		if (SubscriberStore.INSTANCE.addSubscriber(new Subscriber(fromNumber, location))) {
			responseText = "Thank you for registering";
		} else {
			responseText = "Thank you for updating your location";
		}
		
		TwiMLResponse twiml = new TwiMLResponse();
		Sms responseMessage = new Sms(responseText);
		try {
			twiml.append(responseMessage);
		} catch (TwiMLException e) {
			e.printStackTrace();
		}
		response.setContentType("application/xml");
		response.getWriter().print(twiml.toXML());
	}
}

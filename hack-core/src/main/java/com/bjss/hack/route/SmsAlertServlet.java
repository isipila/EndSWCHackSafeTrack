package com.bjss.hack.route;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.inject.Singleton;
import com.twilio.sdk.verbs.Sms;
import com.twilio.sdk.verbs.TwiMLException;
import com.twilio.sdk.verbs.TwiMLResponse;


@Singleton
public class SmsAlertServlet extends HttpServlet {

	// service() responds to both GET and POST requests.
	// You can also use doGet() or doPost()
	@Override
	public void service(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		
		
		TwiMLResponse twiml = new TwiMLResponse();
		Sms message = new Sms("Hello, Mobile Monkey");
		try {
			twiml.append(message);
		} catch (TwiMLException e) {
			e.printStackTrace();
		}
		response.setContentType("application/xml");
		response.getWriter().print(twiml.toXML());
	}
}

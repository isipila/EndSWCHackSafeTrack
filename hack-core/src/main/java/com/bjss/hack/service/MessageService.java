package com.bjss.hack.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bjss.hack.route.SmsSubscriptionServlet;
import com.twilio.sdk.TwilioRestClient;
import com.twilio.sdk.TwilioRestException;
import com.twilio.sdk.resource.factory.SmsFactory;
import com.twilio.sdk.resource.instance.Account;

public class MessageService {

    private static final Logger LOG = LoggerFactory.getLogger(MessageService.class);

    //You need these tokens to send and receive SMSs
	public static final String ACCOUNT_SID = "";
	public static final String AUTH_TOKEN = "";
	
	public void send(String number, String message) {
	    LOG.info("Sending message " + message + " to " + number);

		TwilioRestClient client = new TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN);
		Account account = client.getAccount();
		SmsFactory messageFactory = account.getSmsFactory();
		Map<String, String> params = new HashMap<>();
		params.put("To", number); 
		params.put("From", "+442030954390"); 												
		params.put("Body", message);
		try {
			messageFactory.create(params);
		} catch (TwilioRestException e) {
			throw new RuntimeException("Error sending alert", e);
		}
	}
	
}

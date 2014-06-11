package com.bjss.hack.model;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.google.code.geocoder.Geocoder;
import com.google.code.geocoder.GeocoderRequestBuilder;
import com.google.code.geocoder.model.GeocodeResponse;
import com.google.code.geocoder.model.GeocoderRequest;
import com.google.code.geocoder.model.GeocoderResult;
import com.twilio.sdk.TwilioRestClient;
import com.twilio.sdk.TwilioRestException;
import com.twilio.sdk.resource.factory.SmsFactory;
import com.twilio.sdk.resource.instance.Account;
import com.twilio.sdk.resource.instance.Sms;

public class ExperimentalCode {

	public static final String ACCOUNT_SID = "AC81eec98c34ca52bae5f95b0e5f0c8963";
	public static final String AUTH_TOKEN = "b4883ae964809101a103bb74a23360da";

	public static void main(String[] args) throws TwilioRestException, IOException {
		new ExperimentalCode().getLocation();
		//new ExperimentalCode().send();
	}
	
	public void send() throws TwilioRestException {
		TwilioRestClient client = new TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN);
		Account account = client.getAccount();
		SmsFactory messageFactory = account.getSmsFactory();
		Map<String, String> params = new HashMap<>();
		params.put("To", "+447973737976"); // Replace with a valid phone number
											// for your account.
		params.put("From", "+441288255116"); // Replace with a valid phone
												// number for your account.
		params.put("Body", "This still works");
		Sms sms = messageFactory.create(params);
	}
	
	public void getLocation() throws IOException {
		final Geocoder geocoder = new Geocoder();
		GeocoderRequest geocoderRequest = new GeocoderRequestBuilder().setAddress("Paris, France").setLanguage("en").getGeocoderRequest();
		GeocodeResponse geocoderResponse = geocoder.geocode(geocoderRequest);
		System.out.println("Results: " + geocoderResponse.getResults().size());
		for (GeocoderResult result : geocoderResponse.getResults()) {
			System.out.println(result.getGeometry().getLocation().getLat() + " " + result.getGeometry().getLocation().getLng());
		}
	}
}

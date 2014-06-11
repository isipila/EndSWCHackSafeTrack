package com.bjss.hack.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bjss.hack.model.Subscriber;
import com.bjss.hack.model.SubscriberStore;
import com.bjss.hack.route.SmsSubscriptionServlet;

public class SubscriptionService {

	private static final Logger LOG = LoggerFactory.getLogger(SubscriptionService.class);

	public boolean subscribe(final Subscriber subscriber) {
		LOG.info("Subscription request " + subscriber);
		
		return SubscriberStore.INSTANCE.addSubscriber(subscriber);
	}
	
}

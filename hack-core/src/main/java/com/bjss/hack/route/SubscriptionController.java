package com.bjss.hack.route;

import java.math.BigDecimal;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bjss.hack.model.Location;
import com.bjss.hack.model.Subscriber;
import com.bjss.hack.model.SubscriberStore;
import com.bjss.hack.service.SubscriptionService;
import com.google.code.geocoder.model.GeocoderResult;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
@Path("/subscribe")
public class SubscriptionController {

    private static final Logger LOG = LoggerFactory.getLogger(SubscriptionController.class);

    private final SubscriptionService subscriptionService;
    
    @Inject
    public SubscriptionController(SubscriptionService subscriptionService) {
    	this.subscriptionService = subscriptionService;
    }

    @POST
    @Produces({ "application/json" })
    public Response subscribe(final Subscriber subscriber) {
    	LOG.info("Subscription end point invoked");
    	subscriptionService.subscribe(subscriber);
        return Response.ok().build();
    }

    @GET
    @Produces({ "application/json" })
    public Response listSubscribers() {
    	return Response.ok(SubscriberStore.INSTANCE.allSubscribers()).build();
    }

    @GET
    @Path("sample")	
    @Produces({ "application/json" })
    public Response sampleJson() {
    	final Location location = new Location(new BigDecimal("51.508515"), new BigDecimal("-0.1254872"));
    	Subscriber result = new Subscriber("+44 7567 8882", location);
    	return Response.ok(result).build();
    }
}

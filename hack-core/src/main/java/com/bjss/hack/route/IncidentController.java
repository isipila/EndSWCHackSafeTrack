package com.bjss.hack.route;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bjss.hack.model.Incident;
import com.bjss.hack.model.IncidentStore;
import com.bjss.hack.model.SubscriberStore;
import com.bjss.hack.service.IncidentService;
import com.bjss.hack.service.LocationService;
import com.google.code.geocoder.model.GeocodeResponse;
import com.google.code.geocoder.model.GeocoderResult;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
@Path("/incident")
public class IncidentController {

    private static final Logger LOG = LoggerFactory.getLogger(IncidentController.class);

    private final IncidentService incidentService;
    
    @Inject
    public IncidentController(IncidentService incidentService) {
    	this.incidentService = incidentService;
    }

    @POST
    @Produces({ "application/json" })
    public Response reportIncident(final Incident incident) {
    	LOG.info("Incident endpoint invoked");
   		incidentService.report(incident);
        return Response.ok("Hello").build();
    }

    @GET
    @Produces({ "application/json" })
    public Response listIncidents() {
    	return Response.ok(IncidentStore.INSTANCE.allIncidents()).build();
    }

    @GET
    @Path("sample")	
    @Produces({ "application/json" })
    public Response sampleJson() {
    	Incident result = new Incident(new GeocoderResult(), new DateTime(2014, 06, 11, 0, 0),"Test message");
    	
    	return Response.ok(result).build();
    }
}

package com.bjss.hack.foundation.module;

import java.util.Map;

import com.bjss.hack.route.IncidentController;
import com.bjss.hack.route.JacksonContextResolver;
import com.bjss.hack.route.SmsAlertServlet;
import com.bjss.hack.route.TestServlet;
import com.google.common.collect.Maps;
import com.sun.jersey.guice.JerseyServletModule;
import com.sun.jersey.guice.spi.container.servlet.GuiceContainer;

public class ApplicationServletModule extends JerseyServletModule {

	@Override
	protected void configureServlets() {
		serve("/sms").with(SmsAlertServlet.class);
		serve("/test").with(TestServlet.class);
		
        final Map<String, String> params = Maps.newHashMap();
        params.put("com.sun.jersey.api.json.POJOMappingFeature", "true");
		serve("/api/*").with(GuiceContainer.class, params);
		
        bind(IncidentController.class);
        bind(JacksonContextResolver.class);
	}
	
}

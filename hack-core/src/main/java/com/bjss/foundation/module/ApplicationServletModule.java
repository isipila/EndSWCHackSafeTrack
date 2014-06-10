package com.bjss.foundation.module;

import com.bjss.service.SmsServlet;
import com.bjss.service.TestServlet;
import com.google.inject.servlet.ServletModule;

public class ApplicationServletModule extends ServletModule {

	@Override
	protected void configureServlets() {
		serve("/sms").with(SmsServlet.class);
		serve("/test").with(TestServlet.class);
	}
	
}

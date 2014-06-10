package com.bjss;

import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.joran.JoranConfigurator;
import ch.qos.logback.core.joran.spi.JoranException;
import org.eclipse.jetty.plus.jndi.Resource;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.Configuration.ClassList;
import org.eclipse.jetty.webapp.WebAppContext;
import org.h2.jdbcx.JdbcDataSource;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.security.ProtectionDomain;


/**
 * Hard coded bootstrap class for running local server.
 * 
 * @author john mountain
 */
public class EclipseMain {

	private static final int SERVLET_PORT = 8080;
	
    public static void main(String[] args) throws Exception {
        new EclipseMain().start();
    }

    public EclipseMain() {
    	super();
    }

    private void start() throws Exception {
    	setupLogger();
    	
    	//Create the server
        final Server server = new Server(SERVLET_PORT);

        //Enable parsing of jndi-related parts of web.xml and jetty-env.xml
        final ClassList classlist = ClassList.setServerDefault(server);
        classlist.addAfter("org.eclipse.jetty.webapp.FragmentConfiguration", "org.eclipse.jetty.plus.webapp.EnvConfiguration", "org.eclipse.jetty.plus.webapp.PlusConfiguration");

        // Locate web application 
        final ProtectionDomain protectionDomain = Class.forName("com.bjss.foundation.ApplicationServletContextListener").getProtectionDomain();
        final String webRoot = protectionDomain.getCodeSource().getLocation().toExternalForm();
        File root = new File(new File(webRoot).getParent(), "rat");

        //Create a WebApp
        final WebAppContext webapp = new WebAppContext(root.toString(), "/");
        
		server.setHandler(webapp);

        // Get an H2 in memory data source
        JdbcDataSource dataSource = new JdbcDataSource();
        dataSource.setURL("jdbc:h2:mem");
        dataSource.setUser("sa");
        dataSource.setPassword("sa");
        
		new Resource(webapp, "jdbc/IbacasDB", dataSource);
        	
        server.start();
        server.join();
    }

    
    private void setupLogger() {
		LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
		try {
			JoranConfigurator configurator = new JoranConfigurator();
			configurator.setContext(context);
			context.reset();
			configurator.doConfigure(getClass().getResourceAsStream("/logback-eclipse.xml"));
		} catch (JoranException je) {
			// StatusPrinter will handle this
		}
		
    }

}

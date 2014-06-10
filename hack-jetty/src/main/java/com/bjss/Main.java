package com.bjss;

import com.bjss.config.ApplicationConfiguration;
import com.bjss.config.DatabaseConfiguration;
import org.constretto.ConstrettoBuilder;
import org.constretto.ConstrettoConfiguration;
import org.constretto.model.Resource;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

import java.security.ProtectionDomain;

import static org.eclipse.jetty.webapp.Configuration.ClassList;

public class Main {

    private final DatabaseConfiguration databaseConfiguration;
    private final ApplicationConfiguration applicationConfiguration;

    public static void main(String[] args) throws Exception {
        Main sc = new Main();

        if (args.length != 1)               sc.start();
        else if ("stop".equals(args[0]))    sc.stop();
        else if ("start".equals(args[0]))   sc.start();
        else                                sc.usage();
    }

    public Main() {
        final String configFile = System.getProperty("hack.config", null);

        final ConstrettoBuilder constrettoBuilder = new ConstrettoBuilder();
        constrettoBuilder.createPropertiesStore()
                .addResource(Resource.create("classpath:config.properties"))
                .done();

        if (configFile != null) {
            constrettoBuilder.createPropertiesStore()
                    .addResource(Resource.create("file:" + configFile))
                    .done();
        }

        final ConstrettoConfiguration configuration = constrettoBuilder.getConfiguration();

        databaseConfiguration = configuration.as(DatabaseConfiguration.class);
        applicationConfiguration = configuration.as(ApplicationConfiguration.class);

        applicationConfiguration.createSystemProperties();
    }

    private void start() throws Exception {
        //Create the server
        final Server server = new Server(applicationConfiguration.getPort());

        //Enable parsing of jndi-related parts of web.xml and jetty-env.xml
        final ClassList classlist = ClassList.setServerDefault(server);
        classlist.addAfter("org.eclipse.jetty.webapp.FragmentConfiguration", "org.eclipse.jetty.plus.webapp.EnvConfiguration", "org.eclipse.jetty.plus.webapp.PlusConfiguration");

         // Get the war-file
        final ProtectionDomain protectionDomain = Main.class.getProtectionDomain();
        final String warFile = protectionDomain.getCodeSource().getLocation().toExternalForm();

        //Create a WebApp
        final WebAppContext webapp = new WebAppContext(warFile, applicationConfiguration.getContextRoot());
        server.setHandler(webapp);

        // Register a DataSource scoped to the webapp
        // This must be linked to the webapp via an entry in web.xml:
        // <resource-ref>
        //   <res-ref-name>jdbc/mydatasource</res-ref-name>
        //   <res-type>javax.sql.DataSource</res-type>
        //   <res-auth>Container</res-auth>
        // </resource-ref>
        // At runtime the webapp accesses this as java:comp/env/jdbc/mydatasource
        new org.eclipse.jetty.plus.jndi.Resource(webapp, "jdbc/IbacasDB", databaseConfiguration.asDataSource());

        server.start();
        server.join();
    }

    private void stop() {
        // TODO: Implement this!!!
    }

    private void usage() {
        System.out.println("Usage: java -jar <file.jar> [start|stop]\n\t" +
                "start    Start the server (default)\n\t" +
                "stop     Stop the server gracefully\n\t"
        );
        System.exit(-1);
    }
}
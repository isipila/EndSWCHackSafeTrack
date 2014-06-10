package com.bjss.foundation.provider;

import java.beans.PropertyVetoException;

import javax.inject.Provider;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mchange.v2.c3p0.ComboPooledDataSource;

public class DataSourceProvider implements Provider<DataSource> {

    private final Logger logger = LoggerFactory.getLogger(DataSourceProvider.class);

    @Override
    public DataSource get() {
        try {
            // Check in JNDI, otherwise create our own.
            final Context context = new InitialContext();

            final DataSource datasource = (DataSource) context.lookup("java:comp/env/jdbc/IbacasDB");

            try {
            	// Server.createWebServer().start();
            } catch (Exception e) {
            	throw new IllegalStateException("Failed to create H2 web server", e);
            }
            
            if (datasource != null) {
                return datasource;
            }

            return getPooledDataSource();
        } catch (NamingException e) {
            logger.warn("Failed to get a datasource from JNDI", e);
            return getPooledDataSource();
        }
    }

    private DataSource getPooledDataSource() {
        final ComboPooledDataSource cpds = new ComboPooledDataSource();
        try {
            cpds.setDriverClass( "org.postgresql.Driver" ); //loads the jdbc driver
        } catch (PropertyVetoException e) {
            System.err.println("Failed to load JDBC driver: org.postgresql.Driver");
            return null;
        }

        cpds.setJdbcUrl( "jdbc:postgresql://localhost/ibacas" );
        cpds.setUser("ibacas");
        cpds.setPassword("ibacas");

        // the settings below are optional -- c3p0 can work with defaults
        cpds.setMinPoolSize(5);
        cpds.setAcquireIncrement(5);
        cpds.setMaxPoolSize(20);

        return cpds;
    }
}

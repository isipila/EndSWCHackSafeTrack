package com.bjss.config;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.constretto.annotation.Configuration;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;

public class DatabaseConfiguration {

    @Configuration("database.driver")
    private String driver;

    @Configuration("database.jdbcUrl")
    private String jdbcUrl;

    @Configuration("database.username")
    private String username;

    @Configuration("database.password")
    private String password;

    public DataSource asDataSource() throws PropertyVetoException {
        final ComboPooledDataSource result = new ComboPooledDataSource();

        // Check for disconnection of IDLE connections every 30 seconds.
        result.setIdleConnectionTestPeriod(30);

        result.setDriverClass(driver);
        result.setJdbcUrl(jdbcUrl);
        result.setUser(username);
        result.setPassword(password);

        return result;
    }
}

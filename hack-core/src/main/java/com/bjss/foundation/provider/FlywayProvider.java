package com.bjss.foundation.provider;

import javax.sql.DataSource;

import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.googlecode.flyway.core.Flyway;

@Singleton
public class FlywayProvider implements Provider<Flyway> {

    private final DataSource dataSource;

    @Inject
    public FlywayProvider(final DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public Flyway get() {
        final Flyway flyway = new Flyway();

        flyway.setDataSource(dataSource);

        flyway.setLocations("db/h2/migration");

        return flyway;
    }
}

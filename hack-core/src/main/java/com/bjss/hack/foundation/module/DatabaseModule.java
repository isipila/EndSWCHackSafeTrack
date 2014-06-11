package com.bjss.hack.foundation.module;

import javax.sql.DataSource;

import org.skife.jdbi.v2.DBI;

import com.bjss.hack.foundation.provider.DataSourceProvider;
import com.bjss.hack.foundation.provider.FlywayProvider;
import com.bjss.hack.foundation.provider.JdbiProvider;
import com.google.inject.AbstractModule;
import com.google.inject.Scopes;
import com.googlecode.flyway.core.Flyway;

public class DatabaseModule extends AbstractModule
{
    @Override
    protected void configure() {
        bind(DataSource.class).toProvider(DataSourceProvider.class).in(Scopes.SINGLETON);
        bind(DBI.class).toProvider(JdbiProvider.class).in(Scopes.SINGLETON);
        bind(Flyway.class).toProvider(FlywayProvider.class);
    }
}

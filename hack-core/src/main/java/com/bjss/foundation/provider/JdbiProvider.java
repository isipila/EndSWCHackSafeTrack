package com.bjss.foundation.provider;

import com.google.inject.Inject;
import com.google.inject.Provider;
import org.skife.jdbi.v2.DBI;

import javax.sql.DataSource;

public class JdbiProvider implements Provider<DBI> {

    private final DBI dbi;

    @Inject
    public JdbiProvider(final DataSource dataSource) {
        this.dbi = new DBI(dataSource);
    }

    @Override
    public DBI get() {
        return dbi;
    }
}

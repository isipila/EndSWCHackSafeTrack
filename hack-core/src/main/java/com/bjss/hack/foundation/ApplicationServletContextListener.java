package com.bjss.hack.foundation;

import java.lang.ref.WeakReference;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;

import com.bjss.hack.foundation.module.ApplicationServletModule;
import com.bjss.hack.foundation.module.AuthenticationModule;
import com.bjss.hack.foundation.module.DatabaseModule;
import com.bjss.hack.foundation.module.JsonModule;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.googlecode.flyway.core.Flyway;

public class ApplicationServletContextListener extends GuiceServletContextListener {

    private static volatile WeakReference<ServletContext> servletContext = new WeakReference<ServletContext>(null);

    private Injector injector;

    @Override
    protected Injector getInjector() {
        injector = Guice.createInjector(
                new ApplicationServletModule(),
        		new AuthenticationModule(servletContext.get()),
                new DatabaseModule(),
                new JsonModule()
        );
        return injector;
    }

    @Override
    public void contextInitialized(final ServletContextEvent servletContextEvent) {
        servletContext = new WeakReference<ServletContext>(servletContextEvent.getServletContext());

        super.contextInitialized(servletContextEvent);

        if (injector != null) {
            injector.getInstance(Flyway.class).migrate();
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        super.contextDestroyed(servletContextEvent);
    }
}

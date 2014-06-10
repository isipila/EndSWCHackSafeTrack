package com.bjss.config;

import org.constretto.annotation.Configuration;

public class ApplicationConfiguration {

    @Configuration("application.contextRoot")
    private String contextRoot;

    @Configuration("application.port")
    private Integer port;

    @Configuration("application.log.configurationFile")
    private String logConfigurationFile;

    @Configuration("application.log.level")
    private String logLevel;

    @Configuration("application.log.file")
    private String logFile;

    @Configuration("application.log.appender")
    private String logAppender;

    @Configuration("application.log.performance.prefix")
    private String perfLogPrefix;

    public String getContextRoot() {
        return contextRoot;
    }

    public Integer getPort() {
        return port;
    }

    public void createSystemProperties() {
        if (logFile != null && !logFile.trim().isEmpty()) {
            System.setProperty("rat.logFile", logFile);
        }

        if (logLevel != null && !logLevel.trim().isEmpty()) {
            System.setProperty("rat.logLevel", logLevel);
        }

        if (logAppender != null && !logAppender.trim().isEmpty()) {
            System.setProperty("rat.logAppender", logAppender);
        }

        if (logConfigurationFile != null && !logConfigurationFile.trim().isEmpty()) {
            System.setProperty("logback.configurationFile", logConfigurationFile);
        }

        if (perfLogPrefix != null) {
            System.setProperty("rat.perfPrefix", perfLogPrefix);
        }
    }
}

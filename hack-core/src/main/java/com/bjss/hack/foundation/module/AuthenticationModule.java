package com.bjss.hack.foundation.module;

import javax.servlet.Filter;
import javax.servlet.ServletContext;

import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.apache.shiro.guice.web.ShiroWebModule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.bjss.hack.foundation.auth.ApplicationJdbcRealm;
import com.google.inject.Key;
import com.google.inject.name.Names;

public class AuthenticationModule extends ShiroWebModule {

    private static final Logger log = LoggerFactory.getLogger(AuthenticationModule.class);

    private final ServletContext servletContext;

    public AuthenticationModule(final ServletContext servletContext) {
        super(servletContext);
        this.servletContext = servletContext;
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void configureShiroWeb() {
        bind(CredentialsMatcher.class).to(HashedCredentialsMatcher.class);
        bindConstant().annotatedWith(Names.named("shiro.hashAlgorithmName")).to(Sha256Hash.ALGORITHM_NAME);
        bindConstant().annotatedWith(Names.named("shiro.loginUrl")).to("/");
        bind(HashedCredentialsMatcher.class);

        try {
            bindRealm().toConstructor(ApplicationJdbcRealm.class.getConstructor());
        } catch (NoSuchMethodException e) {
            addError(e);
        }
        
        // Allows integration tests to run with basic authentication
        Key<? extends Filter> serviceAuthKey = System.getProperty("rat.integrationtest") != null ? AUTHC_BASIC : AUTHC;
        
        addFilterChain("/login", ANON);
        addFilterChain("/app/*.js", ANON);
        addFilterChain("/resources/**", ANON);
        addFilterChain("/extjs/**", ANON);
        addFilterChain("/javascript/**", ANON);
        addFilterChain("/api/**", serviceAuthKey);
        addFilterChain("/**", AUTHC);        
    }
}

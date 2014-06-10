package com.bjss.foundation.auth;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.inject.Singleton;

@Singleton
public class AuthenticationServlet extends HttpServlet {

    private static final Logger LOG = LoggerFactory.getLogger(AuthenticationServlet.class);

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException {
        final String path = request.getServletPath();
    	LOG.info("Authetication request: {}", path);
    	
    	boolean success = false;
    	
        if (path != null && path.equals("/login")) {
	        final String username = request.getParameter("username");
	        final String password = request.getParameter("password");
	
	    	final Subject subject = SecurityUtils.getSubject();
	        if (subject != null) {
	        	try {
	            	subject.login(new UsernamePasswordToken(username, password));
	            	success = true;
	            	LOG.info("Login successful for {}", username);
	            } catch (AuthenticationException e) {
	            	LOG.info("Login failed for {}", username);
	            }
	        } else {
	        	LOG.warn("Security subject is null");
	        }
	        
    	} else if (path != null && path.equals("/logout")) {
        	final Subject subject = SecurityUtils.getSubject();
            if (subject != null) {
            	LOG.info("Logging out {}", subject.getPrincipal());
            	subject.logout();
            	success = true;
            } else {
            	LOG.warn("Security subject is null");
            }
    	}
    	
    	response.setContentType("application/json");
    	response.getOutputStream().write(String.format("{success: %b}", success).getBytes());
    }
}

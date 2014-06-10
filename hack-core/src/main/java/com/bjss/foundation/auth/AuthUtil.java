package com.bjss.foundation.auth;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AuthUtil {

    private static final Logger LOG = LoggerFactory.getLogger(AuthUtil.class);

    public static String getCurrentUserName(final String action) {
        final Subject subject = SecurityUtils.getSubject();
        if (subject == null) {
            LOG.error("Subject was not set when attempting: {}", action);
            return null;
        }

        final Object principal = subject.getPrincipal();
        if (principal == null) {
            LOG.error("Principal was not set when attempting: {}", action);
            return null;
        }

        return principal.toString();
    }
}

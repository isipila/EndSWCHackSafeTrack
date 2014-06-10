package com.bjss.foundation.auth;

import javax.sql.DataSource;

import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.realm.jdbc.JdbcRealm;

import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class ApplicationJdbcRealm extends JdbcRealm {

    @Inject
    public void inject(final DataSource dataSource, final CredentialsMatcher credentialsMatcher) {
        this.dataSource = dataSource;
        this.setCredentialsMatcher(credentialsMatcher);

        this.saltStyle = SaltStyle.COLUMN;
        this.permissionsLookupEnabled = true;
        this.authenticationQuery = "select password, password_salt from account where username = ? and enabled = true";
        this.userRolesQuery = "select role_name from account_role where username = ?";
        this.permissionsQuery = "select permission from role_permission where LCASE(role_name) = LCASE(?)";
    }
}

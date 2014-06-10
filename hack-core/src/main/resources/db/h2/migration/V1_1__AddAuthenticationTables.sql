CREATE TABLE users
(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(64) NOT NULL,
    password_salt VARCHAR(64) NOT NULL
);
CREATE UNIQUE INDEX user_unique_id ON users ( id );
CREATE UNIQUE INDEX user_unique_username ON users ( username );

CREATE TABLE user_roles
(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(100) NOT NULL,
    role_name VARCHAR(100) NOT NULL
);
CREATE UNIQUE INDEX user_roles_unique_id ON user_roles (id);

CREATE TABLE roles_permissions
(
    id SERIAL PRIMARY KEY NOT NULL,
    role_name VARCHAR(100) NOT NULL,
    permission VARCHAR(100) NOT NULL
);
CREATE UNIQUE INDEX roles_permissions_unique_id ON roles_permissions (id);

INSERT INTO users (id, username, password, password_salt) VALUES(0, 'admin', '2d54861211e24c8dc5eb5a2b8f34e33e8d3fc60906a3794f387bfe578520ee0e', '27m6gfoIaMVVu8jpmUZrhbndWRv9myYQ69wQGTl3U3pqt7EroH4FJQstns7iPo8z');
INSERT INTO user_roles (id, username, role_name) VALUES(0, 'admin', 'admin');
INSERT INTO roles_permissions (id, role_name, permission) VALUES(0, 'admin', '*');
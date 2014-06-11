package com.bjss.hack.foundation.database;

public class DatabaseOperationException extends RuntimeException {

    private static final long serialVersionUID = -3298570721658642573L;

    public DatabaseOperationException(String message, Throwable cause) {
        super(message, cause);
    }
}

package com.bjss.hack.foundation.auth;

import java.security.SecureRandom;
import java.util.Random;

public class SecureRandomString {

    /* Assign a string that contains the set of allowed characters */
    private static final String symbols = "ABCDEFGJKLMNPRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_ ";

    private final Random random = new SecureRandom();

    public String nextString(final int length)
    {
        if (length < 1) {
            throw new IllegalArgumentException("length < 1: " + length);
        }

        final char[] buf = new char[length];

        for (int idx = 0; idx < buf.length; idx++) {
            buf[idx] = symbols.charAt(random.nextInt(symbols.length()));
        }

        return new String(buf);
    }
}

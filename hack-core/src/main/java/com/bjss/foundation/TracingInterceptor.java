package com.bjss.foundation;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TracingInterceptor implements MethodInterceptor {

    private static final Logger log = LoggerFactory.getLogger(TracingInterceptor.class);

    @Override
    public Object invoke(final MethodInvocation invocation) throws Throwable {
        long start = System.nanoTime();

        try {
            return invocation.proceed();
        } finally {
            log.info("Invocation of method {}(...) took {} ms.",
                    invocation.getMethod().getName(),
                    String.format("%.1f", (System.nanoTime() - start) / 1000000.0));
        }
    }
}

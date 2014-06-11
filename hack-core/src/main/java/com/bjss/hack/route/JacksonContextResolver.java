package com.bjss.hack.route;

import com.google.inject.Singleton;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.*;
import org.codehaus.jackson.map.PropertyNamingStrategy.LowerCaseWithUnderscoresStrategy;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;

import java.io.IOException;
import java.text.SimpleDateFormat;

@Provider
@Produces(MediaType.APPLICATION_JSON)
@Singleton
public class JacksonContextResolver implements ContextResolver<ObjectMapper> {
    private final ObjectMapper objectMapper;

    public JacksonContextResolver() throws Exception {
        this.objectMapper = new ObjectMapper();
        this.objectMapper
                .configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .configure(SerializationConfig.Feature.INDENT_OUTPUT, true)
                .configure(SerializationConfig.Feature.WRITE_DATES_AS_TIMESTAMPS, false);

        this.objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd"));
        this.objectMapper.setPropertyNamingStrategy(new LowerCaseWithUnderscoresStrategy());
    }

    @Override
    public ObjectMapper getContext(final Class<?> objectType) {
        return objectMapper;
    }

    public static class CustomDateSerializer extends JsonSerializer<DateTime> {

        private static DateTimeFormatter formatter = DateTimeFormat.forPattern("yyyy-MM-dd");

        @Override
        public void serialize(final DateTime value, final JsonGenerator gen, final SerializerProvider arg2)
                throws IOException {
            gen.writeString(formatter.print(value));
        }
    }

    public static class CustomDateTimeSerializer extends JsonSerializer<DateTime> {

        private static DateTimeFormatter formatter = DateTimeFormat.forPattern("yyyy-MM-dd hh:mm:ss");

        @Override
        public void serialize(final DateTime value, final JsonGenerator gen, final SerializerProvider arg2)
                throws IOException {
            gen.writeString(formatter.print(value));
        }
    }
}

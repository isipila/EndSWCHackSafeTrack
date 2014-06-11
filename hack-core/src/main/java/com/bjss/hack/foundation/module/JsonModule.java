package com.bjss.hack.foundation.module;

import com.google.gson.*;
import com.google.inject.AbstractModule;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.lang.reflect.Type;
import java.sql.Date;

public class JsonModule extends AbstractModule {
    @Override
    protected void configure() {
        final Gson gson = new GsonBuilder()
                .registerTypeAdapter(DateTime.class, new DateTimeTypeConverter())
                .disableHtmlEscaping()
                .setPrettyPrinting()
                .create();

        bind(Gson.class).toInstance(gson);
    }

    public static class DateTimeTypeConverter implements JsonSerializer<DateTime>, JsonDeserializer<DateTime> {
        private static final DateTimeFormatter PATTERN = DateTimeFormat.forPattern("yyyy-MM-dd");

        @Override
        public JsonElement serialize(DateTime src, Type srcType, JsonSerializationContext context) {
            return new JsonPrimitive(PATTERN.print(src));
        }

        @Override
        public DateTime deserialize(JsonElement json, Type type, JsonDeserializationContext context)
                throws JsonParseException {
            try {
                return PATTERN.parseDateTime(json.getAsString());
            } catch (IllegalArgumentException e) {
                // May be it came in formatted as a java.util.Date, so try that
                Date date = context.deserialize(json, Date.class);
                return new DateTime(date);
            }
        }
    }
}

package com.bjss.hack.model;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;

import java.math.BigDecimal;

import org.junit.Test;

public class LocationTest {

	@Test
	public void CanDetermineRangeAndBearingFromLondonToParis() {
		Location london = new Location(new BigDecimal("51.508515"), new BigDecimal("-0.1254872"));
		Location paris = new Location(new BigDecimal("48.856614"), new BigDecimal("2.3522219"));
		
		assertThat(london.rangeTo(paris), equalTo(343.67312800898094D));
		assertThat(london.bearingTo(paris), equalTo(149.1174138832777D));
		
		assertThat(paris.bearingTo(london), equalTo(329.1174138832777D));
	}
}

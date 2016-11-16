package org.vizzini.illyriad;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>City</code> class.
 */
public final class CityTest
{
    /**
     * Test the <code>computeDistance()</code> method.
     */
    @Test
    public void computeDistance()
    {
        final double result = City.LOCKSTONE.computeDistance(City.LOCKSLEY);
        assertThat(String.format("%10.1f", result).trim(), is("495.5"));
    }

    /**
     * Test the <code>getOtherCitiesByDistance()</code> method.
     */
    @Test
    public void getOtherCitiesByDistance()
    {
        final List<City> result = City.LOCKSTONE.getOtherCitiesByDistance();
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(8));

        int i = 0;

        assertThat(result.get(i++), is(City.LOCKS_HEATH));
        assertThat(result.get(i++), is(City.LOCKSTAR));
        assertThat(result.get(i++), is(City.LOCK_HAVEN));
        assertThat(result.get(i++), is(City.LOCKAND_KEY));
        assertThat(result.get(i++), is(City.LOCK_STEPPE));
        assertThat(result.get(i++), is(City.LOCK_DOWNS));
        assertThat(result.get(i++), is(City.LOCKSLEY));
        assertThat(result.get(i++), is(City.LOCKMOOR));
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        assertThat(City.LOCKSTONE.toString(), is("Lockstone"));
    }
}

package org.vizzini.illyriad.map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>MapSquareParser</code> class.
 */
public final class MapSquareParserTest
{
    /** Data line. */
    private static final String LINE0 = "2250192|67|-124|5|3|5|5|7|12|7|15";

    /**
     * Test the <code>getClay()</code> method.
     */
    @Test
    public void getClay()
    {
        // Setup.
        final MapSquareParser parser = new MapSquareParser();
        final String[] parts = parser.split(LINE0);

        // Run.
        final int result = parser.getClay(parts);

        // Verify.
        assertThat(result, is(3));
    }

    /**
     * Test the <code>getFood()</code> method.
     */
    @Test
    public void getFood()
    {
        // Setup.
        final MapSquareParser parser = new MapSquareParser();
        final String[] parts = parser.split(LINE0);

        // Run.
        final int result = parser.getFood(parts);

        // Verify.
        assertThat(result, is(7));
    }

    /**
     * Test the <code>getGeoId()</code> method.
     */
    @Test
    public void getGeoId()
    {
        // Setup.
        final MapSquareParser parser = new MapSquareParser();
        final String[] parts = parser.split(LINE0);

        // Run.
        final int result = parser.getGeoId(parts);

        // Verify.
        assertThat(result, is(2250192));
    }

    /**
     * Test the <code>getIron()</code> method.
     */
    @Test
    public void getIron()
    {
        // Setup.
        final MapSquareParser parser = new MapSquareParser();
        final String[] parts = parser.split(LINE0);

        // Run.
        final int result = parser.getIron(parts);

        // Verify.
        assertThat(result, is(5));
    }

    /**
     * Test the <code>getRegionId()</code> method.
     */
    @Test
    public void getRegionId()
    {
        // Setup.
        final MapSquareParser parser = new MapSquareParser();
        final String[] parts = parser.split(LINE0);

        // Run.
        final int result = parser.getRegionId(parts);

        // Verify.
        assertThat(result, is(15));
    }

    /**
     * Test the <code>getStone()</code> method.
     */
    @Test
    public void getStone()
    {
        // Setup.
        final MapSquareParser parser = new MapSquareParser();
        final String[] parts = parser.split(LINE0);

        // Run.
        final int result = parser.getStone(parts);

        // Verify.
        assertThat(result, is(5));
    }

    /**
     * Test the <code>getTerrainCombatTypeId()</code> method.
     */
    @Test
    public void getTerrainCombatTypeId()
    {
        // Setup.
        final MapSquareParser parser = new MapSquareParser();
        final String[] parts = parser.split(LINE0);

        // Run.
        final int result = parser.getTerrainCombatTypeId(parts);

        // Verify.
        assertThat(result, is(7));
    }

    /**
     * Test the <code>getTerrainSpecificTypeId()</code> method.
     */
    @Test
    public void getTerrainSpecificTypeId()
    {
        // Setup.
        final MapSquareParser parser = new MapSquareParser();
        final String[] parts = parser.split(LINE0);

        // Run.
        final int result = parser.getTerrainSpecificTypeId(parts);

        // Verify.
        assertThat(result, is(12));
    }

    /**
     * Test the <code>getWood()</code> method.
     */
    @Test
    public void getWood()
    {
        // Setup.
        final MapSquareParser parser = new MapSquareParser();
        final String[] parts = parser.split(LINE0);

        // Run.
        final int result = parser.getWood(parts);

        // Verify.
        assertThat(result, is(5));
    }
}

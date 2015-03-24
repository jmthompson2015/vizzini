package org.vizzini.illyriad.map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>NoCacheTownDatabase</code> class.
 */
public final class NoCacheTownDatabaseTest
{
    /** Geospatial ID converter. */
    private static final GeoIdConverter converter = new GeoIdConverter(true);

    /**
     * Test the <code>NoCacheTownDatabase()</code> method.
     */
    @Test
    public void testConstructorElgea()
    {
        final TownDatabase database = new NoCacheTownDatabase(converter);

        verifyDatabaseElgea(database);
    }

    /**
     * Test the <code>NoCacheTownDatabase()</code> method.
     */
    @Test
    public void testConstructorElgeaNull()
    {
        // Run/Verify.
        try
        {
            new NoCacheTownDatabase(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("converter is null"));
        }
    }

    /**
     * Test the <code>NoCacheTownDatabase()</code> method.
     */
    @Test
    public void testConstructorTwoArgElgea()
    {
        // Run.
        final TownDatabase database = new NoCacheTownDatabase(converter);

        // Verify.
        verifyDatabaseElgea(database);
    }

    /**
     * @param database Database.
     */
    private void verifyDatabaseElgea(final TownDatabase database)
    {
        assertNotNull(database);

        // System.out.println("database = " + database);

        assertThat(database.getTownSquares().cardinality(), is(24520));

        {
            final int index = converter.coordsToIndex(-522, -482);
            assertTrue(database.getTownSquares().get(index));
        }
    }
}

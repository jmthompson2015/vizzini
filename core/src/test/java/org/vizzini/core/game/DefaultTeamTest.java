package org.vizzini.core.game;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultTeam</code> class.
 */
public final class DefaultTeamTest
{
    /**
     * Test the <code>DefaultTeam()</code> method.
     */
    @Test
    public void testConstructor()
    {
        // Setup.
        final String name = "team";
        final String description = "some team";

        // Run.
        final Team result = new DefaultTeam(name, description);

        // Verify.
        assertNotNull(result);
        assertThat(result.getName(), is("team"));
        assertThat(result.getDescription(), is("some team"));
    }

    /**
     * Test the <code>DefaultTeam()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final String name = "token";
        final String description = "some token";

        try
        {
            new DefaultTeam(null, description);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new DefaultTeam("", description);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new DefaultTeam(name, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("description is null or empty"));
        }

        try
        {
            new DefaultTeam(name, "");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("description is null or empty"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final Team token0 = create0();
        final Team token1 = create1();
        final Team token2 = create0();

        assertTrue(token0.equals(token0));
        assertFalse(token0.equals(token1));
        assertTrue(token0.equals(token2));

        assertFalse(token1.equals(token0));
        assertTrue(token1.equals(token1));
        assertFalse(token1.equals(token2));

        assertTrue(token2.equals(token0));
        assertFalse(token2.equals(token1));
        assertTrue(token2.equals(token2));

        assertFalse(token0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final Team token0 = create0();
        final Team token1 = create1();
        final Team token2 = create0();

        assertTrue(token0.hashCode() == token0.hashCode());
        assertFalse(token0.hashCode() == token1.hashCode());
        assertTrue(token0.hashCode() == token2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final Team token0 = create0();

        final String result = token0.toString();

        assertNotNull(result);
        final String expected = "DefaultTeam[description=some team 0,name=team0]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new team.
     */
    private Team create0()
    {
        return new DefaultTeam("team0", "some team 0");
    }

    /**
     * @return a new team.
     */
    private Team create1()
    {
        return new DefaultTeam("team1", "some team 1");
    }
}

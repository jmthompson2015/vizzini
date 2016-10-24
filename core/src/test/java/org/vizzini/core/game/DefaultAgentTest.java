package org.vizzini.core.game;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultAgent</code> class.
 */
public final class DefaultAgentTest
{
    /**
     * Test the <code>DefaultAgent()</code> method.
     */
    @Test
    public void testConstructor()
    {
        // Setup.
        final String name = "agent";
        final String description = "some agent";
        final Team team = new DefaultTeam("team", "some team");

        // Run.
        final Agent result = new DefaultAgent(name, description, team);

        // Verify.
        assertNotNull(result);
        assertThat(result.getName(), is("agent"));
        assertThat(result.getDescription(), is("some agent"));
        assertThat(result.getTeam(), is(team));
    }

    /**
     * Test the <code>DefaultAgent()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final String name = "token";
        final String description = "some token";
        final Team team = new DefaultTeam("team", "some team");

        try
        {
            new DefaultAgent(null, description, team);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new DefaultAgent("", description, team);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new DefaultAgent(name, null, team);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("description is null or empty"));
        }

        try
        {
            new DefaultAgent(name, "", team);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("description is null or empty"));
        }

        try
        {
            new DefaultAgent(name, description, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("team is null"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final Agent token0 = create0();
        final Agent token1 = create1();
        final Agent token2 = create0();

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
        final Agent token0 = create0();
        final Agent token1 = create1();
        final Agent token2 = create0();

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
        final Agent token0 = create0();

        final String result = token0.toString();

        assertNotNull(result);
        final String expected = "DefaultAgent[description=some token 0,name=token0,team=DefaultTeam[description=some team 0,name=team0]]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new agent.
     */
    private Agent create0()
    {
        return new DefaultAgent("token0", "some token 0", createTeam0());
    }

    /**
     * @return a new agent.
     */
    private Agent create1()
    {
        return new DefaultAgent("token1", "some token 1", createTeam1());
    }

    /**
     * @return a new team.
     */
    private Team createTeam0()
    {
        return new DefaultTeam("team0", "some team 0");
    }

    /**
     * @return a new team.
     */
    private Team createTeam1()
    {
        return new DefaultTeam("team1", "some team 1");
    }
}

package org.vizzini.core.game;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultToken</code> class.
 */
public final class DefaultTokenTest
{
    /**
     * Test the <code>DefaultToken()</code> method.
     */
    @Test
    public void testConstructor()
    {
        // Setup.
        final String name = "token";
        final String description = "some token";
        final Team team = new DefaultTeam("team", "some team");
        final Agent agent = new DefaultAgent("some agent", "agent", team);

        // Run.
        final Token result = new DefaultToken(name, description, team, agent);

        // Verify.
        assertNotNull(result);
        assertThat(result.getName(), is("token"));
        assertThat(result.getDescription(), is("some token"));
        assertThat(result.getTeam(), is(team));
        assertThat(result.getAgent(), is(agent));
    }

    /**
     * Test the <code>DefaultToken()</code> method.
     */
    @Test
    public void testConstructorAgentTeamMismatch()
    {
        // Setup.
        final String name = "token";
        final String description = "some token";
        final Team team0 = createTeam0();
        final Team team1 = createTeam1();
        final Agent agent = new DefaultAgent("some agent", "agent", team1);

        try
        {
            new DefaultToken(name, description, team0, agent);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(
                    e.getMessage(),
                    is("Agent does not belong to team: DefaultAgent[description=agent,name=some agent,team=DefaultTeam[description=some team 1,name=team1]] DefaultTeam[description=some team 0,name=team0]"));
        }
    }

    /**
     * Test the <code>DefaultToken()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final String name = "token";
        final String description = "some token";
        final Team team = null;
        final Agent agent = null;

        try
        {
            new DefaultToken(null, description, team, agent);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new DefaultToken("", description, team, agent);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new DefaultToken(name, null, team, agent);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("description is null or empty"));
        }

        try
        {
            new DefaultToken(name, "", team, agent);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("description is null or empty"));
        }

        final Token result = new DefaultToken(name, description, team, agent);
        assertNotNull(result);
        assertNull(result.getAgent());
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final Token token0 = create0();
        final Token token1 = create1();
        final Token token2 = create0();

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
        final Token token0 = create0();
        final Token token1 = create1();
        final Token token2 = create0();

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
        final Token token0 = create0();

        final String result = token0.toString();

        assertNotNull(result);
        final String expected = "DefaultToken[agent=<null>,description=some token 0,name=token0,team=DefaultTeam[description=some team 0,name=team0]]";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>withAgent()</code> method.
     */
    @Test
    public void withAgent()
    {
        // Setup.
        final String name = "token";
        final String description = "some token";
        final Team team = new DefaultTeam("team", "some team");
        final Agent agent = new DefaultAgent("some agent", "agent", team);
        final Token token = new DefaultToken(name, description, team);
        assertNull(token.getAgent());

        // Run.
        final Token result = token.withAgent(agent);

        // Verify.
        assertNotNull(result);
        assertNotNull(result.getAgent());
        assertThat(result.getName(), is("token"));
        assertThat(result.getDescription(), is("some token"));
        assertThat(result.getTeam(), is(team));
        assertThat(result.getAgent(), is(agent));
        assertTrue(result.equals(token));
    }

    /**
     * Test the <code>withAgent()</code> method.
     */
    @Test
    public void withAgentTeamMismatch()
    {
        // Setup.
        final String name = "token";
        final String description = "some token";
        final Team team0 = createTeam0();
        final Token token = new DefaultToken(name, description, team0);
        assertNull(token.getAgent());

        final Team team1 = createTeam1();
        final Agent agent = new DefaultAgent("some agent", "agent", team1);

        try
        {
            token.withAgent(agent);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(
                    e.getMessage(),
                    is("Agent does not belong to team: DefaultAgent[description=agent,name=some agent,team=DefaultTeam[description=some team 1,name=team1]] DefaultTeam[description=some team 0,name=team0]"));
        }
    }

    /**
     * @return a new token.
     */
    private Token create0()
    {
        return new DefaultToken("token0", "some token 0", createTeam0());
    }

    /**
     * @return a new token.
     */
    private Token create1()
    {
        return new DefaultToken("token1", "some token 1", createTeam1());
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

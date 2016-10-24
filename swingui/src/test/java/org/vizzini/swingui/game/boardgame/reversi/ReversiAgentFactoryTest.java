package org.vizzini.swingui.game.boardgame.reversi;

import static org.hamcrest.CoreMatchers.instanceOf;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.example.boardgame.reversi.MediumAgent;
import org.vizzini.example.boardgame.reversi.ReversiActionGenerator;
import org.vizzini.example.boardgame.reversi.ReversiTeam;
import org.vizzini.example.boardgame.reversi.SimpleAgent;
import org.vizzini.swingui.game.boardgame.AgentFactory;

/**
 * Provides tests for the <code>AgentFactory</code> class.
 */
public final class ReversiAgentFactoryTest
{
    /** Action generator. */
    final ReversiActionGenerator actionGenerator = new ReversiActionGenerator();

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void create2Null()
    {
        // Setup.
        final AgentFactory agentFactory = new ReversiAgentFactory(actionGenerator);

        try
        {
            agentFactory.create(null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("team is null"));
        }

        try
        {
            agentFactory.create(null, ReversiTeam.BLACK);
            fail("Should have thrown an exception");
        }
        catch (final RuntimeException e)
        {
            assertThat(e.getMessage(), is("Unknown agent type: null"));
        }

        try
        {
            agentFactory.create(SimpleAgent.class, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("team is null"));
        }
    }

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void create3Null()
    {
        // Setup.
        final AgentFactory agentFactory = new ReversiAgentFactory(actionGenerator);

        try
        {
            agentFactory.create(null, null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("team is null"));
        }

        try
        {
            agentFactory.create(null, null, ReversiTeam.BLACK);
            fail("Should have thrown an exception");
        }
        catch (final RuntimeException e)
        {
            assertThat(e.getMessage(), is("Unknown agent type: null"));
        }

        try
        {
            agentFactory.create(SimpleAgent.class, null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("team is null"));
        }
    }

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createMediumAgent()
    {
        // Setup.
        final AgentFactory agentFactory = new ReversiAgentFactory(actionGenerator);

        // Run.
        final Agent result = agentFactory.create(MediumAgent.class, "medium", ReversiTeam.WHITE);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(MediumAgent.class));
        assertThat(result.getName(), is("medium"));
        assertThat((ReversiTeam)result.getTeam(), is(ReversiTeam.WHITE));
    }

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createMouseAgent()
    {
        // Setup.
        final AgentFactory agentFactory = new ReversiAgentFactory(actionGenerator);

        // Run.
        final Agent result = agentFactory.create(MouseAgent.class, "mouse", ReversiTeam.WHITE);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(MouseAgent.class));
        assertThat(result.getName(), is("mouse"));
        assertThat((ReversiTeam)result.getTeam(), is(ReversiTeam.WHITE));
    }

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createSimpleAgent()
    {
        // Setup.
        final AgentFactory agentFactory = new ReversiAgentFactory(actionGenerator);

        // Run.
        final Agent result = agentFactory.create(SimpleAgent.class, "simple", ReversiTeam.BLACK);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(SimpleAgent.class));
        assertThat(result.getName(), is("simple"));
        assertThat((ReversiTeam)result.getTeam(), is(ReversiTeam.BLACK));
    }
}

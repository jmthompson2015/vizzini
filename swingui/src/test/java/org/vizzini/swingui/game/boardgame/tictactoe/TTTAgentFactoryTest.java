package org.vizzini.swingui.game.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.instanceOf;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.example.boardgame.tictactoe.EnvironmentStringifier;
import org.vizzini.example.boardgame.tictactoe.LearningAgent;
import org.vizzini.example.boardgame.tictactoe.MediumAgent;
import org.vizzini.example.boardgame.tictactoe.SimpleAgent;
import org.vizzini.example.boardgame.tictactoe.TTTActionGenerator;
import org.vizzini.example.boardgame.tictactoe.TTTTeam;
import org.vizzini.swingui.game.boardgame.AgentFactory;

/**
 * Provides tests for the <code>AgentFactory</code> class.
 */
public final class TTTAgentFactoryTest
{
    /** Action generator. */
    final TTTActionGenerator actionGenerator = new TTTActionGenerator();

    /** Environment stringifier. */
    final EnvironmentStringifier environmentStringifier = new EnvironmentStringifier();

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void create2Null()
    {
        // Setup.
        final AgentFactory agentFactory = new TTTAgentFactory(actionGenerator, environmentStringifier);

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
            agentFactory.create(null, TTTTeam.X);
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
        final AgentFactory agentFactory = new TTTAgentFactory(actionGenerator, environmentStringifier);

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
            agentFactory.create(null, null, TTTTeam.X);
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
    public void createLearningAgent()
    {
        // Setup.
        final AgentFactory agentFactory = new TTTAgentFactory(actionGenerator, environmentStringifier);

        // Run.
        final Agent result = agentFactory.create(LearningAgent.class, "learning", TTTTeam.X);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(LearningAgent.class));
        assertThat(result.getName(), is("learning"));
        assertThat((TTTTeam)result.getTeam(), is(TTTTeam.X));
    }

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createMediumAgent()
    {
        // Setup.
        final AgentFactory agentFactory = new TTTAgentFactory(actionGenerator, environmentStringifier);

        // Run.
        final Agent result = agentFactory.create(MediumAgent.class, "medium", TTTTeam.O);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(MediumAgent.class));
        assertThat(result.getName(), is("medium"));
        assertThat((TTTTeam)result.getTeam(), is(TTTTeam.O));
    }

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createMouseAgent()
    {
        // Setup.
        final AgentFactory agentFactory = new TTTAgentFactory(actionGenerator, environmentStringifier);

        // Run.
        final Agent result = agentFactory.create(MouseAgent.class, "mouse", TTTTeam.O);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(MouseAgent.class));
        assertThat(result.getName(), is("mouse"));
        assertThat((TTTTeam)result.getTeam(), is(TTTTeam.O));
    }

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createSimpleAgent()
    {
        // Setup.
        final AgentFactory agentFactory = new TTTAgentFactory(actionGenerator, environmentStringifier);

        // Run.
        final Agent result = agentFactory.create(SimpleAgent.class, "simple", TTTTeam.X);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(SimpleAgent.class));
        assertThat(result.getName(), is("simple"));
        assertThat((TTTTeam)result.getTeam(), is(TTTTeam.X));
    }
}

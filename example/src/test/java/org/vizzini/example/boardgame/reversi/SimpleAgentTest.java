package org.vizzini.example.boardgame.reversi;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>SimpleAgent</code> class.
 */
public final class SimpleAgentTest
{
    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final Agent agent0 = create0();
        final Agent agent1 = create1();
        final Agent agent2 = create0();

        assertTrue(agent0.equals(agent0));
        assertFalse(agent0.equals(agent1));
        assertTrue(agent0.equals(agent2));

        assertFalse(agent1.equals(agent0));
        assertTrue(agent1.equals(agent1));
        assertFalse(agent1.equals(agent2));

        assertTrue(agent2.equals(agent0));
        assertFalse(agent2.equals(agent1));
        assertTrue(agent2.equals(agent2));

        assertFalse(agent0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final Agent agent0 = create0();
        final Agent agent1 = create1();
        final Agent agent2 = create0();

        assertTrue(agent0.hashCode() == agent0.hashCode());
        assertFalse(agent0.hashCode() == agent1.hashCode());
        assertTrue(agent0.hashCode() == agent2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final Agent agent0 = create0();

        final String result = agent0.toString();

        assertNotNull(result);
        final String expected = "SimpleAgent[name=agent0,team=ReversiTeam[description=team black,name=Black]]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new agent.
     */
    private Agent create0()
    {
        final ReversiActionGenerator actionGenerator = new ReversiActionGenerator();

        return new SimpleAgent("agent0", ReversiTeam.BLACK, actionGenerator);
    }

    /**
     * @return a new agent.
     */
    private Agent create1()
    {
        final ReversiActionGenerator actionGenerator = new ReversiActionGenerator();

        return new SimpleAgent("agent1", ReversiTeam.WHITE, actionGenerator);
    }
}

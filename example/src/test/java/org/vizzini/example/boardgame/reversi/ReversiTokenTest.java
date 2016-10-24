package org.vizzini.example.boardgame.reversi;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>ReversiToken</code> class.
 */
public final class ReversiTokenTest
{
    /**
     * Test the <code>findByTeam()</code> method.
     */
    @Test
    public void findByTeam()
    {
        assertThat(ReversiToken.findByTeam(ReversiTeam.BLACK), is(ReversiToken.BLACK));
        assertThat(ReversiToken.findByTeam(ReversiTeam.WHITE), is(ReversiToken.WHITE));
    }

    /**
     * Test the <code>findByTeam()</code> method.
     */
    @Test
    public void findByTeamNull()
    {
        try
        {
            ReversiToken.findByTeam(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("team is null"));
        }
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(ReversiToken.BLACK.getName(), is("Black"));
        assertThat(ReversiToken.WHITE.getName(), is("White"));
    }

    /**
     * Test the <code>opposite()</code> method.
     */
    @Test
    public void opposite()
    {
        assertThat(ReversiToken.BLACK.opposite(), is(ReversiToken.WHITE));
        assertThat(ReversiToken.WHITE.opposite(), is(ReversiToken.BLACK));

        final ReversiActionGenerator actionGenerator = new ReversiActionGenerator();
        final Agent agent = new SimpleAgent("Bond", ReversiTeam.BLACK, actionGenerator);
        final ReversiToken token = ReversiToken.BLACK.withAgent(agent);
        assertThat(token.opposite(), is(ReversiToken.WHITE));
    }
}

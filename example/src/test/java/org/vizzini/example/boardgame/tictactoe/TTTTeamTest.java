package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>TTTTeam</code> class.
 */
public final class TTTTeamTest
{
    /**
     * Test the <code>getDescription()</code> method.
     */
    @Test
    public void getDescription()
    {
        assertThat(TTTTeam.X.getDescription(), is("team x"));
        assertThat(TTTTeam.O.getDescription(), is("team o"));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(TTTTeam.X.getName(), is("X"));
        assertThat(TTTTeam.O.getName(), is("O"));
    }
}

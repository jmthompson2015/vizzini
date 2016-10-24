package org.vizzini.example.boardgame.reversi;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>ReversiTeam</code> class.
 */
public final class ReversiTeamTest
{
    /**
     * Test the <code>getDescription()</code> method.
     */
    @Test
    public void getDescription()
    {
        assertThat(ReversiTeam.BLACK.getDescription(), is("team black"));
        assertThat(ReversiTeam.WHITE.getDescription(), is("team white"));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(ReversiTeam.BLACK.getName(), is("Black"));
        assertThat(ReversiTeam.WHITE.getName(), is("White"));
    }
}

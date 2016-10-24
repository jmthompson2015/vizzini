package org.vizzini.example.boardgame.checkers;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>CheckersTeam</code> class.
 */
public final class CheckersTeamTest
{
    /**
     * Test the <code>getDescription()</code> method.
     */
    @Test
    public void getDescription()
    {
        assertThat(CheckersTeam.RED.getDescription(), is("team red"));
        assertThat(CheckersTeam.WHITE.getDescription(), is("team white"));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(CheckersTeam.RED.getName(), is("Red"));
        assertThat(CheckersTeam.WHITE.getName(), is("White"));
    }
}

package org.vizzini.example.boardgame.qubic;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>QubicTeam</code> class.
 */
public final class QubicTeamTest
{
    /**
     * Test the <code>getDescription()</code> method.
     */
    @Test
    public void getDescription()
    {
        assertThat(QubicTeam.X.getDescription(), is("team x"));
        assertThat(QubicTeam.O.getDescription(), is("team o"));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(QubicTeam.X.getName(), is("X"));
        assertThat(QubicTeam.O.getName(), is("O"));
    }
}

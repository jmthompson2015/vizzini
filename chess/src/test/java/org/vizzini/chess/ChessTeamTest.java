package org.vizzini.chess;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>ChessTeam</code> class.
 */
public final class ChessTeamTest
{
    /**
     * Test the <code>getDescription()</code> method.
     */
    @Test
    public void getDescription()
    {
        assertThat(ChessTeam.WHITE.getDescription(), is("team white"));
        assertThat(ChessTeam.BLACK.getDescription(), is("team black"));
    }

    /**
     * Test the <code>getInitial()</code> method.
     */
    @Test
    public void getInitial()
    {
        assertThat(ChessTeam.WHITE.getInitial(), is("W"));
        assertThat(ChessTeam.BLACK.getInitial(), is("B"));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(ChessTeam.WHITE.getName(), is("White"));
        assertThat(ChessTeam.BLACK.getName(), is("Black"));
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        assertTrue(ChessTeam.WHITE.equals(ChessTeam.WHITE));
        assertFalse(ChessTeam.WHITE.equals(ChessTeam.BLACK));
        assertFalse(ChessTeam.BLACK.equals(ChessTeam.WHITE));
        assertTrue(ChessTeam.BLACK.equals(ChessTeam.BLACK));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        assertTrue(ChessTeam.WHITE.hashCode() == ChessTeam.WHITE.hashCode());
        assertFalse(ChessTeam.WHITE.hashCode() == ChessTeam.BLACK.hashCode());
        assertFalse(ChessTeam.BLACK.hashCode() == ChessTeam.WHITE.hashCode());
        assertTrue(ChessTeam.BLACK.hashCode() == ChessTeam.BLACK.hashCode());
    }
}

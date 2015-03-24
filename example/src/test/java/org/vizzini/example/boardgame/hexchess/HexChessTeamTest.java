package org.vizzini.example.boardgame.hexchess;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>HexChessTeam</code> class.
 */
public final class HexChessTeamTest
{
    /**
     * Test the <code>getDescription()</code> method.
     */
    @Test
    public void getDescription()
    {
        assertThat(HexChessTeam.WHITE.getDescription(), is("team white"));
        assertThat(HexChessTeam.BLACK.getDescription(), is("team black"));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(HexChessTeam.WHITE.getName(), is("White"));
        assertThat(HexChessTeam.BLACK.getName(), is("Black"));
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        assertTrue(HexChessTeam.WHITE.equals(HexChessTeam.WHITE));
        assertFalse(HexChessTeam.WHITE.equals(HexChessTeam.BLACK));
        assertFalse(HexChessTeam.BLACK.equals(HexChessTeam.WHITE));
        assertTrue(HexChessTeam.BLACK.equals(HexChessTeam.BLACK));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        assertTrue(HexChessTeam.WHITE.hashCode() == HexChessTeam.WHITE.hashCode());
        assertFalse(HexChessTeam.WHITE.hashCode() == HexChessTeam.BLACK.hashCode());
        assertFalse(HexChessTeam.BLACK.hashCode() == HexChessTeam.WHITE.hashCode());
        assertTrue(HexChessTeam.BLACK.hashCode() == HexChessTeam.BLACK.hashCode());
    }
}

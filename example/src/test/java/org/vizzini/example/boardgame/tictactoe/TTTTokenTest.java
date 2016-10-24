package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>TTTToken</code> class.
 */
public final class TTTTokenTest
{
    /**
     * Test the <code>findByName()</code> method.
     */
    @Test
    public void findByName()
    {
        assertThat(TTTToken.findByName("X"), is(TTTToken.X));
        assertThat(TTTToken.findByName("O"), is(TTTToken.O));
    }

    /**
     * Test the <code>findByName()</code> method.
     */
    @Test
    public void findByNameNull()
    {
        try
        {
            TTTToken.findByName(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            TTTToken.findByName("");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        assertNull(TTTToken.findByName("bogus"));
    }

    /**
     * Test the <code>findByTeam()</code> method.
     */
    @Test
    public void findByTeam()
    {
        assertThat(TTTToken.findByTeam(TTTTeam.X), is(TTTToken.X));
        assertThat(TTTToken.findByTeam(TTTTeam.O), is(TTTToken.O));
    }

    /**
     * Test the <code>findByTeam()</code> method.
     */
    @Test
    public void findByTeamNull()
    {
        try
        {
            TTTToken.findByTeam(null);
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
        assertThat(TTTToken.X.getName(), is("X"));
        assertThat(TTTToken.O.getName(), is("O"));
    }

    /**
     * Test the <code>getTeam()</code> method.
     */
    @Test
    public void getTeam()
    {
        assertThat(TTTToken.X.getTeam(), is(TTTTeam.X));
        assertThat(TTTToken.O.getTeam(), is(TTTTeam.O));
    }

    /**
     * Test the <code>opposite()</code> method.
     */
    @Test
    public void opposite()
    {
        assertThat(TTTToken.X.opposite(), is(TTTToken.O));
        assertThat(TTTToken.O.opposite(), is(TTTToken.X));
    }
}

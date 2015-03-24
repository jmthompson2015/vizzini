package org.vizzini.example.boardgame.qubic;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>QubicToken</code> class.
 */
public final class QubicTokenTest
{
    /**
     * Test the <code>findByName()</code> method.
     */
    @Test
    public void findByName()
    {
        assertThat(QubicToken.findByName("X"), is(QubicToken.X));
        assertThat(QubicToken.findByName("O"), is(QubicToken.O));
    }

    /**
     * Test the <code>findByName()</code> method.
     */
    @Test
    public void findByNameNull()
    {
        try
        {
            QubicToken.findByName(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            QubicToken.findByName("");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        assertNull(QubicToken.findByName("bogus"));
    }

    /**
     * Test the <code>findByTeam()</code> method.
     */
    @Test
    public void findByTeam()
    {
        assertThat(QubicToken.findByTeam(QubicTeam.X), is(QubicToken.X));
        assertThat(QubicToken.findByTeam(QubicTeam.O), is(QubicToken.O));
    }

    /**
     * Test the <code>findByTeam()</code> method.
     */
    @Test
    public void findByTeamNull()
    {
        try
        {
            QubicToken.findByTeam(null);
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
        assertThat(QubicToken.X.getName(), is("X"));
        assertThat(QubicToken.O.getName(), is("O"));
    }

    /**
     * Test the <code>getTeam()</code> method.
     */
    @Test
    public void getTeam()
    {
        assertThat(QubicToken.X.getTeam(), is(QubicTeam.X));
        assertThat(QubicToken.O.getTeam(), is(QubicTeam.O));
    }

    /**
     * Test the <code>opposite()</code> method.
     */
    @Test
    public void opposite()
    {
        assertThat(QubicToken.X.opposite(), is(QubicToken.O));
        assertThat(QubicToken.O.opposite(), is(QubicToken.X));
    }
}

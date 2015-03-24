package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>Statistics</code> class.
 */
public final class StatisticsTest
{
    /**
     * Test the <code>getRating()</code> method.
     */
    @Test
    public void getRating()
    {
        // Setup.
        final Statistics statistics = new Statistics();

        for (int i = 0; i < 2; i++)
        {
            statistics.incrementWins();
        }

        for (int i = 0; i < 3; i++)
        {
            statistics.incrementDraws();
        }

        for (int i = 0; i < 4; i++)
        {
            statistics.incrementLosses();
        }

        // Verify.
        assertThat(statistics.getWinCount(), is(2));
        assertThat(statistics.getDrawCount(), is(3));
        assertThat(statistics.getLossCount(), is(4));
        assertThat(statistics.getPlayCount(), is(9));
        assertThat(Math.round(statistics.getRating() * 10000.0) / 10000.0, is(-0.4444));
    }

    /**
     * Test the <code>incrementDraws()</code> method.
     */
    @Test
    public void incrementDraws()
    {
        // Setup.
        final Statistics statistics = new Statistics();

        for (int i = 0; i < 3; i++)
        {
            statistics.incrementDraws();
        }

        // Verify.
        assertThat(statistics.getWinCount(), is(0));
        assertThat(statistics.getDrawCount(), is(3));
        assertThat(statistics.getLossCount(), is(0));
        assertThat(statistics.getPlayCount(), is(3));
    }

    /**
     * Test the <code>incrementLosses()</code> method.
     */
    @Test
    public void incrementLosses()
    {
        // Setup.
        final Statistics statistics = new Statistics();

        for (int i = 0; i < 3; i++)
        {
            statistics.incrementLosses();
        }

        // Verify.
        assertThat(statistics.getWinCount(), is(0));
        assertThat(statistics.getDrawCount(), is(0));
        assertThat(statistics.getLossCount(), is(3));
        assertThat(statistics.getPlayCount(), is(3));
    }

    /**
     * Test the <code>incrementWins()</code> method.
     */
    @Test
    public void incrementWins()
    {
        // Setup.
        final Statistics statistics = new Statistics();

        for (int i = 0; i < 3; i++)
        {
            statistics.incrementWins();
        }

        // Verify.
        assertThat(statistics.getWinCount(), is(3));
        assertThat(statistics.getDrawCount(), is(0));
        assertThat(statistics.getLossCount(), is(0));
        assertThat(statistics.getPlayCount(), is(3));
    }

    /**
     * Test the <code>Statistics()</code> method.
     */
    @Test
    public void testConstructor()
    {
        // Setup.
        final Statistics statistics = new Statistics();

        // Verify.
        assertThat(statistics.getWinCount(), is(0));
        assertThat(statistics.getDrawCount(), is(0));
        assertThat(statistics.getLossCount(), is(0));
        assertThat(statistics.getPlayCount(), is(0));
    }
}

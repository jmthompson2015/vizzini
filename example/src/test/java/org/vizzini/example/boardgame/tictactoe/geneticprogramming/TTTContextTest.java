package org.vizzini.example.boardgame.tictactoe.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.example.boardgame.tictactoe.TTTEnvironment;
import org.vizzini.example.boardgame.tictactoe.TTTTeam;

/**
 * Provides tests for the <code>TTTContext</code> class.
 */
public final class TTTContextTest
{
    /**
     * Test the <code>TTTContext()</code> method.
     */
    @Test
    public void testConstructorO()
    {
        // Setup.
        final TTTEnvironment environment = new TTTEnvironment();

        // Run.
        final TTTContext result = new TTTContext(environment, TTTTeam.O);

        // Verify.
        assertThat(result.getEnvironment(), is(environment));
        assertThat(result.getWhoseMove(), is(TTTTeam.O));
    }

    /**
     * Test the <code>TTTContext()</code> method.
     */
    @Test
    public void testConstructorX()
    {
        // Setup.
        final TTTEnvironment environment = new TTTEnvironment();

        // Run.
        final TTTContext result = new TTTContext(environment, TTTTeam.X);

        // Verify.
        assertThat(result.getEnvironment(), is(environment));
        assertThat(result.getWhoseMove(), is(TTTTeam.X));
    }
}

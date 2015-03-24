package org.vizzini.example.boardgame.checkers;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>King</code> class.
 */
public final class KingTest
{
    /**
     * Test the <code>getDescription()</code> method.
     */
    @Test
    public void getDescription()
    {
        assertThat(King.RED.getDescription(), is("red king"));
        assertThat(King.WHITE.getDescription(), is("white king"));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(King.RED.getName(), is("Red King"));
        assertThat(King.WHITE.getName(), is("White King"));
    }

    /**
     * Test the <code>opposite()</code> method.
     */
    @Test
    public void opposite()
    {
        assertThat(King.RED.opposite(), is(King.WHITE));
        assertThat(King.WHITE.opposite(), is(King.RED));

        final CheckersActionGenerator actionGenerator = new CheckersActionGenerator();
        final Agent agent = new SimpleAgent("Bond", CheckersTeam.RED, actionGenerator);
        final King token = King.RED.withAgent(agent);
        assertThat(token.opposite(), is(King.WHITE));
    }
}

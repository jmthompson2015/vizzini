package org.vizzini.example.boardgame.checkers;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>Pawn</code> class.
 */
public final class PawnTest
{
    /**
     * Test the <code>getDescription()</code> method.
     */
    @Test
    public void getDescription()
    {
        assertThat(Pawn.RED.getDescription(), is("red pawn"));
        assertThat(Pawn.WHITE.getDescription(), is("white pawn"));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(Pawn.RED.getName(), is("Red Pawn"));
        assertThat(Pawn.WHITE.getName(), is("White Pawn"));
    }

    /**
     * Test the <code>opposite()</code> method.
     */
    @Test
    public void opposite()
    {
        assertThat(Pawn.RED.opposite(), is(Pawn.WHITE));
        assertThat(Pawn.WHITE.opposite(), is(Pawn.RED));

        final CheckersActionGenerator actionGenerator = new CheckersActionGenerator();
        final Agent agent = new SimpleAgent("Bond", CheckersTeam.RED, actionGenerator);
        final Pawn token = Pawn.RED.withAgent(agent);
        assertThat(token.opposite(), is(Pawn.WHITE));
    }
}

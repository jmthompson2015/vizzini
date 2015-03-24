package org.vizzini.core.game.cardgame;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>PokerSuit</code> class.
 */
public final class PokerSuitTest
{
    /**
     * Test the <code>compareTo()</code> method.
     */
    @Test
    public void compareTo()
    {
        assertThat(PokerSuit.CLUBS.compareTo(PokerSuit.CLUBS), is(0));
        assertThat(PokerSuit.CLUBS.compareTo(PokerSuit.DIAMONDS), is(-1));
        assertThat(PokerSuit.CLUBS.compareTo(PokerSuit.SPADES), is(-1));
        assertThat(PokerSuit.CLUBS.compareTo(PokerSuit.HEARTS), is(-1));

        assertThat(PokerSuit.DIAMONDS.compareTo(PokerSuit.CLUBS), is(1));
        assertThat(PokerSuit.DIAMONDS.compareTo(PokerSuit.DIAMONDS), is(0));
        assertThat(PokerSuit.DIAMONDS.compareTo(PokerSuit.SPADES), is(-1));
        assertThat(PokerSuit.DIAMONDS.compareTo(PokerSuit.HEARTS), is(-1));

        assertThat(PokerSuit.SPADES.compareTo(PokerSuit.CLUBS), is(1));
        assertThat(PokerSuit.SPADES.compareTo(PokerSuit.DIAMONDS), is(1));
        assertThat(PokerSuit.SPADES.compareTo(PokerSuit.SPADES), is(0));
        assertThat(PokerSuit.SPADES.compareTo(PokerSuit.HEARTS), is(-1));

        assertThat(PokerSuit.HEARTS.compareTo(PokerSuit.CLUBS), is(1));
        assertThat(PokerSuit.HEARTS.compareTo(PokerSuit.DIAMONDS), is(1));
        assertThat(PokerSuit.HEARTS.compareTo(PokerSuit.SPADES), is(1));
        assertThat(PokerSuit.HEARTS.compareTo(PokerSuit.HEARTS), is(0));

        assertThat(PokerSuit.CLUBS.compareTo(null), is(-1));
        assertThat(PokerSuit.DIAMONDS.compareTo(null), is(-1));
        assertThat(PokerSuit.SPADES.compareTo(null), is(-1));
        assertThat(PokerSuit.HEARTS.compareTo(null), is(-1));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(PokerSuit.CLUBS.getName(), is("Clubs"));
        assertThat(PokerSuit.DIAMONDS.getName(), is("Diamonds"));
        assertThat(PokerSuit.SPADES.getName(), is("Spades"));
        assertThat(PokerSuit.HEARTS.getName(), is("Hearts"));
    }

    /**
     * Test the <code>name()</code> method.
     */
    @Test
    public void name()
    {
        assertThat(PokerSuit.CLUBS.name(), is("CLUBS"));
        assertThat(PokerSuit.DIAMONDS.name(), is("DIAMONDS"));
        assertThat(PokerSuit.SPADES.name(), is("SPADES"));
        assertThat(PokerSuit.HEARTS.name(), is("HEARTS"));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        final PokerSuit[] values = PokerSuit.values();

        assertThat(values.length, is(4));
        assertThat(values[0], is(PokerSuit.CLUBS));
        assertThat(values[1], is(PokerSuit.DIAMONDS));
        assertThat(values[2], is(PokerSuit.SPADES));
        assertThat(values[3], is(PokerSuit.HEARTS));
    }
}

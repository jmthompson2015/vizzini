package org.vizzini.core.game.cardgame;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>TarotSuit</code> class.
 */
public final class TarotSuitTest
{
    /**
     * Test the <code>compareTo()</code> method.
     */
    @Test
    public void compareTo()
    {
        assertThat(TarotSuit.WANDS.compareTo(TarotSuit.WANDS), is(0));
        assertThat(TarotSuit.WANDS.compareTo(TarotSuit.PENTACLES), is(-1));
        assertThat(TarotSuit.WANDS.compareTo(TarotSuit.SWORDS), is(-1));
        assertThat(TarotSuit.WANDS.compareTo(TarotSuit.CUPS), is(-1));

        assertThat(TarotSuit.PENTACLES.compareTo(TarotSuit.WANDS), is(1));
        assertThat(TarotSuit.PENTACLES.compareTo(TarotSuit.PENTACLES), is(0));
        assertThat(TarotSuit.PENTACLES.compareTo(TarotSuit.SWORDS), is(-1));
        assertThat(TarotSuit.PENTACLES.compareTo(TarotSuit.CUPS), is(-1));

        assertThat(TarotSuit.SWORDS.compareTo(TarotSuit.WANDS), is(1));
        assertThat(TarotSuit.SWORDS.compareTo(TarotSuit.PENTACLES), is(1));
        assertThat(TarotSuit.SWORDS.compareTo(TarotSuit.SWORDS), is(0));
        assertThat(TarotSuit.SWORDS.compareTo(TarotSuit.CUPS), is(-1));

        assertThat(TarotSuit.CUPS.compareTo(TarotSuit.WANDS), is(1));
        assertThat(TarotSuit.CUPS.compareTo(TarotSuit.PENTACLES), is(1));
        assertThat(TarotSuit.CUPS.compareTo(TarotSuit.SWORDS), is(1));
        assertThat(TarotSuit.CUPS.compareTo(TarotSuit.CUPS), is(0));

        assertThat(TarotSuit.WANDS.compareTo(null), is(-1));
        assertThat(TarotSuit.PENTACLES.compareTo(null), is(-1));
        assertThat(TarotSuit.SWORDS.compareTo(null), is(-1));
        assertThat(TarotSuit.CUPS.compareTo(null), is(-1));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(TarotSuit.WANDS.getName(), is("Wands"));
        assertThat(TarotSuit.PENTACLES.getName(), is("Pentacles"));
        assertThat(TarotSuit.SWORDS.getName(), is("Swords"));
        assertThat(TarotSuit.CUPS.getName(), is("Cups"));
    }

    /**
     * Test the <code>name()</code> method.
     */
    @Test
    public void name()
    {
        assertThat(TarotSuit.WANDS.name(), is("WANDS"));
        assertThat(TarotSuit.PENTACLES.name(), is("PENTACLES"));
        assertThat(TarotSuit.SWORDS.name(), is("SWORDS"));
        assertThat(TarotSuit.CUPS.name(), is("CUPS"));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        final TarotSuit[] values = TarotSuit.values();

        assertThat(values.length, is(4));
        assertThat(values[0], is(TarotSuit.WANDS));
        assertThat(values[1], is(TarotSuit.PENTACLES));
        assertThat(values[2], is(TarotSuit.SWORDS));
        assertThat(values[3], is(TarotSuit.CUPS));
    }
}

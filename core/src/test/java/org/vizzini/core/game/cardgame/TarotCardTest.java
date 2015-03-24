package org.vizzini.core.game.cardgame;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>TarotCard</code> class.
 */
public final class TarotCardTest
{
    /**
     * Test the <code>findBySuitRank()</code> method.
     */
    @Test
    public void findBySuitRank()
    {
        assertThat(TarotCard.findBySuitRank(TarotSuit.WANDS, 1), is(TarotCard.W1));
        assertThat(TarotCard.findBySuitRank(null, 0), is(TarotCard.M0));
    }

    /**
     * Test the <code>getDescription()</code> method.
     */
    @Test
    public void getDescription()
    {
        assertThat(TarotCard.W1.getDescription(), is("Ace of Wands"));
        assertThat(TarotCard.W2.getDescription(), is("Two of Wands"));
        assertThat(TarotCard.C14.getDescription(), is("King of Cups"));
        assertThat(TarotCard.M0.getDescription(), is("The Fool"));
        assertThat(TarotCard.M21.getDescription(), is("The World"));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(TarotCard.W1.getName(), is("Ace of Wands"));
        assertThat(TarotCard.W2.getName(), is("Two of Wands"));
        assertThat(TarotCard.C14.getName(), is("King of Cups"));
        assertThat(TarotCard.M0.getName(), is("The Fool"));
        assertThat(TarotCard.M21.getName(), is("The World"));
    }

    /**
     * Test the <code>getRank()</code> method.
     */
    @Test
    public void getRank()
    {
        assertThat(TarotCard.W1.getRank(), is(1));
        assertThat(TarotCard.C14.getRank(), is(14));
        assertThat(TarotCard.M0.getRank(), is(0));
        assertThat(TarotCard.M21.getRank(), is(21));
    }

    /**
     * Test the <code>getRankName()</code> method.
     */
    @Test
    public void getRankName()
    {
        assertThat(TarotCard.W1.getRankName(), is("Ace"));
        assertThat(TarotCard.W2.getRankName(), is("Two"));
        assertThat(TarotCard.W3.getRankName(), is("Three"));
        assertThat(TarotCard.W4.getRankName(), is("Four"));
        assertThat(TarotCard.W5.getRankName(), is("Five"));
        assertThat(TarotCard.W6.getRankName(), is("Six"));
        assertThat(TarotCard.W7.getRankName(), is("Seven"));
        assertThat(TarotCard.W8.getRankName(), is("Eight"));
        assertThat(TarotCard.W9.getRankName(), is("Nine"));
        assertThat(TarotCard.W10.getRankName(), is("Ten"));
        assertThat(TarotCard.W11.getRankName(), is("Page"));
        assertThat(TarotCard.W12.getRankName(), is("Knight"));
        assertThat(TarotCard.W13.getRankName(), is("Queen"));
        assertThat(TarotCard.W14.getRankName(), is("King"));

        assertThat(TarotCard.C14.getRankName(), is("King"));
    }

    /**
     * Test the <code>getSuit()</code> method.
     */
    @Test
    public void getSuit()
    {
        assertThat(TarotCard.W1.getSuit(), is(TarotSuit.WANDS));
        assertThat(TarotCard.P1.getSuit(), is(TarotSuit.PENTACLES));
        assertThat(TarotCard.S1.getSuit(), is(TarotSuit.SWORDS));
        assertThat(TarotCard.C14.getSuit(), is(TarotSuit.CUPS));

        assertNull(TarotCard.M0.getSuit());
        assertNull(TarotCard.M21.getSuit());
    }

    /**
     * Test the <code>getSymbol()</code> method.
     */
    @Test
    public void getSymbol()
    {
        assertThat(TarotCard.W1.getSymbol(), is("AW"));
        assertThat(TarotCard.W2.getSymbol(), is("2W"));
        assertThat(TarotCard.W10.getSymbol(), is("TW"));
        assertThat(TarotCard.W11.getSymbol(), is("PW"));
        assertThat(TarotCard.W12.getSymbol(), is("NW"));
        assertThat(TarotCard.W13.getSymbol(), is("QW"));
        assertThat(TarotCard.W14.getSymbol(), is("KW"));

        assertThat(TarotCard.C14.getSymbol(), is("KC"));

        assertThat(TarotCard.M0.getSymbol(), is("0M"));
        assertThat(TarotCard.M21.getSymbol(), is("21M"));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        final TarotCard[] values = TarotCard.values();

        assertThat(values.length, is(78));
        assertThat(values[0], is(TarotCard.W1));
        assertThat(values[13], is(TarotCard.W14));

        assertThat(values[14], is(TarotCard.P1));
        assertThat(values[27], is(TarotCard.P14));

        assertThat(values[28], is(TarotCard.S1));
        assertThat(values[41], is(TarotCard.S14));

        assertThat(values[42], is(TarotCard.C1));
        assertThat(values[55], is(TarotCard.C14));

        assertThat(values[56], is(TarotCard.M0));
        assertThat(values[77], is(TarotCard.M21));
    }
}

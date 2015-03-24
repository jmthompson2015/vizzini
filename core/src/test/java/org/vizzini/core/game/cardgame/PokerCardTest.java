package org.vizzini.core.game.cardgame;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;
import org.vizzini.core.game.DefaultTeam;
import org.vizzini.core.game.Team;

/**
 * Provides tests for the <code>PokerCard</code> class.
 */
public final class PokerCardTest
{
    /** First team. */
    private final Team firstTeam = new DefaultTeam("first", "First team");

    /**
     * Test the <code>findBySuitRank()</code> method.
     */
    @Test
    public void findBySuitRank()
    {
        assertThat(PokerCard.findBySuitRank(PokerSuit.CLUBS, 1), is(PokerCard.C1));
    }

    /**
     * Test the <code>getDescription()</code> method.
     */
    @Test
    public void getDescription()
    {
        assertThat(PokerCard.C1.getDescription(), is("Ace of Clubs"));
        assertThat(PokerCard.C2.getDescription(), is("Two of Clubs"));
        assertThat(PokerCard.H13.getDescription(), is("King of Hearts"));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(PokerCard.C1.getName(), is("Ace of Clubs"));
        assertThat(PokerCard.C2.getName(), is("Two of Clubs"));
        assertThat(PokerCard.H13.getName(), is("King of Hearts"));
    }

    /**
     * Test the <code>getRank()</code> method.
     */
    @Test
    public void getRank()
    {
        assertThat(PokerCard.C1.getRank(), is(1));
        assertThat(PokerCard.H13.getRank(), is(13));
    }

    /**
     * Test the <code>getRankName()</code> method.
     */
    @Test
    public void getRankName()
    {
        assertThat(PokerCard.C1.getRankName(), is("Ace"));
        assertThat(PokerCard.C2.getRankName(), is("Two"));
        assertThat(PokerCard.C3.getRankName(), is("Three"));
        assertThat(PokerCard.C4.getRankName(), is("Four"));
        assertThat(PokerCard.C5.getRankName(), is("Five"));
        assertThat(PokerCard.C6.getRankName(), is("Six"));
        assertThat(PokerCard.C7.getRankName(), is("Seven"));
        assertThat(PokerCard.C8.getRankName(), is("Eight"));
        assertThat(PokerCard.C9.getRankName(), is("Nine"));
        assertThat(PokerCard.C10.getRankName(), is("Ten"));
        assertThat(PokerCard.C11.getRankName(), is("Jack"));
        assertThat(PokerCard.C12.getRankName(), is("Queen"));
        assertThat(PokerCard.C13.getRankName(), is("King"));

        assertThat(PokerCard.H13.getRankName(), is("King"));
    }

    /**
     * Test the <code>getSuit()</code> method.
     */
    @Test
    public void getSuit()
    {
        assertThat(PokerCard.C1.getSuit(), is(PokerSuit.CLUBS));
        assertThat(PokerCard.H13.getSuit(), is(PokerSuit.HEARTS));
    }

    /**
     * Test the <code>getSymbol()</code> method.
     */
    @Test
    public void getSymbol()
    {
        assertThat(PokerCard.C1.getSymbol(), is("AC"));
        assertThat(PokerCard.C2.getSymbol(), is("2C"));
        assertThat(PokerCard.C10.getSymbol(), is("TC"));
        assertThat(PokerCard.C13.getSymbol(), is("KC"));

        assertThat(PokerCard.H13.getSymbol(), is("KH"));
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final Agent agent = new DefaultAgent("name", "description", firstTeam);

        final PokerCard card0 = PokerCard.C1;
        final PokerCard card1 = PokerCard.H2;
        final PokerCard card2 = PokerCard.C1.withAgent(agent);

        assertTrue(card0.equals(card0));
        assertFalse(card0.equals(card1));
        assertTrue(card0.equals(card2));

        assertFalse(card1.equals(card0));
        assertTrue(card1.equals(card1));
        assertFalse(card1.equals(card2));

        assertTrue(card2.equals(card0));
        assertFalse(card2.equals(card1));
        assertTrue(card2.equals(card2));

        assertFalse(card0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final Agent agent = new DefaultAgent("name", "description", firstTeam);

        final PokerCard card0 = PokerCard.C1;
        final PokerCard card1 = PokerCard.H2;
        final PokerCard card2 = PokerCard.C1.withAgent(agent);

        assertTrue(card0.hashCode() == card0.hashCode());
        assertFalse(card0.hashCode() == card1.hashCode());
        assertTrue(card0.hashCode() == card2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final PokerCard card0 = PokerCard.C1;

        final String result = card0.toString();

        assertNotNull(result);
        final String expected = "PokerCard[delegate=DefaultToken[agent=<null>,description=Ace of Clubs,name=Ace of Clubs,team=<null>],rank=1,rankName=Ace,symbol=AC,suit=PokerSuit[name=Clubs,symbol=C]]";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        final PokerCard[] values = PokerCard.values();

        assertThat(values.length, is(52));
        assertThat(values[0], is(PokerCard.C1));
        assertThat(values[51], is(PokerCard.H13));
    }
}

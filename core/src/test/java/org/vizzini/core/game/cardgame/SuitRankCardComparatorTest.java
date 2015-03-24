package org.vizzini.core.game.cardgame;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>SuitRankCardComparator</code> class.
 */
public final class SuitRankCardComparatorTest
{
    /** Flag indicating whether to print output. */
    private static final boolean IS_VERBOSE = false;

    /**
     * Test the <code>compareTo()</code> method.
     */
    @Test
    public void compareToNull()
    {
        // Setup.
        final Comparator<Card> comparator = new SuitRankCardComparator();

        // Run / Verify.
        assertThat(comparator.compare(null, null), is(0));
        assertThat(comparator.compare(null, PokerCard.C2), is(1));
        assertThat(comparator.compare(PokerCard.C1, null), is(-1));
    }

    /**
     * Test the <code>sort()</code> method.
     */
    @Test
    public void sortPoker()
    {
        // Setup.
        final List<Card> deck = new ArrayList<Card>(Arrays.asList(PokerCard.values()));
        Collections.shuffle(deck);
        final Comparator<Card> comparator = new SuitRankCardComparator();

        printDeck("before", deck);

        // Run.
        Collections.sort(deck, comparator);

        printDeck("\nafter", deck);

        // Verify.
        assertThat((PokerCard)deck.get(0), is(PokerCard.C1));
        assertThat((PokerCard)deck.get(1), is(PokerCard.C2));
        assertThat((PokerCard)deck.get(2), is(PokerCard.C3));
        assertThat((PokerCard)deck.get(3), is(PokerCard.C4));

        assertThat((PokerCard)deck.get(51), is(PokerCard.H13));
    }

    /**
     * Test the <code>sort()</code> method.
     */
    @Test
    public void sortTarot()
    {
        // Setup.
        final List<Card> deck = new ArrayList<Card>(Arrays.asList(TarotCard.values()));
        Collections.shuffle(deck);
        final Comparator<Card> comparator = new SuitRankCardComparator();

        printDeck("before", deck);

        // Run.
        Collections.sort(deck, comparator);

        printDeck("\nafter", deck);

        // Verify.
        assertThat((TarotCard)deck.get(0), is(TarotCard.W1));
        assertThat((TarotCard)deck.get(1), is(TarotCard.W2));
        assertThat((TarotCard)deck.get(2), is(TarotCard.W3));
        assertThat((TarotCard)deck.get(3), is(TarotCard.W4));

        assertThat((TarotCard)deck.get(77), is(TarotCard.M21));
    }

    /**
     * @param title Title.
     * @param deck Deck.
     */
    private void printDeck(final String title, final List<Card> deck)
    {
        if (IS_VERBOSE)
        {
            System.out.println(title);

            for (final Card card : deck)
            {
                System.out.println(card.getSymbol() + " " + card.getName());
            }
        }
    }
}

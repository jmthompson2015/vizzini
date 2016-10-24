package org.vizzini.example.cardgame.gin;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.vizzini.core.game.cardgame.PokerCard;

/**
 * Provides a meld.
 */
public final class Meld
{
    /** Cards. */
    private final List<PokerCard> cards = new ArrayList<PokerCard>();

    /**
     * Construct this object.
     * 
     * @param cards Cards.
     */
    @SuppressWarnings("hiding")
    public Meld(final List<PokerCard> cards)
    {
        if (cards == null)
        {
            throw new IllegalArgumentException("cards is null");
        }

        if (cards.size() < 3)
        {
            throw new IllegalArgumentException("Not enough cards: " + cards.size());
        }

        this.cards.addAll(cards);
    }

    /**
     * Construct this object.
     * 
     * @param card0 Card.
     * @param card1 Card.
     * @param card2 Card.
     * @param additionalCards Additional cards.
     */
    public Meld(final PokerCard card0, final PokerCard card1, final PokerCard card2, final PokerCard... additionalCards)
    {
        if (card0 == null)
        {
            throw new IllegalArgumentException("card0 is null");
        }

        if (card1 == null)
        {
            throw new IllegalArgumentException("card1 is null");
        }

        if (card2 == null)
        {
            throw new IllegalArgumentException("card2 is null");
        }

        cards.add(card0);
        cards.add(card1);
        cards.add(card2);

        if ((additionalCards != null) && (additionalCards.length > 0))
        {
            cards.addAll(Arrays.asList(additionalCards));
        }
    }

    /**
     * @return this as a list.
     */
    public List<PokerCard> asList()
    {
        return cards;
    }

    /**
     * @param index Index.
     * 
     * @return the card at the given index.
     */
    public PokerCard get(final int index)
    {
        return cards.get(index);
    }

    /**
     * @return the number of cards.
     */
    public int size()
    {
        return cards.size();
    }
}

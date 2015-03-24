package org.vizzini.core.game.cardgame;

import java.util.Comparator;

/**
 * Provides a card comparator to sort by rank then suit.
 */
public final class RankSuitCardComparator implements Comparator<Card>
{
    @Override
    public int compare(final Card card0, final Card card1)
    {
        int answer = 0;

        if (card0 == card1)
        {
            answer = 0;
        }
        else if (card0 == null)
        {
            answer = 1;
        }
        else if (card1 == null)
        {
            answer = -1;
        }
        else
        {
            answer = card0.getRank() - card1.getRank();

            if (answer == 0)
            {
                answer = compareSuits(card0.getSuit(), card1.getSuit());
            }
        }

        return answer;
    }

    /**
     * @param suit0 Suit.
     * @param suit1 Suit.
     * 
     * @return -1, 0, 1 if suit0 is less than, equal to, or greater than suit1.
     */
    private int compareSuits(final Suit suit0, final Suit suit1)
    {
        int answer;

        if (suit0 == suit1)
        {
            answer = 0;
        }
        else if (suit0 == null)
        {
            answer = 1;
        }
        else
        {
            answer = suit0.compareTo(suit1);
        }

        return answer;
    }
}

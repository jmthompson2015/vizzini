package org.vizzini.core.game.cardgame;

import org.vizzini.core.game.Token;

/**
 * Defines methods required by a card.
 */
public interface Card extends Token
{
    /**
     * @return the rank
     */
    int getRank();

    /**
     * @return the rankName
     */
    String getRankName();

    /**
     * @return the suit
     */
    Suit getSuit();

    /**
     * @return the symbol
     */
    String getSymbol();
}

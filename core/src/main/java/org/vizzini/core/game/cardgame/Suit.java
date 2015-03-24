package org.vizzini.core.game.cardgame;

import org.vizzini.core.NamedObject;

/**
 * Defines methods required by a suit.
 */
public interface Suit extends Comparable<Suit>, NamedObject
{
    /**
     * @return the symbol
     */
    String getSymbol();
}

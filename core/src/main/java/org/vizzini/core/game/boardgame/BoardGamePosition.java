package org.vizzini.core.game.boardgame;

import org.vizzini.core.game.Position;

/**
 * Defines methods required by a position for a board game.
 */
public interface BoardGamePosition extends Position<Integer>
{
    /**
     * @return the index
     */
    int getIndex();

    /**
     * @return name.
     */
    String name();
}

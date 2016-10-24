package org.vizzini.chess;

import org.vizzini.core.game.boardgame.BoardGamePosition;

/**
 * Defines methods required by a chess position.
 */
public interface ChessPosition extends BoardGamePosition
{
    /**
     * @return file.
     */
    int getFile();

    /**
     * @return level.
     */
    int getLevel();

    /**
     * @return rank.
     */
    int getRank();
}

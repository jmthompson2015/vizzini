package org.vizzini.chess;

import org.vizzini.core.game.Action;

/**
 * Defines methods required by a chess action.
 */
public interface ChessAction extends Action
{
    /**
     * @return the fromPosition
     */
    ChessPosition getFromPosition();

    /**
     * @return the toPosition
     */
    ChessPosition getToPosition();

    /**
     * @return the isPawnPromoted
     */
    boolean isPawnPromoted();
}

package org.vizzini.core.game;

/**
 * Defines methods required by a move action.
 */
public interface MoveAction extends Action
{
    /**
     * @return fromPosition
     */
    Position<?> getFromPosition();

    /**
     * @return toPosition
     */
    Position<?> getToPosition();
}

package org.vizzini.core.game;

/**
 * Defines methods required by a place action.
 */
public interface PlaceAction extends Action
{
    /**
     * @return position
     */
    Position<?> getPosition();

    /**
     * @return token
     */
    Token getToken();
}

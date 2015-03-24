package org.vizzini.core.game.boardgame;

import org.vizzini.core.game.Agent;

/**
 * Defines methods required by a computer agent which searches ahead.
 */
public interface SearchAgent extends Agent
{
    /**
     * @return the maxPlies
     */
    int getMaxPlies();

    /**
     * @return the search
     */
    Search getSearch();

    /**
     * @param maxPlies Maximum plies.
     * 
     * @return a new object with the given parameter.
     */
    SearchAgent withMaxPlies(final int maxPlies);
}

package org.vizzini.core.game.boardgame;

import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Defines methods required by an environment for a board game. This interface assumes a two player (agent) game.
 */
public interface BoardGameEnvironment extends Environment
{
    /**
     * @return the firstAgent
     */
    Agent getFirstAgent();

    /**
     * @return the secondAgent
     */
    Agent getSecondAgent();
}

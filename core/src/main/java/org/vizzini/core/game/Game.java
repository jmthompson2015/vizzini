package org.vizzini.core.game;

import java.util.List;

import org.vizzini.core.NamedObject;

/**
 * Defines methods required by a game.
 */
public interface Game extends NamedObject
{
    /**
     * @return adjudicator
     */
    Adjudicator getAdjudicator();

    /**
     * @return agents
     */
    List<Agent> getAgents();

    /**
     * @return description
     */
    String getDescription();

    /**
     * @return engine
     */
    Engine getEngine();

    /**
     * @return environment
     */
    Environment getEnvironment();

    /**
     * @return teams (immutable)
     */
    List<Team> getTeams();

    /**
     * Start the game.
     */
    void start();
}

package org.vizzini.core.game;

import java.util.List;

import org.vizzini.core.NamedObject;

/**
 * Defines methods required by an engine.
 */
public interface Engine extends NamedObject
{
    /**
     * @return description
     */
    String getDescription();

    /**
     * Start the engine.
     * 
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param teams Teams.
     * @param agents Agents.
     */
    void start(Environment environment, Adjudicator adjudicator, List<Team> teams, List<Agent> agents);
}

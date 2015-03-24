package org.vizzini.core.game;

import org.vizzini.core.NamedObject;

/**
 * Defines methods required by a token.
 */
public interface Token extends NamedObject
{
    /**
     * @return agent
     */
    Agent getAgent();

    /**
     * @return description
     */
    String getDescription();

    /**
     * @return team
     */
    Team getTeam();

    /**
     * @param agent Agent.
     * 
     * @return a new token with the given parameter.
     * 
     * @throws IllegalArgumentException if the agent's team doesn't match this token's team.
     */
    Token withAgent(final Agent agent);
}

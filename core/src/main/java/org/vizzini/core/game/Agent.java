package org.vizzini.core.game;

import org.vizzini.core.NamedObject;

/**
 * Defines methods required by an agent.
 */
public interface Agent extends NamedObject
{
    /**
     * @param environment The current environment.
     * @param adjudicator Adjudicator for determining legal actions.
     * 
     * @return the action determined through consideration of the given environment using the given adjudicator.
     */
    Action getAction(Environment environment, Adjudicator adjudicator);

    /**
     * @return description
     */
    String getDescription();

    /**
     * @return team
     */
    Team getTeam();

    /**
     * @param winner Game winner, if any.
     */
    void postProcessGame(Agent winner);
}

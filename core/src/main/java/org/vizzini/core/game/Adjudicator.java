package org.vizzini.core.game;

import org.vizzini.core.NamedObject;

/**
 * Defines methods required by an adjudicator.
 */
public interface Adjudicator extends NamedObject
{
    /**
     * @param environment Environment.
     * 
     * @return the agent if someone has won, null otherwise.
     */
    Agent determineWinner(Environment environment);

    /**
     * @return description
     */
    String getDescription();

    /**
     * @param action Action.
     * 
     * @return true if the given action is legal.
     */
    boolean isActionLegal(Action action);

    /**
     * @param environment Environment.
     * 
     * @return true if the given environment represents a completed game.
     */
    boolean isGameOver(Environment environment);
}

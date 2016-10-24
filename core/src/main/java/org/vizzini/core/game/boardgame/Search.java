package org.vizzini.core.game.boardgame;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Defines methods required by a search.
 */
public interface Search
{
    /**
     * @return the actionGenerator
     */
    ActionGenerator getActionGenerator();

    /**
     * @return the environmentEvaluator
     */
    EnvironmentEvaluator getEnvironmentEvaluator();

    /**
     * Perform a search using the given parameters.
     * 
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param agent Agent.
     * @param opponent Opponent.
     * @param maxPlies Maximum number of plies.
     * 
     * @return the best action.
     */
    Action search(final Environment environment, final Adjudicator adjudicator, final Agent agent,
            final Agent opponent, final int maxPlies);
}

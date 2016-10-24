package org.vizzini.core.game.boardgame;

import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Defines methods required by an environment evaluator.
 */
public interface EnvironmentEvaluator
{
    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param agent Agent.
     * 
     * @return the evaluation.
     */
    int evaluate(Environment environment, Adjudicator adjudicator, Agent agent);
}

package org.vizzini.core.game.boardgame;

import java.util.List;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Defines methods required by an action generator.
 */
public interface ActionGenerator
{
    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param agent Agent.
     * 
     * @return all the possible actions.
     */
    List<Action> generateActions(final Environment environment, Adjudicator adjudicator, final Agent agent);
}

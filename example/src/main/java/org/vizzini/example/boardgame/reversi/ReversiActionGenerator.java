package org.vizzini.example.boardgame.reversi;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.boardgame.ActionGenerator;

/**
 * Provides an action generator for reversi.
 */
public final class ReversiActionGenerator implements ActionGenerator
{
    @Override
    public List<Action> generateActions(final Environment environment, final Adjudicator adjudicator, final Agent agent)
    {
        if (environment == null)
        {
            throw new IllegalArgumentException("environment is null");
        }

        if (adjudicator == null)
        {
            throw new IllegalArgumentException("adjudicator is null");
        }

        if (agent == null)
        {
            throw new IllegalArgumentException("agent is null");
        }

        if (agent.getTeam() == null)
        {
            throw new IllegalArgumentException("agent has no team");
        }

        final ReversiEnvironment rEnvironment = (ReversiEnvironment)environment;
        final ReversiAdjudicator rAdjudicator = (ReversiAdjudicator)adjudicator;

        final List<Action> answer = new ArrayList<Action>();

        final ReversiTeam team = (ReversiTeam)agent.getTeam();

        for (final ReversiPosition position : ReversiPosition.values())
        {
            if (rAdjudicator.isActionLegalFor(rEnvironment, team, position))
            {
                final ReversiToken token = ReversiToken.findByTeam(team).withAgent(agent);
                final ReversiAction action = new ReversiAction(rEnvironment, position, token);
                answer.add(action);
            }
        }

        return answer;
    }
}

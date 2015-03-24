package org.vizzini.example.boardgame.tictactoe;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.boardgame.ActionGenerator;

/**
 * Provides an action generator for tic-tac-toe.
 */
public final class TTTActionGenerator implements ActionGenerator
{
    @Override
    public List<Action> generateActions(final Environment environment, final Adjudicator adjudicator, final Agent agent)
    {
        final List<Action> answer = new ArrayList<Action>();

        final TTTEnvironment tEnvironment = (TTTEnvironment)environment;
        final TTTTeam team = (TTTTeam)agent.getTeam();
        final TTTToken token = TTTToken.findByTeam(team).withAgent(agent);

        final TTTPosition[] values = TTTPosition.values();

        for (final TTTPosition position : values)
        {
            if (environment.getTokenAt(position) == null)
            {
                final TTTAction action = new TTTAction(tEnvironment, position, token);
                answer.add(action);
            }
        }

        return answer;
    }
}

package org.vizzini.example.boardgame.qubic;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.boardgame.ActionGenerator;

/**
 * Provides an action generator for qubic.
 */
public final class QubicActionGenerator implements ActionGenerator
{
    @Override
    public List<Action> generateActions(final Environment environment, final Adjudicator adjudicator, final Agent agent)
    {
        final List<Action> answer = new ArrayList<Action>();

        final QubicEnvironment qEnvironment = (QubicEnvironment)environment;
        final QubicTeam team = (QubicTeam)agent.getTeam();
        final QubicToken token = QubicToken.findByTeam(team).withAgent(agent);

        final QubicPosition[] values = QubicPosition.values();

        for (final QubicPosition position : values)
        {
            if (environment.getTokenAt(position) == null)
            {
                final QubicAction action = new QubicAction(qEnvironment, position, token);
                answer.add(action);
            }
        }

        return answer;
    }
}

package org.vizzini.example.boardgame.qubic;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Provides a medium implementation of a computer agent for qubic.
 */
public final class MediumAgent implements Agent
{
    /** Action generator. */
    private final QubicActionGenerator actionGenerator;

    /** Name. */
    private final String name;

    /** Team. */
    private final QubicTeam team;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param team Team.
     * @param actionGenerator Action generator.
     */
    @SuppressWarnings("hiding")
    public MediumAgent(final String name, final QubicTeam team, final QubicActionGenerator actionGenerator)
    {
        this.name = name;
        this.team = team;
        this.actionGenerator = actionGenerator;
    }

    @Override
    public QubicAction getAction(final Environment environment, final Adjudicator adjudicator)
    {
        QubicAction answer = null;

        final List<Action> actions = actionGenerator.generateActions(environment, adjudicator, this);

        if (CollectionUtils.isNotEmpty(actions))
        {
            // First, look for a winning action.
            answer = determineWinningAction((QubicEnvironment)environment, (QubicAdjudicator)adjudicator, actions, team);

            if (answer == null)
            {
                // Next, look for a blocking action.
                answer = determineWinningAction((QubicEnvironment)environment, (QubicAdjudicator)adjudicator, actions,
                        team.opposite());

                if (answer == null)
                {
                    // Randomly pick an action.
                    final int size = actions.size();
                    final int index = (int)(size * Math.random());
                    answer = (QubicAction)actions.get(index);
                }
            }
        }

        return answer;
    }

    @Override
    public String getDescription()
    {
        return "This agent looks for winning or blocking moves, then plays on a random open position.";
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public QubicTeam getTeam()
    {
        return team;
    }

    @Override
    public void postProcessGame(final Agent winner)
    {
        // Nothing to do.
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("name", getName());
        builder.append("team", getTeam());

        return builder.toString();
    }

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param actions Possible actions.
     * @param team Team.
     * 
     * @return the first winning action, if any.
     */
    @SuppressWarnings("hiding")
    private QubicAction determineWinningAction(final QubicEnvironment environment, final QubicAdjudicator adjudicator,
            final List<Action> actions, final QubicTeam team)
    {
        QubicAction answer = null;

        for (final Action action : actions)
        {
            final QubicAction qAction = (QubicAction)action;
            final Agent winner = adjudicator.determineWinner(environment);

            if (winner != null)
            {
                final QubicTeam winnerTeam = (QubicTeam)winner.getTeam();

                if (team == winnerTeam)
                {
                    answer = qAction;
                    break;
                }
            }
        }

        return answer;
    }
}

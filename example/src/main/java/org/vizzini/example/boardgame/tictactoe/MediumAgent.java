package org.vizzini.example.boardgame.tictactoe;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Provides a medium implementation of a computer agent for tic-tac-toe.
 */
public final class MediumAgent implements Agent
{
    /** Action generator. */
    private final TTTActionGenerator actionGenerator;

    /** Environment stringifier. */
    private final EnvironmentStringifier environmentStringifier;

    /** Name. */
    private final String name;

    /** Team. */
    private final TTTTeam team;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param team Team.
     * @param actionGenerator Action generator.
     * @param environmentStringifier Environment stringifier.
     */
    @SuppressWarnings("hiding")
    public MediumAgent(final String name, final TTTTeam team, final TTTActionGenerator actionGenerator,
            final EnvironmentStringifier environmentStringifier)
    {
        this.name = name;
        this.team = team;
        this.actionGenerator = actionGenerator;
        this.environmentStringifier = environmentStringifier;
    }

    @Override
    public TTTAction getAction(final Environment environment, final Adjudicator adjudicator)
    {
        TTTAction answer = null;

        final List<Action> actions = actionGenerator.generateActions(environment, adjudicator, this);

        if (CollectionUtils.isNotEmpty(actions))
        {
            // First, look for a winning action.
            answer = determineWinningAction((TTTEnvironment)environment, (TTTAdjudicator)adjudicator, actions, team);

            if (answer == null)
            {
                // Next, look for a blocking action.
                answer = determineWinningAction((TTTEnvironment)environment, (TTTAdjudicator)adjudicator, actions,
                        team.opposite());

                if (answer == null)
                {
                    // Randomly pick an action.
                    final int size = actions.size();
                    final int index = (int)(size * Math.random());
                    answer = (TTTAction)actions.get(index);
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
    public TTTTeam getTeam()
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
    private TTTAction determineWinningAction(final TTTEnvironment environment, final TTTAdjudicator adjudicator,
            final List<Action> actions, final TTTTeam team)
    {
        TTTAction answer = null;

        final String boardString = environmentStringifier.stringify(environment);

        for (final Action action : actions)
        {
            final TTTAction tAction = (TTTAction)action;
            final int index = tAction.getPosition().getIndex();
            final String boardString2 = boardString.substring(0, index) + team.getName()
                    + boardString.substring(index + 1);
            final TTTTeam winnerTeam = adjudicator.determineWinningAgentTeam(boardString2);

            if (team == winnerTeam)
            {
                answer = tAction;
                break;
            }
        }

        return answer;
    }
}

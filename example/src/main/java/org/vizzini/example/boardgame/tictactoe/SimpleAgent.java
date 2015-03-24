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
 * Provides a simple implementation of a computer agent for tic-tac-toe.
 */
public final class SimpleAgent implements Agent
{
    /** Action generator. */
    private final TTTActionGenerator actionGenerator;

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
     */
    @SuppressWarnings("hiding")
    public SimpleAgent(final String name, final TTTTeam team, final TTTActionGenerator actionGenerator)
    {
        this.name = name;
        this.team = team;
        this.actionGenerator = actionGenerator;
    }

    /**
     * Construct this object.
     * 
     * @param team Team.
     * @param actionGenerator Action generator.
     */
    @SuppressWarnings("hiding")
    public SimpleAgent(final TTTTeam team, final TTTActionGenerator actionGenerator)
    {
        this(team.getName(), team, actionGenerator);
    }

    @Override
    public TTTAction getAction(final Environment environment, final Adjudicator adjudicator)
    {
        final List<Action> actions = actionGenerator.generateActions(environment, adjudicator, this);

        return selectAction(actions);
    }

    @Override
    public String getDescription()
    {
        return "This agent plays on a random open position.";
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
     * @param actions Actions.
     * 
     * @return a randomly selected action.
     */
    private TTTAction selectAction(final List<Action> actions)
    {
        TTTAction answer = null;

        if (CollectionUtils.isNotEmpty(actions))
        {
            if (actions.size() == 1)
            {
                answer = (TTTAction)actions.get(0);
            }
            else
            {
                // Randomly pick an action.
                final int size = actions.size();
                final int index = (int)(size * Math.random());
                answer = (TTTAction)actions.get(index);
            }
        }

        return answer;
    }
}

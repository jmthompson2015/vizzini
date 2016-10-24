package org.vizzini.example.boardgame.hexchess;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Provides a simple implementation of a computer agent for hexagonal chess.
 */
public final class SimpleAgent implements Agent
{
    /** Action generator. */
    private final HexChessActionGenerator actionGenerator;

    /** Name. */
    private final String name;

    /** Team. */
    private final HexChessTeam team;

    /**
     * Construct this object.
     * 
     * @param name Name. (required)
     * @param team Team. (required)
     * @param actionGenerator Action generator. (required)
     */
    @SuppressWarnings("hiding")
    public SimpleAgent(final String name, final HexChessTeam team, final HexChessActionGenerator actionGenerator)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        if (team == null)
        {
            throw new IllegalArgumentException("team is null");
        }

        if (actionGenerator == null)
        {
            throw new IllegalArgumentException("actionGenerator is null");
        }

        this.name = name;
        this.team = team;
        this.actionGenerator = actionGenerator;
    }

    @Override
    public boolean equals(final Object object)
    {
        boolean answer = false;

        if (object == this)
        {
            answer = true;
        }
        else if (object == null)
        {
            answer = false;
        }
        else if (getClass() != object.getClass())
        {
            answer = false;
        }
        else
        {
            final SimpleAgent another = (SimpleAgent)object;

            answer = name.equals(another.name);

            if (answer)
            {
                answer = team.equals(another.team);
            }
        }

        return answer;
    }

    @Override
    public Action getAction(final Environment environment, final Adjudicator adjudicator)
    {
        final List<Action> actions = actionGenerator.generateActions(environment, adjudicator, this);

        return selectAction(actions);
    }

    @Override
    public String getDescription()
    {
        return "This agent just plays on the next open position.";
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public HexChessTeam getTeam()
    {
        return team;
    }

    @Override
    public int hashCode()
    {
        int answer = 0;

        final int[] primes = { 2, 3, };
        int i = 0;

        answer += primes[i++] * name.hashCode();
        answer += primes[i++] * team.hashCode();

        return answer;
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
    private Action selectAction(final List<? extends Action> actions)
    {
        Action answer = null;

        if (CollectionUtils.isNotEmpty(actions))
        {
            if (actions.size() == 1)
            {
                answer = actions.get(0);
            }
            else
            {
                // Randomly pick an action.
                final int size = actions.size();
                final int index = (int)(size * Math.random());
                answer = actions.get(index);
            }
        }

        return answer;
    }
}

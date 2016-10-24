package org.vizzini.example.boardgame.reversi;

import java.util.ArrayList;
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
 * Provides a medium implementation of a computer agent for reversi.
 */
public final class MediumAgent implements Agent
{
    /** Action generator. */
    private final ReversiActionGenerator actionGenerator;

    /** Name. */
    private final String name;

    /** Team. */
    private final ReversiTeam team;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param team Team.
     * @param actionGenerator Action generator.
     */
    @SuppressWarnings("hiding")
    public MediumAgent(final String name, final ReversiTeam team, final ReversiActionGenerator actionGenerator)
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
            final MediumAgent another = (MediumAgent)object;

            answer = name.equals(another.name);

            if (answer)
            {
                answer = team.equals(another.team);
            }
        }

        return answer;
    }

    @Override
    public ReversiAction getAction(final Environment environment, final Adjudicator adjudicator)
    {
        ReversiAction answer = null;

        final ReversiEnvironment rEnvironment = (ReversiEnvironment)environment;
        final ReversiAdjudicator rAdjudicator = (ReversiAdjudicator)adjudicator;
        final List<Action> actions = actionGenerator.generateActions(rEnvironment, rAdjudicator, this);

        if (CollectionUtils.isNotEmpty(actions))
        {
            // First, look for a corner.
            final List<Action> corners = filterCorners(actions);
            answer = selectAction(corners);

            if (answer == null)
            {
                // Next, look for a side.
                final List<Action> sides = filterSides(actions);
                answer = selectAction(sides);
            }

            if (answer == null)
            {
                // Randomly pick an action.
                answer = selectAction(actions);
            }
        }

        return answer;
    }

    @Override
    public String getDescription()
    {
        return "This agent plays on a corner, a side, or a random open position.";
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public ReversiTeam getTeam()
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
     * @return a new list of corners.
     */
    private List<Action> filterCorners(final List<Action> actions)
    {
        final List<Action> answer = new ArrayList<Action>();

        for (final Action action : actions)
        {
            final ReversiAction rAction = (ReversiAction)action;

            if (rAction.getPosition().isCorner())
            {
                answer.add(rAction);
            }
        }

        return answer;
    }

    /**
     * @param actions Actions.
     * 
     * @return a new list of sides.
     */
    private List<Action> filterSides(final List<Action> actions)
    {
        final List<Action> answer = new ArrayList<Action>();

        for (final Action action : actions)
        {
            final ReversiAction rAction = (ReversiAction)action;

            if (rAction.getPosition().isSide())
            {
                answer.add(rAction);
            }
        }

        return answer;
    }

    /**
     * @param actions Actions.
     * 
     * @return a randomly selected action.
     */
    private ReversiAction selectAction(final List<Action> actions)
    {
        ReversiAction answer = null;

        if (CollectionUtils.isNotEmpty(actions))
        {
            if (actions.size() == 1)
            {
                answer = (ReversiAction)actions.get(0);
            }
            else
            {
                // Randomly pick an action.
                final int size = actions.size();
                final int index = (int)(size * Math.random());
                answer = (ReversiAction)actions.get(index);
            }
        }

        return answer;
    }
}

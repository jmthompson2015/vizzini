package org.vizzini.swingui.game.boardgame.reversi;

import java.awt.Toolkit;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.example.boardgame.reversi.ReversiAction;
import org.vizzini.example.boardgame.reversi.ReversiEnvironment;
import org.vizzini.example.boardgame.reversi.ReversiPosition;
import org.vizzini.example.boardgame.reversi.ReversiTeam;
import org.vizzini.example.boardgame.reversi.ReversiToken;

/**
 * Provides a mouse driven implementation of a human agent for reversi.
 */
public final class MouseAgent extends MouseAdapter implements Agent
{
    /** Description. */
    private final String description;

    /** Name. */
    private final String name;

    /** Position. */
    private ReversiPosition position;

    /** Team. */
    private final ReversiTeam team;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param description Description.
     * @param team Team.
     */
    @SuppressWarnings("hiding")
    public MouseAgent(final String name, final String description, final ReversiTeam team)
    {
        this.name = name;
        this.description = description;
        this.team = team;
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
            final MouseAgent another = (MouseAgent)object;

            answer = name.equals(another.name);

            if (answer)
            {
                answer = description.equals(another.description);
            }

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
        Action answer = null;
        position = null;

        while (answer == null)
        {
            try
            {
                synchronized (this)
                {
                    wait();
                }
            }
            catch (final InterruptedException e)
            {
                return null;
            }

            if (position != null)
            {
                final ReversiEnvironment rEnvironment = (ReversiEnvironment)environment;
                final Action action = createAction(rEnvironment, position);

                if (adjudicator.isActionLegal(action))
                {
                    answer = action;
                }
                else
                {
                    Toolkit.getDefaultToolkit().beep();
                }
            }
        }

        return answer;
    }

    @Override
    public String getDescription()
    {
        return description;
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

        final int[] primes = { 2, 3, 5, };
        int i = 0;

        answer += primes[i++] * name.hashCode();
        answer += primes[i++] * description.hashCode();
        answer += primes[i++] * team.hashCode();

        return answer;
    }

    @Override
    public void mouseClicked(final MouseEvent event)
    {
        final ReversiEnvironmentUI environmentUI = (ReversiEnvironmentUI)event.getSource();
        position = environmentUI.getPositionForPoint(event.getPoint());

        synchronized (this)
        {
            notifyAll();
        }
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
     * @param toPosition To position.
     * @return a new action.
     */
    private ReversiAction createAction(final ReversiEnvironment environment, final ReversiPosition toPosition)
    {
        ReversiToken token = ReversiToken.findByTeam(getTeam());
        token = token.withAgent(this);

        return new ReversiAction(environment, toPosition, token);
    }
}

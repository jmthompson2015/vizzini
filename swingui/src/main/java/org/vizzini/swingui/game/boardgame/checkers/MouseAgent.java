package org.vizzini.swingui.game.boardgame.checkers;

import java.awt.Toolkit;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.example.boardgame.checkers.CheckersEnvironment;
import org.vizzini.example.boardgame.checkers.CheckersJumpAction;
import org.vizzini.example.boardgame.checkers.CheckersMoveAction;
import org.vizzini.example.boardgame.checkers.CheckersPosition;
import org.vizzini.example.boardgame.checkers.CheckersTeam;

/**
 * Provides a mouse driven implementation of a human agent for checkers.
 */
public final class MouseAgent extends MouseAdapter implements Agent
{
    /** Description. */
    private final String description;

    /** From position. */
    private CheckersPosition fromPosition;

    /** Name. */
    private final String name;

    /** Team. */
    private final CheckersTeam team;

    /** To position. */
    private CheckersPosition toPosition;

    /**
     * Construct this object.
     * 
     * @param description Description.
     * @param name Name.
     * @param team Team.
     */
    @SuppressWarnings("hiding")
    public MouseAgent(final String name, final String description, final CheckersTeam team)
    {
        this.name = name;
        this.description = description;
        this.team = team;
    }

    @Override
    public Action getAction(final Environment environment, final Adjudicator adjudicator)
    {
        Action answer = null;
        fromPosition = null;
        toPosition = null;

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

            if ((fromPosition != null) && (toPosition != null))
            {
                final Action action = createAction((CheckersEnvironment)environment, fromPosition, toPosition);

                if (adjudicator.isActionLegal(action))
                {
                    answer = action;
                }
                else
                {
                    Toolkit.getDefaultToolkit().beep();
                }

                fromPosition = null;
                toPosition = null;
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
    public CheckersTeam getTeam()
    {
        return team;
    }

    @Override
    public void mouseClicked(final MouseEvent event)
    {
        final CheckersEnvironmentUI environmentUI = (CheckersEnvironmentUI)event.getSource();

        if (fromPosition == null)
        {
            fromPosition = environmentUI.getPositionForPoint(event.getPoint());
        }
        else
        {
            toPosition = environmentUI.getPositionForPoint(event.getPoint());

            synchronized (this)
            {
                notifyAll();
            }
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
     * @param fromPosition From position.
     * @param toPosition To position.
     * 
     * @return a new action.
     */
    @SuppressWarnings("hiding")
    private Action createAction(final CheckersEnvironment environment, final CheckersPosition fromPosition,
            final CheckersPosition toPosition)
    {
        Action answer = null;

        final int dx = toPosition.getX() - fromPosition.getX();

        if (Math.abs(dx) == 2)
        {
            answer = new CheckersJumpAction(environment, this, fromPosition, toPosition);
        }
        else if (Math.abs(dx) == 1)
        {
            answer = new CheckersMoveAction(environment, this, fromPosition, toPosition);
        }

        return answer;
    }
}

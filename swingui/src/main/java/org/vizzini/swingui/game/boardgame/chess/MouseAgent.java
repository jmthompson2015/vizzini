package org.vizzini.swingui.game.boardgame.chess;

import java.awt.Toolkit;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.chess.ChessEnvironment;
import org.vizzini.chess.ChessPosition;
import org.vizzini.chess.ChessTeam;
import org.vizzini.chess.DefaultChessAction;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Provides a mouse driven implementation of a human agent for chess.
 */
public final class MouseAgent implements Agent, PropertyChangeListener
{
    /** Description. */
    private final String description;

    /** From position. */
    private ChessPosition fromPosition;

    /** Name. */
    private final String name;

    /** Team. */
    private final ChessTeam team;

    /** To position. */
    private ChessPosition toPosition;

    /**
     * Construct this object.
     * 
     * @param description Description.
     * @param name Name.
     * @param team Team.
     */
    @SuppressWarnings("hiding")
    public MouseAgent(final String name, final String description, final ChessTeam team)
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
                final Action action = createAction((ChessEnvironment)environment, fromPosition, toPosition);

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
    public ChessTeam getTeam()
    {
        return team;
    }

    @Override
    public void postProcessGame(final Agent winner)
    {
        // Nothing to do.
    }

    @Override
    public void propertyChange(final PropertyChangeEvent event)
    {
        final ChessPosition newPosition = (ChessPosition)event.getNewValue();

        if (fromPosition == null)
        {
            fromPosition = newPosition;
            // System.out.println("set fromPosition = " + fromPosition);
        }
        else if (fromPosition != newPosition)
        {
            toPosition = newPosition;
            // System.out.println("set toPosition = " + toPosition);

            synchronized (this)
            {
                notifyAll();
            }
        }
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
    private Action createAction(final ChessEnvironment environment, final ChessPosition fromPosition,
            final ChessPosition toPosition)
    {
        return new DefaultChessAction(environment, this, fromPosition, toPosition);
    }
}

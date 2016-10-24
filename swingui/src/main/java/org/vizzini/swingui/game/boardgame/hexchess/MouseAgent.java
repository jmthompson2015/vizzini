package org.vizzini.swingui.game.boardgame.hexchess;

import java.awt.Toolkit;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.example.boardgame.hexchess.HexChessAction;
import org.vizzini.example.boardgame.hexchess.HexChessEnvironment;
import org.vizzini.example.boardgame.hexchess.HexChessPosition;
import org.vizzini.example.boardgame.hexchess.HexChessTeam;

/**
 * Provides a mouse driven implementation of a human agent for hexagonal chess.
 */
public final class MouseAgent extends MouseAdapter implements Agent
{
    /** Description. */
    private final String description;

    /** From position. */
    private HexChessPosition fromPosition;

    /** Name. */
    private final String name;

    /** Team. */
    private final HexChessTeam team;

    /** To position. */
    private HexChessPosition toPosition;

    /**
     * Construct this object.
     * 
     * @param description Description.
     * @param name Name.
     * @param team Team.
     */
    @SuppressWarnings("hiding")
    public MouseAgent(final String name, final String description, final HexChessTeam team)
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
                final Action action = createAction((HexChessEnvironment)environment, fromPosition, toPosition);

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
    public HexChessTeam getTeam()
    {
        return team;
    }

    @Override
    public void mouseClicked(final MouseEvent event)
    {
        final HexChessEnvironmentUI environmentUI = (HexChessEnvironmentUI)event.getSource();
        final HexChessPosition newPosition = environmentUI.getPositionForPoint(event.getPoint());

        if (fromPosition == null)
        {
            fromPosition = newPosition;
        }
        else
        {
            toPosition = newPosition;

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
    private Action createAction(final HexChessEnvironment environment, final HexChessPosition fromPosition,
            final HexChessPosition toPosition)
    {
        return new HexChessAction(environment, this, fromPosition, toPosition);
    }
}

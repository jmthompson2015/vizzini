package org.vizzini.swingui.game.boardgame.tictactoe;

import java.awt.Toolkit;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.example.boardgame.tictactoe.TTTAction;
import org.vizzini.example.boardgame.tictactoe.TTTEnvironment;
import org.vizzini.example.boardgame.tictactoe.TTTPosition;
import org.vizzini.example.boardgame.tictactoe.TTTTeam;
import org.vizzini.example.boardgame.tictactoe.TTTToken;

/**
 * Provides a mouse driven implementation of a human agent for tic-tac-toe.
 */
public final class MouseAgent extends MouseAdapter implements Agent
{
    /** Name. */
    private final String name;

    /** Position. */
    private TTTPosition position;

    /** Team. */
    private final TTTTeam team;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param team Team.
     */
    @SuppressWarnings("hiding")
    public MouseAgent(final String name, final TTTTeam team)
    {
        this.name = name;
        this.team = team;
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
                final TTTAction action = createAction((TTTEnvironment)environment, position);

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
        return "This agent uses the mouse for input.";
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
    public void mouseClicked(final MouseEvent event)
    {
        final TTTEnvironmentUI environmentUI = (TTTEnvironmentUI)event.getSource();
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
    private TTTAction createAction(final TTTEnvironment environment, final TTTPosition toPosition)
    {
        final TTTToken token = TTTToken.findByTeam(getTeam()).withAgent(this);

        return new TTTAction(environment, toPosition, token);
    }
}

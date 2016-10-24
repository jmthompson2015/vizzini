package org.vizzini.swingui.game.boardgame.qubic;

import java.awt.Toolkit;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.example.boardgame.qubic.QubicAction;
import org.vizzini.example.boardgame.qubic.QubicEnvironment;
import org.vizzini.example.boardgame.qubic.QubicPosition;
import org.vizzini.example.boardgame.qubic.QubicTeam;
import org.vizzini.example.boardgame.qubic.QubicToken;

/**
 * Provides a mouse driven implementation of a human agent for qubic.
 */
public final class MouseAgent implements Agent, PropertyChangeListener
{
    /** Description. */
    private final String description;

    /** Name. */
    private final String name;

    /** Position. */
    private QubicPosition position;

    /** Team. */
    private final QubicTeam team;

    /**
     * Construct this object.
     * 
     * @param description Description.
     * @param name Name.
     * @param team Team.
     */
    @SuppressWarnings("hiding")
    public MouseAgent(final String name, final String description, final QubicTeam team)
    {
        this.name = name;
        this.description = description;
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
                final Action action = createAction((QubicEnvironment)environment, position);

                if (adjudicator.isActionLegal(action))
                {
                    answer = action;
                }
                else
                {
                    Toolkit.getDefaultToolkit().beep();
                }

                position = null;
            }
        }

        // System.out.println("MouseAgent.getAction() answer = " + answer);

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
    public void propertyChange(final PropertyChangeEvent event)
    {
        final QubicPosition newPosition = (QubicPosition)event.getNewValue();

        if (position == null)
        {
            position = newPosition;
            // System.out.println("set position = " + position);

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
     * @param position Position.
     * @return a new action.
     */
    @SuppressWarnings("hiding")
    private Action createAction(final QubicEnvironment environment, final QubicPosition position)
    {
        QubicToken token = QubicToken.findByTeam(getTeam());
        token = token.withAgent(this);

        return new QubicAction(environment, position, token);
    }
}

package org.vizzini.swingui.game.cardgame.gin;

import java.awt.Component;
import java.awt.Toolkit;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.cardgame.PokerCard;
import org.vizzini.example.cardgame.gin.DiscardAction;
import org.vizzini.example.cardgame.gin.GinEnvironment;
import org.vizzini.example.cardgame.gin.GinTeam;
import org.vizzini.example.cardgame.gin.TakeDiscardAction;
import org.vizzini.example.cardgame.gin.TakeStockAction;
import org.vizzini.swingui.game.cardgame.CardUI;

/**
 * Provides a mouse driven implementation of a human agent for gin.
 */
public final class MouseAgent extends MouseAdapter implements Agent
{
    /** Action class. */
    private Class<?> actionClass;

    /** Card. */
    private PokerCard card;

    /** Description. */
    private final String description;

    /** Name. */
    private final String name;

    /** Team. */
    private final GinTeam team;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param description Description.
     * @param team Team.
     */
    @SuppressWarnings("hiding")
    public MouseAgent(final String name, final String description, final GinTeam team)
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
        actionClass = null;
        card = null;

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

            if (actionClass != null)
            {
                final GinEnvironment gEnvironment = (GinEnvironment)environment;
                final Action action = createAction(gEnvironment);

                if (adjudicator.isActionLegal(action))
                {
                    if (actionClass == DiscardAction.class)
                    {
                        answer = action;
                    }
                    else
                    {
                        action.doIt();
                    }
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
    public GinTeam getTeam()
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
        final Component source = (Component)event.getSource();
        System.out.println("source = " + source.getName());

        if ("stockPileUI".equals(source.getName()))
        {
            actionClass = TakeStockAction.class;
        }
        else if (source instanceof CardUI)
        {
            final CardUI cardUi = (CardUI)source;
            card = (PokerCard)cardUi.getClientProperty("card");

            if ("discardPileUI".equals(source.getName()))
            {
                actionClass = TakeDiscardAction.class;
            }
            else
            {
                actionClass = DiscardAction.class;
            }
        }

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
     * 
     * @return a new action.
     */
    private Action createAction(final GinEnvironment environment)
    {
        Action answer = null;

        if (actionClass == TakeStockAction.class)
        {
            answer = new TakeStockAction(environment, this);
        }
        else if (actionClass == TakeDiscardAction.class)
        {
            answer = new TakeDiscardAction(environment, this);
        }
        else if (actionClass == DiscardAction.class)
        {
            answer = new DiscardAction(environment, card);
        }

        return answer;
    }
}

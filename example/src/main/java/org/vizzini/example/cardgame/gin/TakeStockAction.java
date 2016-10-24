package org.vizzini.example.cardgame.gin;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.cardgame.PokerCard;

/**
 * Provides a take stock action for gin.
 */
public final class TakeStockAction implements Action
{
    /** Agent. */
    private final Agent agent;

    /** Environment. */
    private final GinEnvironment environment;

    /**
     * Construct this object.
     * 
     * @param environment Environment. (required)
     * @param agent Agent. (required)
     */
    @SuppressWarnings("hiding")
    public TakeStockAction(final GinEnvironment environment, final Agent agent)
    {
        if (environment == null)
        {
            throw new IllegalArgumentException("environment is null");
        }

        if (agent == null)
        {
            throw new IllegalArgumentException("agent is null");
        }

        this.environment = environment;
        this.agent = agent;
    }

    @Override
    public boolean doIt()
    {
        final PokerCard card = environment.popStockPile().withAgent(agent);
        environment.addToHand(agent, card);

        environment.fireDoActionPropertyChange(null, this);

        return true;
    }

    @Override
    public Agent getAgent()
    {
        return agent;
    }

    @Override
    public GinEnvironment getEnvironment()
    {
        return environment;
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("agent", getAgent());

        return builder.toString();
    }

    @Override
    public boolean undoIt()
    {
        // TODO Auto-generated method stub
        return false;
    }
}

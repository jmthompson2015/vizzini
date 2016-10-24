package org.vizzini.example.cardgame.gin;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.cardgame.PokerCard;

/**
 * Provides a discard action for gin.
 */
public final class DiscardAction implements Action
{
    /** Environment. */
    private final GinEnvironment environment;

    /** Card. */
    private final PokerCard card;

    /**
     * Construct this object.
     * 
     * @param environment Environment. (required)
     * @param card Card. (required)
     */
    @SuppressWarnings("hiding")
    public DiscardAction(final GinEnvironment environment, final PokerCard card)
    {
        if (environment == null)
        {
            throw new IllegalArgumentException("environment is null");
        }

        if (card == null)
        {
            throw new IllegalArgumentException("card is null");
        }

        this.environment = environment;
        this.card = card;
    }

    @Override
    public boolean doIt()
    {
        environment.removeFromHand(getAgent(), card);
        environment.pushDiscardPile(card);

        environment.fireDoActionPropertyChange(null, this);

        return true;
    }

    @Override
    public Agent getAgent()
    {
        return getCard().getAgent();
    }

    /**
     * @return the card
     */
    public PokerCard getCard()
    {
        return card;
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

        builder.append("card", getCard());
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

package org.vizzini.example.cardgame.gin;

import java.util.Collections;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.cardgame.PokerCard;
import org.vizzini.core.game.cardgame.RankSuitCardComparator;

/**
 * Provides a simple implementation of a computer agent for gin.
 */
public final class SimpleAgent implements Agent
{
    /** Name. */
    private final String name;

    /** Team. */
    private final GinTeam team;

    /**
     * Construct this object.
     * 
     * @param name Name. (required)
     * @param team Team. (required)
     */
    @SuppressWarnings("hiding")
    public SimpleAgent(final String name, final GinTeam team)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        if (team == null)
        {
            throw new IllegalArgumentException("team is null");
        }

        this.name = name;
        this.team = team;
    }

    @Override
    public Action getAction(final Environment environment, final Adjudicator adjudicator)
    {
        final GinEnvironment gEnvironment = (GinEnvironment)environment;
        final List<PokerCard> hand = gEnvironment.getHandFor(this);

        if (hand.size() < 11)
        {
            // Take a card from the stock pile.
            final TakeStockAction takeAction = new TakeStockAction(gEnvironment, this);
            // System.out.println("takeAction = " + takeAction);
            takeAction.doIt();
        }

        // Discard the highest rank card from hand.
        // System.out.println("hand.size() = " + hand.size());
        final RankSuitCardComparator comparator = new RankSuitCardComparator();
        Collections.sort(hand, comparator);
        final PokerCard card = hand.get(hand.size() - 1);
        final DiscardAction answer = new DiscardAction(gEnvironment, card);
        // System.out.println("answer = " + answer);

        return answer;
    }

    @Override
    public String getDescription()
    {
        return "This agent always takes from the stock pile, then discards the highest rank card.";
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
}

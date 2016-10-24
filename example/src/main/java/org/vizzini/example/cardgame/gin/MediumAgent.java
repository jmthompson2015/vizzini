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
 * Provides a medium implementation of a computer agent for gin.
 */
public final class MediumAgent implements Agent
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
    public MediumAgent(final String name, final GinTeam team)
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
            // FIXME choose between discard pile and stock pile

            // Take a card from the stock pile.
            final TakeStockAction takeAction = new TakeStockAction(gEnvironment, this);
            System.out.println("takeAction = " + takeAction);
            takeAction.doIt();
        }

        final HandAnalyzer analyzer = new HandAnalyzer(hand);
        final List<PokerCard> deadwood = analyzer.getDeadwood();

        PokerCard card;

        if (!deadwood.isEmpty())
        {
            card = deadwood.get(deadwood.size() - 1);
        }
        else
        {
            // FIXME choose from a four count meld?

            final RankSuitCardComparator comparator = new RankSuitCardComparator();
            Collections.sort(hand, comparator);
            card = hand.get(hand.size() - 1);
        }

        final DiscardAction answer = new DiscardAction(gEnvironment, card);
        System.out.println("answer = " + answer);

        return answer;
    }

    @Override
    public String getDescription()
    {
        return "This agent always takes from the stock pile, then discards from deadwood.";
    }

    /**
     * @return the name
     */
    @Override
    public String getName()
    {
        return name;
    }

    /**
     * @return the team
     */
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

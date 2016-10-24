package org.vizzini.example.cardgame.gin;

import java.util.List;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.cardgame.PokerCard;

/**
 * Provides an adjudicator for gin.
 */
public final class GinAdjudicator implements Adjudicator
{
    @Override
    public Agent determineWinner(final Environment environment)
    {
        Agent answer = null;

        final GinEnvironment gEnvironment = (GinEnvironment)environment;

        if (isWinner(gEnvironment, gEnvironment.getFirstAgent()))
        {
            printHand(gEnvironment.getHandFor(gEnvironment.getFirstAgent()));
            answer = gEnvironment.getFirstAgent();
        }
        else if (isWinner(gEnvironment, gEnvironment.getSecondAgent()))
        {
            printHand(gEnvironment.getHandFor(gEnvironment.getSecondAgent()));
            answer = gEnvironment.getSecondAgent();
        }

        return answer;
    }

    @Override
    public String getDescription()
    {
        return "A gin adjudicator.";
    }

    @Override
    public String getName()
    {
        return "Gin Adjudicator";
    }

    @Override
    public boolean isActionLegal(final Action action)
    {
        boolean answer = false;

        if (action instanceof TakeStockAction)
        {
            final TakeStockAction myAction = (TakeStockAction)action;
            final GinEnvironment environment = myAction.getEnvironment();
            final Agent agent = myAction.getAgent();
            answer = environment.getHandSizeFor(agent) == 10;
        }
        else if (action instanceof TakeDiscardAction)
        {
            final TakeDiscardAction myAction = (TakeDiscardAction)action;
            final GinEnvironment environment = myAction.getEnvironment();
            final Agent agent = myAction.getAgent();
            answer = environment.getHandSizeFor(agent) == 10;
        }
        else if (action instanceof DiscardAction)
        {
            final DiscardAction myAction = (DiscardAction)action;
            final GinEnvironment environment = myAction.getEnvironment();
            final Agent agent = myAction.getAgent();
            answer = environment.getHandSizeFor(agent) == 11;
        }
        else
        {
            throw new RuntimeException("Unknown action type: " + action);
        }

        return answer;
    }

    @Override
    public boolean isGameOver(final Environment environment)
    {
        return determineWinner(environment) != null;
    }

    /**
     * @param environment Environment.
     * @param agent Agent.
     * 
     * @return true if the agent is a winner.
     */
    private boolean isWinner(final GinEnvironment environment, final Agent agent)
    {
        final List<PokerCard> hand = environment.getHandFor(agent);
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        return analyzer.isGin();
    }

    /**
     * @param hand Hand.
     */
    private void printHand(final List<PokerCard> hand)
    {
        for (final PokerCard card : hand)
        {
            System.out.print(card.getSymbol());
            System.out.print(" ");
        }

        System.out.println();
    }
}

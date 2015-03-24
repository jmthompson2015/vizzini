package org.vizzini.example.cardgame.gin;

import java.beans.PropertyChangeListener;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Stack;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultEnvironment;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Position;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;
import org.vizzini.core.game.cardgame.PokerCard;

/**
 * Provides an environment for gin.
 */
public final class GinEnvironment implements Environment
{
    /** Delegate. */
    private final Environment delegate;

    /** Discard pile. */
    private final Stack<PokerCard> discardPile = new Stack<PokerCard>();

    /** First agent. */
    private Agent firstAgent;

    /** First hand. */
    private final List<PokerCard> firstHand = new ArrayList<PokerCard>();

    /** Second agent. */
    private Agent secondAgent;

    /** Second hand. */
    private final List<PokerCard> secondHand = new ArrayList<PokerCard>();

    /** Stock pile. */
    private final Stack<PokerCard> stockPile = new Stack<PokerCard>();

    /**
     * Construct this object.
     */
    public GinEnvironment()
    {
        final String name = "Gin Environment";
        final String description = "A gin environment.";

        delegate = new DefaultEnvironment(name, description);

        clear();
    }

    @Override
    public void addDoActionListener(final PropertyChangeListener listener)
    {
        delegate.addDoActionListener(listener);
    }

    /**
     * @param agent Agent.
     * @param card Card.
     */
    public void addToHand(final Agent agent, final PokerCard card)
    {
        final List<PokerCard> hand = getHandFor(agent);
        hand.add(card);
    }

    @Override
    public void addUndoActionListener(final PropertyChangeListener listener)
    {
        delegate.addUndoActionListener(listener);
    }

    @Override
    public void clear()
    {
        stockPile.clear();
        discardPile.clear();
        firstHand.clear();
        secondHand.clear();

        stockPile.addAll(Arrays.asList(PokerCard.values()));
    }

    @Override
    public GinEnvironment copy()
    {
        final GinEnvironment answer = new GinEnvironment();

        answer.stockPile.addAll(stockPile);
        answer.discardPile.addAll(discardPile);
        answer.firstHand.addAll(firstHand);
        answer.secondHand.addAll(secondHand);

        answer.firstAgent = firstAgent;
        answer.secondAgent = secondAgent;

        return answer;
    }

    @Override
    public void fireDoActionPropertyChange(final Action oldValue, final Action newValue)
    {
        delegate.fireDoActionPropertyChange(oldValue, newValue);
    }

    @Override
    public void fireUndoActionPropertyChange(final Action oldValue, final Action newValue)
    {
        delegate.fireUndoActionPropertyChange(oldValue, newValue);
    }

    @Override
    public String getDescription()
    {
        return delegate.getDescription();
    }

    /**
     * @return the discardPile
     */
    public Stack<PokerCard> getDiscardPile()
    {
        return discardPile;
    }

    /**
     * @return the firstAgent
     */
    public Agent getFirstAgent()
    {
        return firstAgent;
    }

    /**
     * @param agent Agent.
     * 
     * @return the hand.
     */
    public List<PokerCard> getHandFor(final Agent agent)
    {
        List<PokerCard> answer = null;

        if (agent != null)
        {
            if (agent.getTeam() == GinTeam.FIRST)
            {
                answer = firstHand;
            }
            else if (agent.getTeam() == GinTeam.SECOND)
            {
                answer = secondHand;
            }
        }

        return answer;
    }

    /**
     * @param agent Agent.
     * 
     * @return the hand.
     */
    public int getHandSizeFor(final Agent agent)
    {
        int answer = -1;

        if (agent != null)
        {
            if (agent.getTeam() == GinTeam.FIRST)
            {
                answer = firstHand.size();
            }
            else if (agent.getTeam() == GinTeam.SECOND)
            {
                answer = secondHand.size();
            }
        }

        return answer;
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    /**
     * @return the secondAgent
     */
    public Agent getSecondAgent()
    {
        return secondAgent;
    }

    /**
     * @return the stockPile
     */
    public Stack<PokerCard> getStockPile()
    {
        return stockPile;
    }

    @Override
    public PokerCard getTokenAt(final Position<?> position)
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public int getTokenCount()
    {
        return stockPile.size() + discardPile.size() + firstHand.size() + secondHand.size();
    }

    @Override
    public int getTokenCountFor(final Agent agent)
    {
        return getTokenCountFor(agent.getTeam());
    }

    @Override
    public int getTokenCountFor(final Team team)
    {
        int answer = 0;

        if (team == GinTeam.FIRST)
        {
            answer = firstHand.size();
        }
        else if (team == GinTeam.SECOND)
        {
            answer = secondHand.size();
        }

        return answer;
    }

    /**
     * @return the top discard card.
     */
    public PokerCard peekDiscardPile()
    {
        PokerCard answer = null;

        if (!discardPile.isEmpty())
        {
            answer = discardPile.peek();
        }

        return answer;
    }

    @Override
    public void placeInitialTokens(final List<Agent> agents)
    {
        firstAgent = agents.get(0);
        secondAgent = agents.get(1);

        Collections.shuffle(stockPile);

        // Deal.
        for (int i = 0; i < 10; i++)
        {
            firstHand.add(stockPile.pop().withAgent(firstAgent));
            secondHand.add(stockPile.pop().withAgent(secondAgent));
        }

        discardPile.push(stockPile.pop());

        fireDoActionPropertyChange(null, null);
    }

    @Override
    public void placeToken(final Position<?> position, final Token token)
    {
        throw new RuntimeException("method not implemented");
    }

    /**
     * @return the top discard card.
     */
    public PokerCard popDiscardPile()
    {
        PokerCard answer = null;

        if (!discardPile.isEmpty())
        {
            answer = discardPile.pop();
        }

        return answer;
    }

    /**
     * @return the top stock card.
     */
    public PokerCard popStockPile()
    {
        PokerCard answer = null;

        if (!stockPile.isEmpty())
        {
            answer = stockPile.pop();
        }

        return answer;
    }

    /**
     * @param card Card.
     * 
     * @return the top discard card.
     */
    public PokerCard pushDiscardPile(final PokerCard card)
    {
        final PokerCard answer = discardPile.push(card.withAgent(null));

        return answer;
    }

    @Override
    public void removeDoActionListener(final PropertyChangeListener listener)
    {
        delegate.removeDoActionListener(listener);
    }

    /**
     * @param agent Agent.
     * @param card Card.
     */
    public void removeFromHand(final Agent agent, final PokerCard card)
    {
        final List<PokerCard> hand = getHandFor(agent);
        hand.remove(card);
    }

    @Override
    public void removeToken(final Position<?> position)
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public void removeUndoActionListener(final PropertyChangeListener listener)
    {
        delegate.removeUndoActionListener(listener);
    }
}

package org.vizzini.example.boardgame.tictactoe;

import java.beans.PropertyChangeListener;
import java.util.List;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultEnvironment;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Position;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;
import org.vizzini.core.game.boardgame.BoardGameEnvironment;

/**
 * Provides an implementation of an environment for tic-tac-toe.
 */
public final class TTTEnvironment implements BoardGameEnvironment
{
    /** Delegate. */
    private final Environment delegate;

    /** First agent. */
    private Agent firstAgent;

    /** Second agent. */
    private Agent secondAgent;

    /**
     * Construct this object.
     */
    public TTTEnvironment()
    {
        final String name = "Tic-tac-toe board";
        final String description = "Tic-tac-toe board";

        delegate = new DefaultEnvironment(name, description);
    }

    @Override
    public void addDoActionListener(final PropertyChangeListener listener)
    {
        delegate.addDoActionListener(listener);
    }

    @Override
    public void addUndoActionListener(final PropertyChangeListener listener)
    {
        delegate.addUndoActionListener(listener);
    }

    @Override
    public void clear()
    {
        firstAgent = null;
        secondAgent = null;

        delegate.clear();
    }

    @Override
    public TTTEnvironment copy()
    {
        final TTTEnvironment answer = new TTTEnvironment();

        final TTTPosition[] values = TTTPosition.values();

        for (final TTTPosition position : values)
        {
            final Token token = getTokenAt(position);

            if (token != null)
            {
                answer.placeToken(position, token);
            }
        }

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

    @Override
    public Agent getFirstAgent()
    {
        return firstAgent;
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    @Override
    public Agent getSecondAgent()
    {
        return secondAgent;
    }

    @Override
    public TTTToken getTokenAt(final Position<?> position)
    {
        return (TTTToken)delegate.getTokenAt(position);
    }

    @Override
    public int getTokenCount()
    {
        return delegate.getTokenCount();
    }

    @Override
    public int getTokenCountFor(final Agent agent)
    {
        return delegate.getTokenCountFor(agent);
    }

    @Override
    public int getTokenCountFor(final Team team)
    {
        return delegate.getTokenCountFor(team);
    }

    /**
     * @param position TTTPosition.
     * 
     * @return true if the given position is empty.
     */
    public boolean isEmpty(final TTTPosition position)
    {
        return getTokenAt(position) == null;
    }

    @Override
    public void placeInitialTokens(final List<Agent> agents)
    {
        firstAgent = agents.get(0);
        secondAgent = agents.get(1);
    }

    @Override
    public void placeToken(final Position<?> position, final Token token)
    {
        if (token == null)
        {
            throw new IllegalArgumentException("token is null");
        }

        if (token.getAgent() == null)
        {
            throw new RuntimeException("token has no agent!");
        }

        delegate.placeToken(position, token);
    }

    @Override
    public void removeDoActionListener(final PropertyChangeListener listener)
    {
        delegate.removeDoActionListener(listener);
    }

    @Override
    public void removeToken(final Position<?> position)
    {
        delegate.removeToken(position);
    }

    @Override
    public void removeUndoActionListener(final PropertyChangeListener listener)
    {
        delegate.removeUndoActionListener(listener);
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append("   a b c\n");

        for (int y = 0; y < TTTPosition.MAX_Y; y++)
        {
            sb.append(y + 1).append(" |");

            for (int x = 0; x < TTTPosition.MAX_X; x++)
            {
                final TTTPosition position = TTTPosition.findByCoordinates(x, y);
                final Token token = getTokenAt(position);

                if (token == null)
                {
                    sb.append(" ");
                }
                else
                {
                    sb.append(token.getName());
                }

                sb.append("|");
            }

            if (y < (TTTPosition.MAX_Y - 1))
            {
                sb.append("\n");
            }
        }

        return sb.toString();
    }
}

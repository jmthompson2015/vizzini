package org.vizzini.example.boardgame.qubic;

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
 * Provides an implementation of an environment for qubic.
 */
public final class QubicEnvironment implements BoardGameEnvironment
{
    /** Delegate. */
    private final Environment delegate;

    /** Agent red. */
    private Agent firstAgent;

    /** Agent white. */
    private Agent secondAgent;

    /**
     * Construct this object.
     */
    public QubicEnvironment()
    {
        final String name = "QubicBoard";
        final String description = "A qubic board.";

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
    public QubicEnvironment copy()
    {
        final QubicEnvironment answer = new QubicEnvironment();

        final QubicPosition[] values = QubicPosition.values();

        for (final QubicPosition position : values)
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
    public QubicToken getTokenAt(final Position<?> position)
    {
        return (QubicToken)delegate.getTokenAt(position);
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
    public boolean isEmpty(final QubicPosition position)
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

        for (int z = 0; z < QubicPosition.MAX_Z; z++)
        {
            sb.append("Level ").append((char)('A' + z)).append("\n");
            sb.append("   a b c d\n");

            for (int y = 0; y < QubicPosition.MAX_Y; y++)
            {
                sb.append(y + 1).append(" |");

                for (int x = 0; x < QubicPosition.MAX_X; x++)
                {
                    final QubicPosition position = QubicPosition.findByCoordinates(x, y, z);
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

                if (y < (QubicPosition.MAX_Y - 1))
                {
                    sb.append("\n");
                }
            }

            if (z < (QubicPosition.MAX_Z - 1))
            {
                sb.append("\n");
            }
        }

        return sb.toString();
    }
}

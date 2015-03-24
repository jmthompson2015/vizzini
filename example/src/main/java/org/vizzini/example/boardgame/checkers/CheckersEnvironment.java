package org.vizzini.example.boardgame.checkers;

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
 * Provides an environment for checkers.
 */
public final class CheckersEnvironment implements BoardGameEnvironment
{
    /** Delegate. */
    private final Environment delegate;

    /** Agent red. */
    private Agent firstAgent;

    /** Last action from position. */
    private CheckersPosition lastActionFromPosition;

    /** Last action to position. */
    private CheckersPosition lastActionToPosition;

    /** Agent white. */
    private Agent secondAgent;

    /**
     * Construct this object.
     */
    public CheckersEnvironment()
    {
        final String name = "Checker board";
        final String description = "Checker board";

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
    public CheckersEnvironment copy()
    {
        final CheckersEnvironment answer = new CheckersEnvironment();

        final CheckersPosition[] values = CheckersPosition.values();

        for (final CheckersPosition position : values)
        {
            final Token token = getTokenAt(position);

            if (token != null)
            {
                answer.placeToken(position, token);
            }
        }

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

    @Override
    public Agent getFirstAgent()
    {
        if (firstAgent == null)
        {
            for (final CheckersPosition position : CheckersPosition.values())
            {
                final Token token = getTokenAt(position);

                if ((token != null) && (token.getTeam() == CheckersTeam.RED))
                {
                    firstAgent = token.getAgent();
                    break;
                }
            }
        }

        return firstAgent;
    }

    /**
     * @return the lastActionFromPosition
     */
    public CheckersPosition getLastActionFromPosition()
    {
        return lastActionFromPosition;
    }

    /**
     * @return the lastActionToPosition
     */
    public CheckersPosition getLastActionToPosition()
    {
        return lastActionToPosition;
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    @Override
    public Agent getSecondAgent()
    {
        if (secondAgent == null)
        {
            for (final CheckersPosition position : CheckersPosition.values())
            {
                final Token token = getTokenAt(position);

                if ((token != null) && (token.getTeam() == CheckersTeam.WHITE))
                {
                    secondAgent = token.getAgent();
                    break;
                }
            }
        }

        return secondAgent;
    }

    @Override
    public Token getTokenAt(final Position<?> position)
    {
        return delegate.getTokenAt(position);
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
     * @param agents Agents.
     */
    @Override
    public void placeInitialTokens(final List<Agent> agents)
    {
        firstAgent = agents.get(0);

        for (int y = CheckersPosition.MAX_Y - 3; y < CheckersPosition.MAX_Y; y++)
        {
            for (int x = 0; x < CheckersPosition.MAX_X; x++)
            {
                if ((x % 2) != (y % 2))
                {
                    final CheckersPosition position = CheckersPosition.findByCoordinates(x, y);
                    final Token token = Pawn.RED.withAgent(firstAgent);
                    placeToken(position, token);
                }
            }
        }

        secondAgent = agents.get(1);

        for (int y = 0; y < 3; y++)
        {
            for (int x = 0; x < CheckersPosition.MAX_X; x++)
            {
                if ((x % 2) != (y % 2))
                {
                    final CheckersPosition position = CheckersPosition.findByCoordinates(x, y);
                    final Token token = Pawn.WHITE.withAgent(secondAgent);
                    placeToken(position, token);
                }
            }
        }

        lastActionFromPosition = null;
        lastActionToPosition = null;
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

        lastActionToPosition = (CheckersPosition)position;
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

        lastActionFromPosition = (CheckersPosition)position;
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

        sb.append("  0 1 2 3 4 5 6 7\n");

        for (int y = 0; y < CheckersPosition.MAX_Y; y++)
        {
            sb.append(y).append(" ");

            for (int x = 0; x < CheckersPosition.MAX_X; x++)
            {
                if ((x % 2) == (y % 2))
                {
                    sb.append("#");
                }
                else
                {
                    final CheckersPosition position = CheckersPosition.findByCoordinates(x, y);
                    final Token token = getTokenAt(position);

                    if (token == null)
                    {
                        sb.append(" ");
                    }
                    else
                    {
                        if (token instanceof Pawn)
                        {
                            if (token.getTeam() == CheckersTeam.RED)
                            {
                                sb.append("P");
                            }
                            else
                            {
                                sb.append("p");
                            }
                        }
                        else
                        {
                            if (token.getTeam() == CheckersTeam.RED)
                            {
                                sb.append("K");
                            }
                            else
                            {
                                sb.append("k");
                            }
                        }
                    }
                }

                sb.append("|");
            }

            sb.append("\n");
        }

        return sb.toString();
    }
}

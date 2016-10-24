package org.vizzini.example.boardgame.reversi;

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
 * Provides an implementation of an environment for reversi.
 */
public final class ReversiEnvironment implements BoardGameEnvironment
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
    public ReversiEnvironment()
    {
        final String name = "Reversi Environment";
        final String description = "A reversi environment.";

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
    public ReversiEnvironment copy()
    {
        final ReversiEnvironment answer = new ReversiEnvironment();

        final ReversiPosition[] values = ReversiPosition.values();

        for (final ReversiPosition position : values)
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

    /**
     * @param team Team.
     * @param position0 Base position.
     * @param direction Direction vector.
     * 
     * @return the number of opposite agent tokens between the base coordinate an agent token.
     */
    public int determineLineLength(final ReversiTeam team, final ReversiPosition position0, final int[] direction)
    {
        int answer = -1;

        boolean isLooking = true;
        int j = 0;

        while ((answer < 0) && isLooking)
        {
            j++;
            final int x2 = position0.getX() + (j * direction[0]);
            final int y2 = position0.getY() + (j * direction[1]);
            final ReversiPosition position2 = ReversiPosition.findByCoordinates(x2, y2);

            if (position2 != null)
            {
                final ReversiToken token2 = getTokenAt(position2);

                if (token2 == null)
                {
                    isLooking = false;
                }
                else if (team.equals(token2.getTeam()))
                {
                    if (j > 1)
                    {
                        answer = j - 1;
                    }

                    isLooking = false;
                }
            }
            else
            {
                isLooking = false;
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

    /**
     * @param position Position.
     */
    public void flipTokenAt(final ReversiPosition position)
    {
        if (position != null)
        {
            final ReversiToken oldToken = getTokenAt(position);

            if (oldToken != null)
            {
                final ReversiTeam newTeam = oldToken.getTeam().opposite();
                final Agent newAgent = findAgentFor(newTeam);
                final ReversiToken newToken = ReversiToken.findByTeam(newTeam).withAgent(newAgent);
                placeToken(position, newToken);
            }
        }
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
    public ReversiToken getTokenAt(final Position<?> position)
    {
        return (ReversiToken)delegate.getTokenAt(position);
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

    @Override
    public void placeInitialTokens(final List<Agent> agents)
    {
        firstAgent = agents.get(0);
        final ReversiToken tokenBlack = ReversiToken.BLACK.withAgent(firstAgent);
        placeToken(ReversiPosition.CENTER1, tokenBlack);
        placeToken(ReversiPosition.CENTER2, tokenBlack);

        secondAgent = agents.get(1);
        final ReversiToken tokenWhite = ReversiToken.WHITE.withAgent(secondAgent);
        placeToken(ReversiPosition.CENTER0, tokenWhite);
        placeToken(ReversiPosition.CENTER3, tokenWhite);
    }

    @Override
    public void placeToken(final Position<?> position, final Token token)
    {
        if (position == null)
        {
            throw new IllegalArgumentException("position is null");
        }

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

        sb.append("   a b c d e f g h\n");

        for (int y = 0; y < ReversiPosition.MAX_Y; y++)
        {
            sb.append(y + 1).append(" |");

            for (int x = 0; x < ReversiPosition.MAX_X; x++)
            {
                final ReversiPosition position = ReversiPosition.findByCoordinates(x, y);
                final Token token = getTokenAt(position);

                if (token == null)
                {
                    sb.append(" ");
                }
                else
                {
                    sb.append(token.getName().substring(0, 1));
                }

                sb.append("|");
            }

            if (y < (ReversiPosition.MAX_Y - 1))
            {
                sb.append("\n");
            }
        }

        return sb.toString();
    }

    /**
     * @param team Team.
     * 
     * @return agent.
     */
    private Agent findAgentFor(final ReversiTeam team)
    {
        return team == ReversiTeam.BLACK ? firstAgent : secondAgent;
    }
}

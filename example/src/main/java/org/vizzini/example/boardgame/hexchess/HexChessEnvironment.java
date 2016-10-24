package org.vizzini.example.boardgame.hexchess;

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
 * Provides an environment for hexagonal chess.
 * 
 * @see <a href="http://en.wikipedia.org/wiki/Hexagonal_chess">Hexagonal chess (Wikipedia)</a>
 * @see <a href="http://www.redblobgames.com/grids/hexagons/">Hexagonal Grids</a>
 */
public final class HexChessEnvironment implements BoardGameEnvironment
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
    public HexChessEnvironment()
    {
        delegate = new DefaultEnvironment("HexChessEnvironment", "A hexagonal chess environment.");
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
    public HexChessEnvironment copy()
    {
        // TODO Auto-generated method stub
        return null;
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
    public HexChessToken getTokenAt(final Position<?> position)
    {
        return (HexChessToken)delegate.getTokenAt(position);
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
        delegate.placeInitialTokens(agents);

        firstAgent = agents.get(0);
        secondAgent = agents.get(1);

        {
            final Agent agent = agents.get(0);

            placeToken(HexChessPosition.b1, HexChessToken.WHITE_PAWN.withAgent(agent));
            placeToken(HexChessPosition.c1, HexChessToken.WHITE_ROOK.withAgent(agent));
            placeToken(HexChessPosition.d1, HexChessToken.WHITE_KNIGHT.withAgent(agent));
            placeToken(HexChessPosition.e1, HexChessToken.WHITE_QUEEN.withAgent(agent));
            placeToken(HexChessPosition.f1, HexChessToken.WHITE_BISHOP.withAgent(agent));
            placeToken(HexChessPosition.g1, HexChessToken.WHITE_KING.withAgent(agent));
            placeToken(HexChessPosition.h1, HexChessToken.WHITE_KNIGHT.withAgent(agent));
            placeToken(HexChessPosition.i1, HexChessToken.WHITE_ROOK.withAgent(agent));
            placeToken(HexChessPosition.k1, HexChessToken.WHITE_PAWN.withAgent(agent));

            placeToken(HexChessPosition.c2, HexChessToken.WHITE_PAWN.withAgent(agent));
            placeToken(HexChessPosition.f2, HexChessToken.WHITE_BISHOP.withAgent(agent));
            placeToken(HexChessPosition.i2, HexChessToken.WHITE_PAWN.withAgent(agent));

            placeToken(HexChessPosition.d3, HexChessToken.WHITE_PAWN.withAgent(agent));
            placeToken(HexChessPosition.f3, HexChessToken.WHITE_BISHOP.withAgent(agent));
            placeToken(HexChessPosition.h3, HexChessToken.WHITE_PAWN.withAgent(agent));

            placeToken(HexChessPosition.e4, HexChessToken.WHITE_PAWN.withAgent(agent));
            placeToken(HexChessPosition.g4, HexChessToken.WHITE_PAWN.withAgent(agent));

            placeToken(HexChessPosition.f5, HexChessToken.WHITE_PAWN.withAgent(agent));
        }

        {
            final Agent agent = agents.get(1);

            placeToken(HexChessPosition.b7, HexChessToken.BLACK_PAWN.withAgent(agent));
            placeToken(HexChessPosition.c7, HexChessToken.BLACK_PAWN.withAgent(agent));
            placeToken(HexChessPosition.d7, HexChessToken.BLACK_PAWN.withAgent(agent));
            placeToken(HexChessPosition.e7, HexChessToken.BLACK_PAWN.withAgent(agent));
            placeToken(HexChessPosition.f7, HexChessToken.BLACK_PAWN.withAgent(agent));
            placeToken(HexChessPosition.g7, HexChessToken.BLACK_PAWN.withAgent(agent));
            placeToken(HexChessPosition.h7, HexChessToken.BLACK_PAWN.withAgent(agent));
            placeToken(HexChessPosition.i7, HexChessToken.BLACK_PAWN.withAgent(agent));
            placeToken(HexChessPosition.k7, HexChessToken.BLACK_PAWN.withAgent(agent));

            placeToken(HexChessPosition.c8, HexChessToken.BLACK_ROOK.withAgent(agent));
            placeToken(HexChessPosition.i8, HexChessToken.BLACK_ROOK.withAgent(agent));

            placeToken(HexChessPosition.d9, HexChessToken.BLACK_KNIGHT.withAgent(agent));
            placeToken(HexChessPosition.f9, HexChessToken.BLACK_BISHOP.withAgent(agent));
            placeToken(HexChessPosition.h9, HexChessToken.BLACK_KNIGHT.withAgent(agent));

            placeToken(HexChessPosition.e10, HexChessToken.BLACK_QUEEN.withAgent(agent));
            placeToken(HexChessPosition.f10, HexChessToken.BLACK_BISHOP.withAgent(agent));
            placeToken(HexChessPosition.g10, HexChessToken.BLACK_KING.withAgent(agent));

            placeToken(HexChessPosition.f11, HexChessToken.BLACK_BISHOP.withAgent(agent));
        }
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
}

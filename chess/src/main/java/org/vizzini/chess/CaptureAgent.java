package org.vizzini.chess;

import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Team;

/**
 * Provides an agent which selects a capture move if available, or delegates to another agent.
 */
public final class CaptureAgent implements Agent
{
    /** Agent delegate. */
    private final Agent delegate;

    /** Token map filter. */
    private final TokenMapFilter filter = new TokenMapFilter();

    /**
     * Construct this object.
     * 
     * @param delegate Agent delegate.
     */
    @SuppressWarnings("hiding")
    public CaptureAgent(final Agent delegate)
    {
        this.delegate = delegate;
    }

    /**
     * Construct this object.
     * 
     * @param name Name. (required)
     * @param team Team. (required)
     * @param actionGenerator Action generator. (required)
     */
    public CaptureAgent(final String name, final ChessTeam team, final ChessActionGenerator actionGenerator)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        if (team == null)
        {
            throw new IllegalArgumentException("team is null");
        }

        if (actionGenerator == null)
        {
            throw new IllegalArgumentException("actionGenerator is null");
        }

        this.delegate = new SimpleAgent(name, team, actionGenerator);
    }

    @Override
    public Action getAction(final Environment environment, final Adjudicator adjudicator)
    {
        final ChessEnvironment board = (ChessEnvironment)environment;

        ChessAction answer = null;

        final Map<Integer, ChessToken> captureTokens = filter.filterByCaptureMove(board, board.getWhoseMove());

        // Find the "best" capture.
        int bestFromIndex = -1;
        int bestToIndex = -1;
        ChessToken bestFromToken = null;
        ChessToken bestToToken = null;
        int bestFromValue = Integer.MAX_VALUE;
        int bestToValue = -1;

        for (final Entry<Integer, ChessToken> entry : captureTokens.entrySet())
        {
            // Capture the highest value piece with the lowest value piece?
            final ChessToken fromToken = entry.getValue();

            for (final int toIndex : fromToken.getValidMoves())
            {
                final ChessToken toToken = board.getTokenAt(toIndex);

                if (toToken != null)
                {
                    if ((toToken.getValue() > bestToValue) && (fromToken.getValue() <= bestFromValue))
                    {
                        bestFromIndex = entry.getKey();
                        bestFromToken = fromToken;
                        bestFromValue = fromToken.getValue();

                        bestToIndex = toIndex;
                        bestToToken = toToken;
                        bestToValue = toToken.getValue();
                    }
                }
            }
        }

        if ((bestFromIndex >= 0) && (bestToIndex >= 0) && (bestFromToken != null) && (bestToToken != null))
        {
            final ChessPosition fromPosition = board.getPositionFor(bestFromIndex);
            final ChessPosition toPosition = board.getPositionFor(bestToIndex);

            answer = new DefaultChessAction(board, this, fromPosition, toPosition);
        }

        // No move found, so delegate.
        if (answer == null)
        {
            answer = (ChessAction)delegate.getAction(environment, adjudicator);
        }

        return answer;
    }

    @Override
    public String getDescription()
    {
        return "A capture agent.";
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    @Override
    public Team getTeam()
    {
        return delegate.getTeam();
    }

    @Override
    public void postProcessGame(final Agent winner)
    {
        // Nothing to do.
    }
}

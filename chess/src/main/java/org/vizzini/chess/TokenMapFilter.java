package org.vizzini.chess;

import java.util.Map;
import java.util.TreeMap;

/**
 * Provides a filter for a token map.
 */
public final class TokenMapFilter
{
    /**
     * @param board Board.
     * @param whoseMove Whose move.
     * 
     * @return a new map of index to chess token which satisfies the filter.
     */
    public Map<Integer, ChessToken> filterByCaptureMove(final ChessEnvironment board, final ChessTeam whoseMove)
    {
        final Map<Integer, ChessToken> answer = new TreeMap<Integer, ChessToken>();

        final int cellCount = board.getDimensions().getCellCount();

        for (int fromIndex = 0; fromIndex < cellCount; fromIndex++)
        {
            final ChessToken fromToken = board.getTokenAt(fromIndex);

            if ((fromToken != null) && (fromToken.getTeam() == whoseMove))
            {
                for (final int toIndex : fromToken.getValidMoves())
                {
                    final ChessToken toToken = board.getTokenAt(toIndex);

                    if (toToken != null)
                    {
                        // System.out.println(fromIndex + " " + fromToken + " captures " + toIndex + " " + toToken);
                        answer.put(fromIndex, fromToken);
                    }
                }
            }
        }

        return answer;
    }

    /**
     * @param board Board.
     * @param whoseMove Whose move.
     * 
     * @return a new map of index to chess token which satisfies the filter.
     */
    public Map<Integer, ChessToken> filterByOtherTeam(final ChessEnvironment board, final ChessTeam whoseMove)
    {
        final Map<Integer, ChessToken> answer = new TreeMap<Integer, ChessToken>();

        final int cellCount = board.getDimensions().getCellCount();

        for (int fromIndex = 0; fromIndex < cellCount; fromIndex++)
        {
            final ChessToken fromToken = board.getTokenAt(fromIndex);

            if ((fromToken != null) && (fromToken.getTeam() != whoseMove))
            {
                answer.put(fromIndex, fromToken);
            }
        }

        return answer;
    }
}

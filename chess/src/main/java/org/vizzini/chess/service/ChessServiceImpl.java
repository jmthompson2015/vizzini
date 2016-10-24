package org.vizzini.chess.service;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.chess.ChessAction;
import org.vizzini.chess.ChessActionGenerator;
import org.vizzini.chess.ChessAdjudicator;
import org.vizzini.chess.ChessEnvironment;
import org.vizzini.chess.ChessPosition;
import org.vizzini.chess.ChessTeam;
import org.vizzini.chess.ChessToken;
import org.vizzini.chess.DefaultChessAction;
import org.vizzini.chess.DefaultChessActionGenerator;
import org.vizzini.chess.DefaultChessAdjudicator;
import org.vizzini.chess.FENBoardFormat;
import org.vizzini.chess.SimpleAgent;
import org.vizzini.core.game.Agent;

/**
 * Provides an implementation of a chess service.
 */
public final class ChessServiceImpl implements ChessService
{
    /** FEN formatter. */
    private final FENBoardFormat formatter = new FENBoardFormat();

    /** Move generator. */
    private final ChessActionGenerator moveGenerator = new DefaultChessActionGenerator();

    /** Agent. */
    private final Agent agent = new SimpleAgent("White", ChessTeam.WHITE, moveGenerator);

    /** Chess adjudicator. */
    private final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

    @Override
    public List<ChessAction> getMoves(final String boardString)
    {
        // Inflate board.
        final ChessEnvironment board = inflateBoard(boardString);

        final List<ChessAction> answer = new ArrayList<ChessAction>();

        final int cellCount = board.getDimensions().getCellCount();

        for (int fromIndex = 0; fromIndex < cellCount; fromIndex++)
        {
            final ChessToken fromToken = board.getTokenAt(fromIndex);

            if (fromToken != null)
            {
                for (final int toIndex : fromToken.getValidMoves())
                {
                    final ChessPosition fromPosition = board.getPositionFor(fromIndex);
                    final ChessPosition toPosition = board.getPositionFor(toIndex);

                    final ChessAction move = new DefaultChessAction(board, agent, fromPosition, toPosition);

                    answer.add(move);
                }
            }
        }

        if (answer.isEmpty())
        {
            throw new NoValidMoveException();
        }

        return answer;
    }

    @Override
    public String makeMove(final String boardString) throws UnparseableBoardException, NoValidMoveException
    {
        // Inflate board.
        final ChessEnvironment board = inflateBoard(boardString);

        // Get move.
        final ChessAction move = (ChessAction)agent.getAction(board, adjudicator);

        if (move == null)
        {
            throw new NoValidMoveException();
        }

        // System.out.println("move = " + move.getFromPosition() + " to " + move.getToPosition());

        // board.moveToken(move.getFromIndex(), move.getToIndex());
        move.doIt();

        final String answer = formatter.format(board);

        return answer;
    }

    /**
     * @param boardString String representation of a board.
     * 
     * @return a new chess board configured from the given parameter.
     */
    private ChessEnvironment inflateBoard(final String boardString)
    {
        // Create board.
        ChessEnvironment board = null;

        try
        {
            board = formatter.parse(boardString);
        }
        catch (final IllegalArgumentException e)
        {
            throw new UnparseableBoardException("Board string cannot be parsed [" + boardString + "]");
        }

        // System.out.println("board.getWhoseMove() = " + board.getWhoseMove());

        // Determine valid moves.
        moveGenerator.generateValidMoves(board);

        return board;
    }
}

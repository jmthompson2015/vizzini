package org.vizzini.chess.service;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.Test;
import org.vizzini.chess.ChessAction;
import org.vizzini.chess.ChessEnvironment;
import org.vizzini.chess.ChessPosition;
import org.vizzini.chess.ChessTeam;
import org.vizzini.chess.ChessToken;
import org.vizzini.chess.DefaultChessAction;
import org.vizzini.chess.FENBoardFormat;
import org.vizzini.chess.GameType;
import org.vizzini.chess.TokenType;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>ChessServiceImpl</code> class.
 */
public final class ChessServiceImplTest
{
    /** FEN formatter. */
    private final FENBoardFormat formatter = new FENBoardFormat();

    /** Output formatter. */
    // private final DefaultChessBoardFormat outputFormatter = new DefaultChessBoardFormat();

    /**
     * Test the <code>getMoves()</code> method.
     */
    @Test
    public void getMoves()
    {
        final ChessService service = new ChessServiceImpl();

        String boardString = GameType.RAUMSCHACH.getStartPosition();
        // System.out.println("0 boardString = " + boardString);
        final ChessEnvironment board = formatter.parse(boardString);

        // White move.
        {
            assertThat(board.getFiftyMoveCount(), is(0));
            assertThat(board.getMoveCount(), is(1));
            assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));

            final List<ChessAction> result = service.getMoves(boardString);

            assertNotNull(result);
            assertThat(result.size(), is(61));

            final ChessAction move = result.get(0);
            assertThat(move.getFromPosition().getIndex(), is(1));
            assertThat(move.getToPosition().getIndex(), is(12));
            final ChessToken fromToken = (ChessToken)board.getTokenAt(move.getFromPosition());
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
            assertThat(fromToken.getType(), is(TokenType.KNIGHT));

            moveToken(board, move.getFromPosition(), move.getToPosition());

            assertNull(board.getTokenAt(move.getFromPosition()));
        }

        boardString = formatter.format(board);
        // System.out.println("1 boardString = " + boardString);

        // Black move.
        {
            assertThat(board.getFiftyMoveCount(), is(1));
            assertThat(board.getMoveCount(), is(1));
            assertThat(board.getWhoseMove(), is(ChessTeam.BLACK));

            final List<ChessAction> result = service.getMoves(boardString);

            assertNotNull(result);
            assertThat(result.size(), is(61));

            final ChessAction move = result.get(0);
            assertThat(move.getFromPosition().getIndex(), is(90));
            assertThat(move.getToPosition().getIndex(), is(85));
            final ChessToken fromToken = (ChessToken)board.getTokenAt(move.getFromPosition());
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.BLACK));
            assertThat(fromToken.getType(), is(TokenType.PAWN));

            moveToken(board, move.getFromPosition(), move.getToPosition());

            assertNull(board.getTokenAt(move.getFromPosition()));
        }
    }

    /**
     * Test the <code>getMoves()</code> method.
     */
    @Test
    public void getMovesNull()
    {
        final ChessService service = new ChessServiceImpl();

        String boardString = null;

        try
        {
            service.getMoves(boardString);
            fail("Should have thrown an exception");
        }
        catch (final UnparseableBoardException e)
        {
            assertThat(e.getMessage(), is("Board string cannot be parsed [null]"));
        }

        boardString = "";

        try
        {
            service.getMoves(boardString);
            fail("Should have thrown an exception");
        }
        catch (final UnparseableBoardException e)
        {
            assertThat(e.getMessage(), is("Board string cannot be parsed []"));
        }

        boardString = "bogus";

        try
        {
            service.getMoves(boardString);
            fail("Should have thrown an exception");
        }
        catch (final UnparseableBoardException e)
        {
            assertThat(e.getMessage(), is("Board string cannot be parsed [bogus]"));
        }
    }

    /**
     * Test the <code>makeMove()</code> method.
     */
    @Test
    public void makeMove()
    {
        final ChessService service = new ChessServiceImpl();

        String boardString = GameType.RAUMSCHACH.getStartPosition();
        // System.out.println("0 boardString = " + boardString);
        final ChessEnvironment board0 = formatter.parse(boardString);
        // System.out.println("board0" + outputFormatter.format(board0));
        // System.out.println("board0.getToken(1) = " + board0.getTokenAt(1));
        final ChessEnvironment board1;

        // White move.
        {
            assertThat(board0.getFiftyMoveCount(), is(0));
            assertThat(board0.getMoveCount(), is(1));
            assertThat(board0.getWhoseMove(), is(ChessTeam.WHITE));

            final String result = service.makeMove(boardString);
            // System.out.println("1 result = " + result);

            assertNotNull(result);
            board1 = formatter.parse(result);
            // System.out.println("board1" + outputFormatter.format(board1));

            // Moved White Knight from 1 to 12.
            assertNull("board1.getToken(1) = " + board1.getTokenAt(1), board1.getTokenAt(1));
            // final ChessToken token = board1.getTokenAt(12);
            // assertNotNull(token);
            // assertThat((ChessTeam)token.getTeam(), is(ChessTeam.WHITE));
            // assertThat(token.getType(), is(TokenType.KNIGHT));

            boardString = formatter.format(board1);
        }

        // System.out.println("boardString = " + boardString);

        // Black move.
        {
            assertThat(board1.getFiftyMoveCount(), is(1));
            assertThat(board1.getMoveCount(), is(1));
            assertThat(board1.getWhoseMove(), is(ChessTeam.BLACK));

            final String result = service.makeMove(boardString);

            assertNotNull(result);
            // assertThat(result.getFromIndex(), is(90));
            // assertThat(result.getToIndex(), is(85));
            // final ChessToken fromToken = board.getTokenAt(result.getFromIndex());
            // assertThat(fromToken.getTeam(), is(Team.BLACK));
            // assertThat(fromToken.getType(), is(TokenType.PAWN));
            //
            // System.out.println("before\n" + outputFormatter.format(board));
            // board.moveToken(result.getFromIndex(), result.getToIndex());
            // System.out.println("after\n" + outputFormatter.format(board));
            //
            // assertNull(board.getTokenAt(result.getFromIndex()));
        }
    }

    /**
     * @param board Board.
     * @param fromPosition From position.
     * @param toPosition To position.
     */
    private void moveToken(final ChessEnvironment board, final ChessPosition fromPosition,
            final ChessPosition toPosition)
    {
        final Agent agent = board.getTokenAt(fromPosition).getAgent();

        final ChessAction move = new DefaultChessAction(board, agent, fromPosition, toPosition);
        move.doIt();
    }
}

package org.vizzini.chess;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.vizzini.chess.raumschach.RaumschachEnvironment;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>DefaultChessEnvironment</code> class.
 */
public final class DefaultChessEnvironmentTest
{
    /** Flag indicating whether to produce verbose output. */
    private static final boolean IS_VERBOSE = false;

    /** FEN formatter. */
    private final FENBoardFormat fenFormatter = new FENBoardFormat();

    /** Output formatter. */
    private final DefaultChessBoardFormat outputFormatter = new DefaultChessBoardFormat();

    /**
     * Test the <code>copy()</code> method.
     */
    @Test
    public void copy()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final RaumschachEnvironment board = (RaumschachEnvironment)formatter.parse(GameType.RAUMSCHACH
                .getStartPosition());

        final RaumschachEnvironment result = (RaumschachEnvironment)board.copy();

        assertNotNull(result);
        assertThat(result, is(board));
        // assertThat(result.getTokens(), is(board.getTokens()));
        // assertFalse(result.getTokens() == board.getTokens());

        final ChessToken token00 = board.getTokenAt(0);
        final ChessToken token10 = result.getTokenAt(0);
        assertThat(token00, is(token10));
        assertFalse(token00 == token10);

        assertThat(result.getGameType(), is(board.getGameType()));
        assertThat(result.getDimensions(), is(board.getDimensions()));
    }

    /**
     * Test the <code>isInCheck()</code> method.
     */
    @Test
    public void isInCheckWhite()
    {
        final String boardString = "rnknr/ppppp/5/5/5|bu1bu/ppqpp/5/5/5|5/5/5/5/5|5/5/5/PP1PP/BUQBU|5/5/5/PPPPP/RNKNR w 0 1";
        final ChessEnvironment board = fenFormatter.parse(boardString);
        printBoard(board);
        final ChessActionGenerator moveGenerator = new DefaultChessActionGenerator();
        moveGenerator.generateMoves(board);

        assertTrue(board.isInCheck(ChessTeam.WHITE));
        assertFalse(board.isInCheck(ChessTeam.BLACK));

        printKingAttackers(board);
    }

    /**
     * Test the <code>isWhiteCheck()</code> method.
     */
    // @Test
    // public void isWhiteCheck()
    // {
    // final String boardString =
    // "rnknr/ppppp/5/5/5|bu1bu/ppqpp/5/5/5|5/5/5/5/5|5/5/5/PP1PP/BUQBU|5/5/5/PPPPP/RNKNR w 0 1";
    // final ChessBoard board = fenFormatter.parse(boardString);
    // printBoard(board);
    // final MoveGenerator moveGenerator = new DefaultMoveGenerator();
    // moveGenerator.generateMoves(board);
    //
    // // Blocked by white pawn.
    // assertTrue(board.isWhiteCheck());
    // assertFalse(board.isBlackCheck());
    //
    // printKingAttackers(board);
    // }

    /**
     * Test the <code>isWhiteCheck()</code> method.
     */
    // @Test
    // public void isWhiteCheckBlocked()
    // {
    // final String boardString =
    // "rnknr/ppppp/5/5/5|bu1bu/ppqpp/5/5/5|5/5/5/5/5|5/5/5/PPPPP/BUQBU|5/5/5/PPPPP/RNKNR w 0 1";
    // final ChessBoard board = fenFormatter.parse(boardString);
    // printBoard(board);
    // final MoveGenerator moveGenerator = new DefaultMoveGenerator();
    // moveGenerator.generateMoves(board);
    //
    // // Blocked by white pawn.
    // assertFalse(board.isWhiteCheck());
    // assertFalse(board.isBlackCheck());
    //
    // printKingAttackers(board);
    // }

    /**
     * Test the <code>isInCheck()</code> method.
     */
    @Test
    public void isInCheckWhiteBlocked()
    {
        final String boardString = "rnknr/ppppp/5/5/5|bu1bu/ppqpp/5/5/5|5/5/5/5/5|5/5/5/PPPPP/BUQBU|5/5/5/PPPPP/RNKNR w 0 1";
        final ChessEnvironment board = fenFormatter.parse(boardString);
        printBoard(board);
        final ChessActionGenerator moveGenerator = new DefaultChessActionGenerator();
        moveGenerator.generateMoves(board);

        // Blocked by white pawn.
        assertFalse(board.isInCheck(ChessTeam.WHITE));
        assertFalse(board.isInCheck(ChessTeam.BLACK));

        printKingAttackers(board);
    }

    /**
     * Test the <code>moveToken()</code> method.
     */
    @Test
    public void moveToken()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(GameType.RAUMSCHACH.getStartPosition());

        assertThat((ChessTeam)board.getTokenAt(5).getTeam(), is(ChessTeam.WHITE));
        assertThat(board.getTokenAt(5).getType(), is(TokenType.PAWN));
        assertThat((ChessTeam)board.getTokenAt(115).getTeam(), is(ChessTeam.BLACK));
        assertThat(board.getTokenAt(115).getType(), is(TokenType.PAWN));

        moveToken(board, 5, 10);
        assertNull(board.getTokenAt(5));
        assertThat((ChessTeam)board.getTokenAt(10).getTeam(), is(ChessTeam.WHITE));
        assertThat(board.getTokenAt(10).getType(), is(TokenType.PAWN));
        assertThat(board.getWhoseMove(), is(ChessTeam.BLACK));

        printBoard("before", board);
        moveToken(board, 115, 110);
        printBoard("after", board);
        assertNull(board.getTokenAt(115));
        assertThat((ChessTeam)board.getTokenAt(110).getTeam(), is(ChessTeam.BLACK));
        assertThat(board.getTokenAt(110).getType(), is(TokenType.PAWN));
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));
    }

    /**
     * Test the <code>moveToken()</code> method.
     */
    @Test
    public void moveTokenBlackPawnPromotion5()
    {
        final String boardString = "rnknr/ppppp/5/5/5|buqbu/ppppp/5/5/5|5/5/5/5/5|5/5/5/PPPPP/BUQBU|5/5/5/pPPPP/1NKNR b 0 1";
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(boardString);

        final int fromIndex = 5;
        final int toIndex = fromIndex - 5;

        assertThat((ChessTeam)board.getTokenAt(fromIndex).getTeam(), is(ChessTeam.BLACK));
        assertThat(board.getTokenAt(fromIndex).getType(), is(TokenType.PAWN));
        assertNull(board.getTokenAt(toIndex));

        printBoard("before", board);
        moveToken(board, fromIndex, toIndex);
        printBoard("after", board);
        assertNull(board.getTokenAt(fromIndex));
        assertThat((ChessTeam)board.getTokenAt(toIndex).getTeam(), is(ChessTeam.BLACK));
        assertThat(board.getTokenAt(toIndex).getType(), is(TokenType.QUEEN));
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));
    }

    /**
     * Test the <code>moveToken()</code> method.
     */
    @Test
    public void moveTokenBlackPawnPromotion9()
    {
        final String boardString = "rnknr/ppppp/5/5/5|buqbu/ppppp/5/5/5|5/5/5/5/5|5/5/5/PPPPP/BUQBU|5/5/5/PPPPp/RNKN1 b 0 1";
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(boardString);

        final int fromIndex = 9;
        final int toIndex = fromIndex - 5;

        assertThat((ChessTeam)board.getTokenAt(fromIndex).getTeam(), is(ChessTeam.BLACK));
        assertThat(board.getTokenAt(fromIndex).getType(), is(TokenType.PAWN));
        assertNull(board.getTokenAt(toIndex));

        printBoard("before", board);
        moveToken(board, fromIndex, toIndex);
        printBoard("after", board);
        assertNull(board.getTokenAt(fromIndex));
        assertThat((ChessTeam)board.getTokenAt(toIndex).getTeam(), is(ChessTeam.BLACK));
        assertThat(board.getTokenAt(toIndex).getType(), is(TokenType.QUEEN));
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));
    }

    /**
     * Test the <code>moveToken()</code> method.
     */
    @Test
    public void moveTokenWhiteKnight()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(GameType.RAUMSCHACH.getStartPosition());

        assertThat((ChessTeam)board.getTokenAt(1).getTeam(), is(ChessTeam.WHITE));
        assertThat(board.getTokenAt(1).getType(), is(TokenType.KNIGHT));
        assertNull(board.getTokenAt(12));
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));

        moveToken(board, 1, 12);

        assertNull(board.getTokenAt(1));
        assertThat((ChessTeam)board.getTokenAt(12).getTeam(), is(ChessTeam.WHITE));
        assertThat(board.getTokenAt(12).getType(), is(TokenType.KNIGHT));
        assertThat(board.getWhoseMove(), is(ChessTeam.BLACK));
    }

    /**
     * Test the <code>moveToken()</code> method.
     */
    @Test
    public void moveTokenWhitePawnPromotion115()
    {
        final String boardString = "1nknr/Ppppp/5/5/5|buqbu/ppppp/5/5/5|5/5/5/5/5|5/5/5/1PPPP/BUQBU|5/5/5/PPPPP/RNKNR w 0 1";
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(boardString);

        final int fromIndex = 115;
        final int toIndex = fromIndex + 5;

        assertThat((ChessTeam)board.getTokenAt(fromIndex).getTeam(), is(ChessTeam.WHITE));
        assertThat(board.getTokenAt(fromIndex).getType(), is(TokenType.PAWN));
        assertNull(board.getTokenAt(toIndex));

        printBoard("before", board);
        moveToken(board, fromIndex, toIndex);
        printBoard("after", board);
        assertNull(board.getTokenAt(fromIndex));
        assertThat((ChessTeam)board.getTokenAt(toIndex).getTeam(), is(ChessTeam.WHITE));
        assertThat(board.getTokenAt(toIndex).getType(), is(TokenType.QUEEN));
        assertThat(board.getWhoseMove(), is(ChessTeam.BLACK));
    }

    /**
     * Test the <code>moveToken()</code> method.
     */
    @Test
    public void moveTokenWhitePawnPromotion119()
    {
        final String boardString = "rnkn1/ppppP/5/5/5|buqbu/ppppp/5/5/5|5/5/5/5/5|5/5/5/PPPP1/BUQBU|5/5/5/PPPPP/RNKNR w 0 1";
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(boardString);

        final int fromIndex = 119;
        final int toIndex = fromIndex + 5;

        assertThat((ChessTeam)board.getTokenAt(fromIndex).getTeam(), is(ChessTeam.WHITE));
        assertThat(board.getTokenAt(fromIndex).getType(), is(TokenType.PAWN));
        assertNull(board.getTokenAt(toIndex));

        printBoard("before", board);
        moveToken(board, fromIndex, toIndex);
        printBoard("after", board);
        assertNull(board.getTokenAt(fromIndex));
        assertThat((ChessTeam)board.getTokenAt(toIndex).getTeam(), is(ChessTeam.WHITE));
        assertThat(board.getTokenAt(toIndex).getType(), is(TokenType.QUEEN));
        assertThat(board.getWhoseMove(), is(ChessTeam.BLACK));
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final DefaultChessEnvironment board0 = new DefaultChessEnvironment(GameType.ARTEMIS);
        final DefaultChessEnvironment board1 = new DefaultChessEnvironment(GameType.RAUMSCHACH);
        final DefaultChessEnvironment board2 = new DefaultChessEnvironment(GameType.ARTEMIS);

        assertTrue(board0.equals(board0));
        assertFalse(board0.equals(board1));
        assertTrue(board0.equals(board2));
        assertFalse(board0.equals(null));
    }

    /**
     * Test the constructor method.
     */
    // @Deprecated
    // @Test
    // public void testCopyConstructor()
    // {
    // final FENBoardFormat formatter = new FENBoardFormat();
    // final DefaultChessBoard board = (DefaultChessBoard)formatter.parse(GameType.RAUMSCHACH.getStartPosition());
    // final DefaultChessBoard result = new DefaultChessBoard(board);
    //
    // assertNotNull(result);
    // assertThat(result, is(board));
    // assertThat(result.getTokens(), is(board.getTokens()));
    // assertFalse(result.getTokens() == board.getTokens());
    //
    // final ChessToken token00 = board.getTokenAt(0);
    // final ChessToken token10 = result.getToken(0);
    // assertThat(token00, is(token10));
    // assertFalse(token00 == token10);
    // }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final DefaultChessEnvironment board0 = new DefaultChessEnvironment(GameType.ARTEMIS);
        final DefaultChessEnvironment board1 = new DefaultChessEnvironment(GameType.RAUMSCHACH);
        final DefaultChessEnvironment board2 = new DefaultChessEnvironment(GameType.ARTEMIS);

        assertThat(board0.hashCode(), is(board0.hashCode()));
        assertThat(board0.hashCode(), not(board1.hashCode()));
        assertThat(board0.hashCode(), is(board2.hashCode()));
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

    /**
     * @param board Board.
     * @param fromIndex From index.
     * @param toIndex To index.
     */
    private void moveToken(final ChessEnvironment board, final int fromIndex, final int toIndex)
    {
        final ChessPosition fromPosition = board.getPositionFor(fromIndex);
        final ChessPosition toPosition = board.getPositionFor(toIndex);

        moveToken(board, fromPosition, toPosition);
    }

    /**
     * @param board Chess board.
     */
    private void printBoard(final ChessEnvironment board)
    {
        printBoard("", board);
    }

    /**
     * @param title Title.
     * @param board Chess board.
     */
    private void printBoard(final String title, final ChessEnvironment board)
    {
        if (IS_VERBOSE)
        {
            if (StringUtils.isNotEmpty(title))
            {
                System.out.println(title);
            }

            System.out.println(outputFormatter.format(board));
        }
    }

    /**
     * @param board Chess board.
     */
    private void printKingAttackers(final ChessEnvironment board)
    {
        if (IS_VERBOSE)
        {

            System.out.println("King attackers:");
            final TokenMapFilter filter = new TokenMapFilter();
            final Map<Integer, ChessToken> blackAttackers = filter.filterByCaptureMove(board, ChessTeam.BLACK);
            for (final Entry<Integer, ChessToken> entry : blackAttackers.entrySet())
            {
                final ChessToken fromToken = entry.getValue();

                if (fromToken.getValidMoves().contains(board.getWhiteKingPosition().getIndex()))
                {
                    System.out.println(entry);
                }
            }

        }
    }
}

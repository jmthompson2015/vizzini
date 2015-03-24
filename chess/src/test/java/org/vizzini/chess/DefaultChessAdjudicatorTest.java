package org.vizzini.chess;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.chess.raumschach.RaumschachEnvironment;
import org.vizzini.chess.raumschach.RaumschachPosition;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>DefaultChessAdjudicator</code> class.
 */
public final class DefaultChessAdjudicatorTest
{
    /** FEN formatter. */
    private final FENBoardFormat fenFormatter = new FENBoardFormat();

    /** Chess action generator. */
    private final ChessActionGenerator actionGenerator = new DefaultChessActionGenerator();

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinner()
    {
        // Setup.
        final ChessEnvironment board = fenFormatter.parse(GameType.TRIDIMENSIONAL.getStartPosition());
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        // Run / Verify.
        assertNull(adjudicator.determineWinner(board));
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerNull()
    {
        // Setup.
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        // Run / Verify.
        assertNull(adjudicator.determineWinner(null));
    }

    /**
     * Test the <code>getDescription()</code> method.
     */
    @Test
    public void getDescription()
    {
        // Setup.
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        // Run / Verify.
        assertThat(adjudicator.getDescription(), is("A chess adjudicator"));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        // Setup.
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        // Run / Verify.
        assertThat(adjudicator.getName(), is("Chess Adjudicator"));
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegal()
    {
        // Setup.
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();
        final Agent agent = new SimpleAgent("White", ChessTeam.WHITE, actionGenerator);

        // Run / Verify.
        {
            final RaumschachPosition fromPosition = RaumschachPosition.a2A;
            final ChessToken fromToken = (ChessToken)board.getTokenAt(fromPosition);
            assertThat(fromToken, is(DefaultChessToken.WHITE_PAWN));
            final RaumschachPosition toPosition = RaumschachPosition.a2B;
            final ChessToken toToken = (ChessToken)board.getTokenAt(toPosition);
            assertThat(toToken, is(DefaultChessToken.WHITE_PAWN));
            final Action action = new DefaultChessAction(board, agent, fromPosition, toPosition);
            assertFalse(adjudicator.isActionLegal(action));
        }
        {
            final RaumschachPosition fromPosition = RaumschachPosition.a2B;
            final ChessToken fromToken = (ChessToken)board.getTokenAt(fromPosition);
            assertThat(fromToken, is(DefaultChessToken.WHITE_PAWN));
            final RaumschachPosition toPosition = RaumschachPosition.a3B;
            final ChessToken toToken = (ChessToken)board.getTokenAt(toPosition);
            assertNull(toToken);
            final Action action = new DefaultChessAction(board, agent, fromPosition, toPosition);
            assertTrue(adjudicator.isActionLegal(action));
        }
        {
            final RaumschachPosition fromPosition = RaumschachPosition.a2B;
            final ChessToken fromToken = (ChessToken)board.getTokenAt(fromPosition);
            assertThat(fromToken, is(DefaultChessToken.WHITE_PAWN));
            final RaumschachPosition toPosition = RaumschachPosition.a2C;
            final ChessToken toToken = (ChessToken)board.getTokenAt(toPosition);
            assertNull(toToken);
            final Action action = new DefaultChessAction(board, agent, fromPosition, toPosition);
            assertTrue(adjudicator.isActionLegal(action));
        }
        {
            final RaumschachPosition fromPosition = RaumschachPosition.a1B;
            final ChessToken fromToken = (ChessToken)board.getTokenAt(fromPosition);
            assertThat(fromToken, is(DefaultChessToken.WHITE_BISHOP));
            final RaumschachPosition toPosition = RaumschachPosition.a2C;
            final ChessToken toToken = (ChessToken)board.getTokenAt(toPosition);
            assertNull(toToken);
            final Action action = new DefaultChessAction(board, agent, fromPosition, toPosition);
            assertTrue(adjudicator.isActionLegal(action));
        }
        {
            final RaumschachPosition fromPosition = RaumschachPosition.a1A;
            final ChessToken fromToken = (ChessToken)board.getTokenAt(fromPosition);
            assertThat(fromToken, is(DefaultChessToken.WHITE_ROOK));
            final RaumschachPosition toPosition = RaumschachPosition.a3A;
            final ChessToken toToken = (ChessToken)board.getTokenAt(toPosition);
            assertNull(toToken);
            final Action action = new DefaultChessAction(board, agent, fromPosition, toPosition);
            assertFalse(adjudicator.isActionLegal(action));
        }
        {
            final RaumschachPosition fromPosition = RaumschachPosition.a1A;
            final ChessToken fromToken = (ChessToken)board.getTokenAt(fromPosition);
            assertThat(fromToken, is(DefaultChessToken.WHITE_ROOK));
            final RaumschachPosition toPosition = RaumschachPosition.a1C;
            final ChessToken toToken = (ChessToken)board.getTokenAt(toPosition);
            assertNull(toToken);
            final Action action = new DefaultChessAction(board, agent, fromPosition, toPosition);
            assertFalse(adjudicator.isActionLegal(action));
        }
    }

    /**
     * Test the <code>isChessActionLegalFor()</code> method.
     */
    @Test
    public void isChessActionLegalForBishop()
    {
        // Setup.
        final ChessEnvironment board = new RaumschachEnvironment();
        final RaumschachPosition fromPosition = RaumschachPosition.c3C;
        final Agent agent = new SimpleAgent("White", ChessTeam.WHITE, actionGenerator);
        board.placeToken(fromPosition, DefaultChessToken.WHITE_BISHOP.withAgent(agent));
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        // Run / Verify.
        verifyChessActionsBishop(adjudicator, board);
    }

    /**
     * Test the <code>isChessActionLegalFor()</code> method.
     */
    @Test
    public void isChessActionLegalForBlackPawn()
    {
        // Setup.
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();
        final RaumschachPosition fromPosition = RaumschachPosition.a4D;
        assertThat((ChessToken)board.getTokenAt(fromPosition), is(DefaultChessToken.BLACK_PAWN));

        // Run / Verify.
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.BLACK, fromPosition, RaumschachPosition.a3D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.BLACK, fromPosition, RaumschachPosition.a4C));
        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.BLACK, fromPosition, RaumschachPosition.a2D));
        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.BLACK, fromPosition, RaumschachPosition.a4B));
    }

    /**
     * Test the <code>isChessActionLegalFor()</code> method.
     */
    @Test
    public void isChessActionLegalForKing()
    {
        // Setup.
        final ChessEnvironment board = new RaumschachEnvironment();
        final RaumschachPosition fromPosition = RaumschachPosition.c3C;
        final Agent agent = new SimpleAgent("White", ChessTeam.WHITE, actionGenerator);
        board.placeToken(fromPosition, DefaultChessToken.WHITE_KING.withAgent(agent));
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        // Run / Verify.
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b2B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b3B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b4B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c2B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c3B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c4B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d2B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d3B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d4B));

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b2C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b3C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b4C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c2C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c4C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d2C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d3C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d4C));

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b2D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b3D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b4D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c2D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c3D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c4D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d2D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d3D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d4D));
    }

    /**
     * Test the <code>isChessActionLegalFor()</code> method.
     */
    @Test
    public void isChessActionLegalForKnight()
    {
        // Setup.
        final ChessEnvironment board = new RaumschachEnvironment();
        final RaumschachPosition fromPosition = RaumschachPosition.c3C;
        final Agent agent = new SimpleAgent("White", ChessTeam.WHITE, actionGenerator);
        board.placeToken(fromPosition, DefaultChessToken.WHITE_KNIGHT.withAgent(agent));
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        // Run / Verify.
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b3A));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d3A));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c2A));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c4A));

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a3B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.e3B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c1B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c5B));

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a2C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a4C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b1C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b5C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d1C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d5C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.e2C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.e4C));

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a3D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.e3D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c1D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c5D));

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b3E));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d3E));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c2E));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c4E));
    }

    /**
     * Test the <code>isChessActionLegalFor()</code> method.
     */
    @Test
    public void isChessActionLegalForQueen()
    {
        // Setup.
        final ChessEnvironment board = new RaumschachEnvironment();
        final RaumschachPosition fromPosition = RaumschachPosition.c3C;
        final Agent agent = new SimpleAgent("White", ChessTeam.WHITE, actionGenerator);
        board.placeToken(fromPosition, DefaultChessToken.WHITE_QUEEN.withAgent(agent));
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        // Run / Verify.
        verifyChessActionsBishop(adjudicator, board);
        verifyChessActionsRook(adjudicator, board);
    }

    /**
     * Test the <code>isChessActionLegalFor()</code> method.
     */
    @Test
    public void isChessActionLegalForRook()
    {
        // Setup.
        final ChessEnvironment board = new RaumschachEnvironment();
        final RaumschachPosition fromPosition = RaumschachPosition.c3C;
        final Agent agent = new SimpleAgent("White", ChessTeam.WHITE, actionGenerator);
        board.placeToken(fromPosition, DefaultChessToken.WHITE_ROOK.withAgent(agent));
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        // Run / Verify.
        verifyChessActionsRook(adjudicator, board);
    }

    /**
     * Test the <code>isChessActionLegalFor()</code> method.
     */
    @Test
    public void isChessActionLegalForUnicorn()
    {
        // Setup.
        final ChessEnvironment board = new RaumschachEnvironment();
        final RaumschachPosition fromPosition = RaumschachPosition.c3C;
        final Agent agent = new SimpleAgent("White", ChessTeam.WHITE, actionGenerator);
        board.placeToken(fromPosition, DefaultChessToken.WHITE_UNICORN.withAgent(agent));
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        // Run / Verify.
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a1A));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a5A));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.e1A));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.e5A));

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b2B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b4B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d2B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d4B));

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b2D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b4D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d2D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d4D));

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a1E));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a5E));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.e1E));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.e5E));
    }

    /**
     * Test the <code>isChessActionLegalFor()</code> method.
     */
    @Test
    public void isChessActionLegalForUnicornBlocks()
    {
        // Setup.
        final ChessEnvironment board = new RaumschachEnvironment();
        final RaumschachPosition fromPosition = RaumschachPosition.c3C;
        final Agent agent = new SimpleAgent("White", ChessTeam.WHITE, actionGenerator);
        board.placeToken(fromPosition, DefaultChessToken.WHITE_UNICORN.withAgent(agent));
        board.placeToken(RaumschachPosition.a1A, DefaultChessToken.WHITE_PAWN.withAgent(agent));
        board.placeToken(RaumschachPosition.a5A, DefaultChessToken.WHITE_PAWN.withAgent(agent));
        board.placeToken(RaumschachPosition.e1A, DefaultChessToken.WHITE_PAWN.withAgent(agent));
        board.placeToken(RaumschachPosition.e5A, DefaultChessToken.WHITE_PAWN.withAgent(agent));
        board.placeToken(RaumschachPosition.b2D, DefaultChessToken.WHITE_PAWN.withAgent(agent));
        board.placeToken(RaumschachPosition.b4D, DefaultChessToken.WHITE_PAWN.withAgent(agent));
        board.placeToken(RaumschachPosition.d2D, DefaultChessToken.WHITE_PAWN.withAgent(agent));
        board.placeToken(RaumschachPosition.d4D, DefaultChessToken.WHITE_PAWN.withAgent(agent));
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        // Run / Verify.
        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a1A));
        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a5A));
        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.e1A));
        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.e5A));

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b2B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b4B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d2B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d4B));

        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b2D));
        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b4D));
        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d2D));
        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d4D));

        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a1E));
        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a5E));
        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.e1E));
        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.e5E));
    }

    /**
     * Test the <code>isChessActionLegalFor()</code> method.
     */
    @Test
    public void isChessActionLegalForWhitePawn()
    {
        // Setup.
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();
        final RaumschachPosition fromPosition = RaumschachPosition.a2B;
        assertThat((ChessToken)board.getTokenAt(fromPosition), is(DefaultChessToken.WHITE_PAWN));

        // Run / Verify.
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a3B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a2C));
        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a4B));
        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a4D));
    }

    /**
     * Test the <code>isEmptyRun()</code> method.
     */
    @Test
    public void isEmptyRun()
    {
        // Setup.
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final DefaultChessAdjudicator adjudicator = new DefaultChessAdjudicator();
        final RaumschachPosition fromPosition = RaumschachPosition.a1B;

        // Run / Verify.
        assertTrue(adjudicator.isEmptyRun(board, fromPosition, RaumschachPosition.a2C));
        assertTrue(adjudicator.isEmptyRun(board, fromPosition, RaumschachPosition.a3D));
        assertTrue(adjudicator.isEmptyRun(board, fromPosition, RaumschachPosition.a4E));
    }

    /**
     * Test the <code>isEmptyRun()</code> method.
     */
    @Test
    public void isEmptyRunUnicornBlocked()
    {
        // Setup.
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final DefaultChessAdjudicator adjudicator = new DefaultChessAdjudicator();
        final RaumschachPosition fromPosition = RaumschachPosition.c3C;
        final Agent agent = new SimpleAgent("White", ChessTeam.WHITE, actionGenerator);
        board.placeToken(fromPosition, DefaultChessToken.WHITE_UNICORN.withAgent(agent));
        board.placeToken(RaumschachPosition.d4D, DefaultChessToken.WHITE_PAWN.withAgent(agent));

        // Run / Verify.
        assertTrue(adjudicator.isEmptyRun(board, fromPosition, RaumschachPosition.d4D));
        assertFalse(adjudicator.isEmptyRun(board, fromPosition, RaumschachPosition.e5E));
    }

    /**
     * @param adjudicator Adjudicator.
     * @param board Board.
     */
    private void verifyChessActionsBishop(final ChessAdjudicator adjudicator, final ChessEnvironment board)
    {
        final RaumschachPosition fromPosition = RaumschachPosition.c3C;

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a1C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b2C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d4C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.e5C));

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a5C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b4C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d2C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.e1C));

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c1A));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c2B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c4D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c5E));

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c5A));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c4B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c2D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c1E));

        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c3C));
    }

    /**
     * @param adjudicator Adjudicator.
     * @param board Board.
     */
    private void verifyChessActionsRook(final ChessAdjudicator adjudicator, final ChessEnvironment board)
    {
        final RaumschachPosition fromPosition = RaumschachPosition.c3C;

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.a3C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.b3C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.d3C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.e3C));

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c1C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c2C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c4C));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c5C));

        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c3A));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c3B));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c3D));
        assertTrue(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c3E));

        assertFalse(adjudicator.isActionLegalFor(board, ChessTeam.WHITE, fromPosition, RaumschachPosition.c3C));
    }
}

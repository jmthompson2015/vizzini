package org.vizzini.example.boardgame.hexchess;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;

/**
 * Provides tests for the <code>HexChessAdjudicator</code> class.
 */
public final class HexChessAdjudicatorTest
{
    /**
     * Test the <code>isActionLegalFor()</code> method.
     */
    @Test
    public void isActionLegalForBishop()
    {
        // Setup.
        final HexChessEnvironment board = new HexChessEnvironment();
        final HexChessPosition fromPosition = HexChessPosition.f6;
        final Agent agent = new DefaultAgent("White", "agent white", HexChessTeam.WHITE);
        board.placeToken(fromPosition, HexChessToken.WHITE_BISHOP.withAgent(agent));
        final HexChessAdjudicator adjudicator = new HexChessAdjudicator();

        // Run / Verify.
        verifyActionsBishop(adjudicator, board);
        invalidActionsBishop(adjudicator, board);
    }

    /**
     * Test the <code>isActionLegalFor()</code> method.
     */
    @Test
    public void isActionLegalForKing()
    {
        // Setup.
        final HexChessEnvironment board = new HexChessEnvironment();
        final HexChessPosition fromPosition = HexChessPosition.f6;
        final Agent agent = new DefaultAgent("White", "agent white", HexChessTeam.WHITE);
        board.placeToken(fromPosition, HexChessToken.WHITE_KING.withAgent(agent));
        final HexChessAdjudicator adjudicator = new HexChessAdjudicator();

        // Run / Verify.
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e5));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e6));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f7));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g6));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g5));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f5));

        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e4));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.d5));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e7));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g7));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.h5));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g4));

        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.d4));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.d7));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.h7));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.h4));
    }

    /**
     * Test the <code>isActionLegalFor()</code> method.
     */
    @Test
    public void isActionLegalForKnight()
    {
        // Setup.
        final HexChessEnvironment board = new HexChessEnvironment();
        final HexChessPosition fromPosition = HexChessPosition.f6;
        final Agent agent = new DefaultAgent("White", "agent white", HexChessTeam.WHITE);
        board.placeToken(fromPosition, HexChessToken.WHITE_KNIGHT.withAgent(agent));
        final HexChessAdjudicator adjudicator = new HexChessAdjudicator();

        // Run / Verify.
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g8));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.h7));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.i5));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.i4));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.h3));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g3));

        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e3));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.d3));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.c4));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.c5));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.d7));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e8));

        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f9));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.i6));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.i3));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f3));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.c3));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.c6));
    }

    /**
     * Test the <code>isActionLegalFor()</code> method.
     */
    @Test
    public void isActionLegalForQueen()
    {
        // Setup.
        final HexChessEnvironment board = new HexChessEnvironment();
        final HexChessPosition fromPosition = HexChessPosition.f6;
        final Agent agent = new DefaultAgent("White", "agent white", HexChessTeam.WHITE);
        board.placeToken(fromPosition, HexChessToken.WHITE_QUEEN.withAgent(agent));
        final HexChessAdjudicator adjudicator = new HexChessAdjudicator();

        // Run / Verify.
        verifyActionsBishop(adjudicator, board);
        verifyActionsRook(adjudicator, board);
        invalidActionsQueen(adjudicator, board);
    }

    /**
     * Test the <code>isActionLegalFor()</code> method.
     */
    @Test
    public void isActionLegalForRook()
    {
        // Setup.
        final HexChessEnvironment board = new HexChessEnvironment();
        final HexChessPosition fromPosition = HexChessPosition.f6;
        final Agent agent = new DefaultAgent("White", "agent white", HexChessTeam.WHITE);
        board.placeToken(fromPosition, HexChessToken.WHITE_ROOK.withAgent(agent));
        final HexChessAdjudicator adjudicator = new HexChessAdjudicator();

        // Run / Verify.
        verifyActionsRook(adjudicator, board);
        invalidActionsRook(adjudicator, board);
    }

    /**
     * @param adjudicator Adjudicator.
     * @param board Board.
     */
    private void invalidActionsBishop(final HexChessAdjudicator adjudicator, final HexChessEnvironment board)
    {
        final HexChessPosition fromPosition = HexChessPosition.f6;

        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e5));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e6));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f7));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g6));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g5));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f5));
    }

    /**
     * @param adjudicator Adjudicator.
     * @param board Board.
     */
    private void invalidActionsQueen(final HexChessAdjudicator adjudicator, final HexChessEnvironment board)
    {
        final HexChessPosition fromPosition = HexChessPosition.f6;

        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e8));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g8));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.i5));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.i4));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e3));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g3));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.c4));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.c5));
    }

    /**
     * @param adjudicator Adjudicator.
     * @param board Board.
     */
    private void invalidActionsRook(final HexChessAdjudicator adjudicator, final HexChessEnvironment board)
    {
        final HexChessPosition fromPosition = HexChessPosition.f6;

        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.d5));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e7));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g7));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.h5));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g4));
        assertFalse(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e4));
    }

    /**
     * @param adjudicator Adjudicator.
     * @param board Board.
     */
    private void verifyActionsBishop(final HexChessAdjudicator adjudicator, final HexChessEnvironment board)
    {
        final HexChessPosition fromPosition = HexChessPosition.f6;

        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.b4));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.d5));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.h5));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.k4));

        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.d8));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e7));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g4));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.h2));

        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.d2));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e4));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g7));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.h8));
    }

    /**
     * @param adjudicator Adjudicator.
     * @param board Board.
     */
    private void verifyActionsRook(final HexChessAdjudicator adjudicator, final HexChessEnvironment board)
    {
        final HexChessPosition fromPosition = HexChessPosition.f6;

        // Along x.
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.a6));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.b6));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.c6));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.d6));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e6));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g5));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.h4));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.i3));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.k2));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.l1));

        // Along y.
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.a1));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.b2));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.c3));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.d4));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.e5));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.g6));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.h6));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.i6));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.k6));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.l6));

        // Along z.
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f11));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f10));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f9));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f8));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f7));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f5));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f4));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f3));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f2));
        assertTrue(adjudicator.isActionLegalFor(board, HexChessTeam.WHITE, fromPosition, HexChessPosition.f1));
    }
}

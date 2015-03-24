package org.vizzini.chess;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.Test;
import org.vizzini.chess.raumschach.RaumschachPosition;
import org.vizzini.chess.tridimensional.TridEnvironment;
import org.vizzini.chess.tridimensional.TridPosition;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>DefaultChessActionGenerator</code> class.
 */
public final class DefaultChessActionGeneratorTest
{
    /** Flag indicating whether to produce verbose output. */
    private static final boolean IS_VERBOSE = false;

    /** FEN formatter. */
    private final FENBoardFormat fenFormatter = new FENBoardFormat();

    /** Output formatter. */
    private final DefaultChessBoardFormat outputFormatter = new DefaultChessBoardFormat();

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesBoardNull()
    {
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        try
        {
            generator.generateMoves(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("board is null"));
        }
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesIndexNull()
    {
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        try
        {
            generator.generateMoves(null, 1);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("board is null"));
        }

        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());

        try
        {
            generator.generateMoves(board, -1);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("index is out of range"));
        }

        try
        {
            generator.generateMoves(board, 125);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("index is out of range"));
        }
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesNull()
    {
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        try
        {
            generator.generateMoves(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("board is null"));
        }
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesPerformanceArtemis()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.ARTEMIS.getStartPosition());
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        final long start = System.currentTimeMillis();

        generator.generateMoves(board);

        final long end = System.currentTimeMillis();
        final long threshold = 10;
        System.out.println("Artemis    generateMoves() performance: " + (end - start) + " ms");
        assertTrue("generateMoves() exceeded performance threshold (" + threshold + "): " + (end - start),
                (end - start) < threshold);
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesPerformanceRaumschach()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        final long start = System.currentTimeMillis();

        generator.generateMoves(board);

        final long end = System.currentTimeMillis();
        final long threshold = 10;
        System.out.println("Raumschach generateMoves() performance: " + (end - start) + " ms");
        assertTrue("generateMoves() exceeded performance threshold (" + threshold + "): " + (end - start),
                (end - start) < threshold);
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesPerformanceStandard()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.STANDARD.getStartPosition());
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        final long start = System.currentTimeMillis();

        generator.generateMoves(board);

        final long end = System.currentTimeMillis();
        final long threshold = 10;
        System.out.println("Standard   generateMoves() performance: " + (end - start) + " ms");
        assertTrue("generateMoves() exceeded performance threshold (" + threshold + "): " + (end - start),
                (end - start) < threshold);
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesPerformanceTrid()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.TRIDIMENSIONAL.getStartPosition());
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        final long start = System.currentTimeMillis();

        generator.generateMoves(board);

        final long end = System.currentTimeMillis();
        final long threshold = 10;
        System.out.println("Trid       generateMoves() performance: " + (end - start) + " ms");
        assertTrue("generateMoves() exceeded performance threshold (" + threshold + "): " + (end - start),
                (end - start) < threshold);
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachBlackKnight()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final int index = 121;
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Raumschach black knight moves =", result);

        assertThat(result.size(), is(6));
        assertThat(result.get(0), is(112));
        assertThat(result.get(1), is(110));
        assertThat(result.get(2), is(86));
        assertThat(result.get(3), is(72));
        assertThat(result.get(4), is(70));
        assertThat(result.get(5), is(66));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachBlackPawnCapture()
    {
        final String boardString = "rnknr/ppppp/5/5/5|buqbu/ppppp/P1P2/5/5|5/P1P2/1P3/5/5|5/5/5/5/BUQBU|5/5/5/PPPPP/RNKNR w 0 1";
        final ChessEnvironment board = fenFormatter.parse(boardString);
        printBoard(board);
        final int index = 91;
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Raumschach black pawn moves =", result);

        assertThat(result.size(), is(7));
        assertThat(result.get(0), is(86));
        assertThat(result.get(1), is(66));
        assertThat(result.get(2), is(85));
        assertThat(result.get(3), is(87));
        assertThat(result.get(4), is(65));
        assertThat(result.get(5), is(61));
        assertThat(result.get(6), is(67));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachBlackQueenWhiteCheck()
    {
        final String boardString = "rnknr/ppppp/5/5/5|bu1bu/ppqpp/5/5/5|5/5/5/5/5|5/5/5/PP1PP/BUQBU|5/5/5/PPPPP/RNKNR w 0 1";
        final ChessEnvironment board = fenFormatter.parse(boardString);
        printBoard(board);
        final int index = 92;
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Raumschach black queen moves =", result);

        assertThat(result.size(), is(28));
        assertThat(result.get(0), is(97));
        assertThat(result.get(1), is(88));
        assertThat(result.get(2), is(84));
        assertThat(result.get(3), is(87));
        assertThat(result.get(4), is(82));
        assertThat(result.get(5), is(77));
        assertThat(result.get(6), is(86));
        assertThat(result.get(7), is(80));
        assertThat(result.get(8), is(113));
        assertThat(result.get(9), is(112));
        assertThat(result.get(10), is(111));
        assertThat(result.get(11), is(67));
        assertThat(result.get(12), is(42));
        assertThat(result.get(13), is(17));
        assertThat(result.get(22), is(2));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachBlackQueenWhiteCheckBlocked()
    {
        final String boardString = "rnknr/ppppp/5/5/5|bu1bu/ppqpp/5/5/5|5/5/5/5/5|5/5/5/PPPPP/BUQBU|5/5/5/PPPPP/RNKNR w 0 1";
        final ChessEnvironment board = fenFormatter.parse(boardString);
        printBoard(board);
        final int index = 92;
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Raumschach black queen moves =", result);

        assertThat(result.size(), is(27));
        assertThat(result.get(0), is(97));
        assertThat(result.get(1), is(88));
        assertThat(result.get(2), is(84));
        assertThat(result.get(3), is(87));
        assertThat(result.get(4), is(82));
        assertThat(result.get(5), is(77));
        assertThat(result.get(6), is(86));
        assertThat(result.get(7), is(80));
        assertThat(result.get(8), is(113));
        assertThat(result.get(9), is(112));
        assertThat(result.get(10), is(111));
        assertThat(result.get(11), is(67));
        assertThat(result.get(12), is(42));
        assertThat(result.get(13), is(17));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachBlackQueenWhiteCheckBlocked2()
    {
        final String boardString = "rnknr/ppppp/5/5/5|bu1bu/ppqpp/5/5/5|5/5/5/5/5|5/5/5/PPQPP/BU1BU|5/5/5/PPPPP/RNKNR w 0 1";
        final ChessEnvironment board = fenFormatter.parse(boardString);
        printBoard(board);
        final int index = 92;
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Raumschach black queen moves =", result);

        assertThat(result.size(), is(27));
        assertThat(result.get(0), is(97));
        assertThat(result.get(1), is(88));
        assertThat(result.get(2), is(84));
        assertThat(result.get(3), is(87));
        assertThat(result.get(4), is(82));
        assertThat(result.get(5), is(77));
        assertThat(result.get(6), is(86));
        assertThat(result.get(7), is(80));
        assertThat(result.get(8), is(113));
        assertThat(result.get(9), is(112));
        assertThat(result.get(10), is(111));
        assertThat(result.get(11), is(67));
        assertThat(result.get(12), is(42));
        assertThat(result.get(13), is(17));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachBoard()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final ChessActionGenerator generator = new DefaultChessActionGenerator();
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));

        generator.generateMoves(board);

        printBoardMoves(board);

        {
            final ChessToken fromToken = board.getTokenAt(1);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
            assertThat(fromToken.getType(), is(TokenType.KNIGHT));
            assertFalse(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(6));
            assertThat(fromToken.getValidMoves().get(0), is(12));
            assertThat(fromToken.getValidMoves().get(1), is(10));
            assertThat(fromToken.getValidMoves().get(2), is(36));
            assertThat(fromToken.getValidMoves().get(3), is(56));
            assertThat(fromToken.getValidMoves().get(4), is(52));
            assertThat(fromToken.getValidMoves().get(5), is(50));
        }

        {
            final ChessToken fromToken = board.getTokenAt(121);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.BLACK));
            assertThat(fromToken.getType(), is(TokenType.KNIGHT));
            assertFalse(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(6));
            assertThat(fromToken.getValidMoves().get(0), is(112));
            assertThat(fromToken.getValidMoves().get(1), is(110));
            assertThat(fromToken.getValidMoves().get(2), is(86));
            assertThat(fromToken.getValidMoves().get(3), is(72));
            assertThat(fromToken.getValidMoves().get(4), is(70));
            assertThat(fromToken.getValidMoves().get(5), is(66));
        }

        assertFalse(board.isInCheck(ChessTeam.WHITE));
        assertFalse(board.isInCheck(ChessTeam.BLACK));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachBoardBlackCheck()
    {
        final String boardString = "rnknr/5/5/5/5|buqbu/5/5/5/5|5/5/5/5/5|5/5/5/2Q2/BU1BU|5/5/5/5/RNKNR b 0 1";
        final ChessEnvironment board = fenFormatter.parse(boardString);
        printBoard(board);
        final ChessActionGenerator generator = new DefaultChessActionGenerator();
        assertThat(board.getWhoseMove(), is(ChessTeam.BLACK));

        generator.generateMoves(board);

        printBoardMoves(board);

        final ChessToken fromToken = board.getTokenAt(121);
        assertNotNull(fromToken);
        assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.BLACK));
        assertThat(fromToken.getType(), is(TokenType.KNIGHT));
        assertFalse(fromToken.getValidMoves().isEmpty());
        assertThat(fromToken.getValidMoves().size(), is(7));
        assertThat(fromToken.getValidMoves().get(0), is(112));
        assertThat(fromToken.getValidMoves().get(1), is(110));
        assertThat(fromToken.getValidMoves().get(2), is(118));
        assertThat(fromToken.getValidMoves().get(3), is(86));
        assertThat(fromToken.getValidMoves().get(4), is(72));
        assertThat(fromToken.getValidMoves().get(5), is(70));
        assertThat(fromToken.getValidMoves().get(6), is(66));

        assertFalse(board.isInCheck(ChessTeam.WHITE));
        assertTrue(board.isInCheck(ChessTeam.BLACK));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachBoardWhiteCheck()
    {
        final String boardString = "rnkn1/5/5/2r2/5|bu1bu/2q2/5/5/5|5/5/5/5/5|5/5/5/5/BUQBU|5/5/5/5/RNKNR w 0 1";
        final ChessEnvironment board = fenFormatter.parse(boardString);
        printBoard(board);
        final ChessActionGenerator generator = new DefaultChessActionGenerator();
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));

        generator.generateMoves(board);

        printBoardMoves(board);

        {
            final ChessToken fromToken = board.getTokenAt(1);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
            assertThat(fromToken.getType(), is(TokenType.KNIGHT));
            assertFalse(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(7));
            assertThat(fromToken.getValidMoves().get(0), is(12));
            assertThat(fromToken.getValidMoves().get(1), is(10));
            assertThat(fromToken.getValidMoves().get(2), is(8));
            assertThat(fromToken.getValidMoves().get(3), is(36));
            assertThat(fromToken.getValidMoves().get(4), is(56));
            assertThat(fromToken.getValidMoves().get(5), is(52));
            assertThat(fromToken.getValidMoves().get(6), is(50));

            assertThat(fromToken.getActionValue(), is(3));
            assertThat(fromToken.getAttackedValue(), is(0));
            assertThat(fromToken.getDefendedValue(), is(0));
            assertThat(fromToken.getValue(), is(320));
        }

        {
            final ChessToken fromToken = board.getTokenAt(2);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
            assertThat(fromToken.getType(), is(TokenType.KING));
            assertFalse(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(2));
            assertThat(fromToken.getValidMoves().get(0), is(33));
            assertThat(fromToken.getValidMoves().get(1), is(31));

            assertThat(fromToken.getActionValue(), is(1));
            assertThat(fromToken.getAttackedValue(), is(1));
            assertThat(fromToken.getDefendedValue(), is(0));
            assertThat(fromToken.getValue(), is(32767));
        }

        {
            final ChessToken fromToken = board.getTokenAt(27);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
            assertThat(fromToken.getType(), is(TokenType.QUEEN));
            assertFalse(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(25));
            assertThat(fromToken.getValidMoves().get(0), is(32));
            assertThat(fromToken.getValidMoves().get(24), is(6));

            assertThat(fromToken.getActionValue(), is(1));
            assertThat(fromToken.getAttackedValue(), is(0));
            assertThat(fromToken.getDefendedValue(), is(0));
            assertThat(fromToken.getValue(), is(975));
        }

        {
            final ChessToken fromToken = board.getTokenAt(28);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
            assertThat(fromToken.getType(), is(TokenType.BISHOP));
            assertFalse(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(12));
            assertThat(fromToken.getValidMoves().get(0), is(34));
            assertThat(fromToken.getValidMoves().get(11), is(8));

            assertThat(fromToken.getActionValue(), is(3));
            assertThat(fromToken.getAttackedValue(), is(0));
            assertThat(fromToken.getDefendedValue(), is(0));
            assertThat(fromToken.getValue(), is(325));
        }

        {
            final ChessToken fromToken = board.getTokenAt(121);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.BLACK));
            assertThat(fromToken.getType(), is(TokenType.KNIGHT));
            assertFalse(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(7));
            assertThat(fromToken.getValidMoves().get(0), is(112));
            assertThat(fromToken.getValidMoves().get(1), is(110));
            assertThat(fromToken.getValidMoves().get(2), is(118));
            assertThat(fromToken.getValidMoves().get(3), is(86));
            assertThat(fromToken.getValidMoves().get(4), is(72));
            assertThat(fromToken.getValidMoves().get(5), is(70));
            assertThat(fromToken.getValidMoves().get(6), is(66));
        }

        assertTrue(board.isInCheck(ChessTeam.WHITE));
        assertFalse(board.isInCheck(ChessTeam.BLACK));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachWhiteBishop()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final int index = 25;
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Raumschach white bishop moves =", result);

        assertThat(result.size(), is(6));
        assertThat(result.get(0), is(55));
        assertThat(result.get(1), is(85));
        assertThat(result.get(2), is(115));
        assertThat(result.get(3), is(51));
        assertThat(result.get(4), is(77));
        assertThat(result.get(5), is(103));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachWhiteKing()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final int index = 2;
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);

        // No moves from the start position.
        assertTrue(result.isEmpty());
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachWhiteKing2()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        // Move white pawns forward.
        moveToken(board, RaumschachPosition.b2A, RaumschachPosition.b3A);
        moveToken(board, RaumschachPosition.d2A, RaumschachPosition.d3A);
        moveToken(board, RaumschachPosition.c2B, RaumschachPosition.c3B);
        // Move white queen forward.
        moveToken(board, RaumschachPosition.c1B, RaumschachPosition.a3B);
        final int index = 2;
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Raumschach white king moves =", result);

        assertThat(result.size(), is(4));
        assertThat(result.get(0), is(8));
        assertThat(result.get(1), is(6));
        assertThat(result.get(2), is(27));
        assertThat(result.get(3), is(32));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachWhiteKnight()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final int index = 1;
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Raumschach white knight moves =", result);

        assertThat(result.size(), is(6));
        assertThat(result.get(0), is(12));
        assertThat(result.get(1), is(10));
        assertThat(result.get(2), is(36));
        assertThat(result.get(3), is(56));
        assertThat(result.get(4), is(52));
        assertThat(result.get(5), is(50));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachWhitePawn()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final int index = 31;
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Raumschach white pawn moves =", result);

        assertThat(result.size(), is(2));
        assertThat(result.get(0), is(36));
        assertThat(result.get(1), is(56));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachWhitePawnCapture()
    {
        final String boardString = "rnknr/ppppp/5/5/5|buqbu/5/5/5/5|5/5/1p3/p1p/5|5/5/p1p2/PPPPP/BUQBU|5/5/5/PPPPP/RNKNR w 0 1";
        final ChessEnvironment board = fenFormatter.parse(boardString);
        printBoard(board);
        final int index = 31;
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Raumschach white pawn moves =", result);

        assertThat(result.size(), is(7));
        assertThat(result.get(0), is(36));
        assertThat(result.get(1), is(56));
        assertThat(result.get(2), is(35));
        assertThat(result.get(3), is(37));
        assertThat(result.get(4), is(55));
        assertThat(result.get(5), is(61));
        assertThat(result.get(6), is(57));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachWhiteQueen()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final int index = 27;
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Raumschach white queen moves =", result);

        assertThat(result.size(), is(14));
        assertThat(result.get(0), is(52));
        assertThat(result.get(1), is(77));
        assertThat(result.get(2), is(102));
        assertThat(result.get(3), is(57));
        assertThat(result.get(4), is(87));
        assertThat(result.get(5), is(117));
        assertThat(result.get(6), is(58));
        assertThat(result.get(7), is(89));
        assertThat(result.get(8), is(53));
        assertThat(result.get(9), is(79));
        assertThat(result.get(10), is(51));
        assertThat(result.get(11), is(75));
        assertThat(result.get(12), is(56));
        assertThat(result.get(13), is(85));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachWhiteRook()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final int index = 0;
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);

        // No moves from the start position.
        assertTrue(result.isEmpty());
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesRaumschachWhiteUnicorn()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final int index = 26;
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Raumschach white unicorn moves =", result);

        assertThat(result.size(), is(4));
        assertThat(result.get(0), is(57));
        assertThat(result.get(1), is(88));
        assertThat(result.get(2), is(119));
        assertThat(result.get(3), is(55));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesStandardBoard()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.STANDARD.getStartPosition());
        final ChessActionGenerator generator = new DefaultChessActionGenerator();
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));

        generator.generateMoves(board);

        printBoardMoves(board);

        {
            final ChessToken fromToken = board.getTokenAt(1);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
            assertThat(fromToken.getType(), is(TokenType.KNIGHT));
            assertFalse(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(2));
            assertThat(fromToken.getValidMoves().get(0), is(18));
            assertThat(fromToken.getValidMoves().get(1), is(16));
        }

        {
            final ChessToken fromToken = board.getTokenAt(57);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.BLACK));
            assertThat(fromToken.getType(), is(TokenType.KNIGHT));
            assertFalse(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(2));
            assertThat(fromToken.getValidMoves().get(0), is(42));
            assertThat(fromToken.getValidMoves().get(1), is(40));
        }

        assertFalse(board.isInCheck(ChessTeam.WHITE));
        assertFalse(board.isInCheck(ChessTeam.BLACK));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesTridBoard()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.TRIDIMENSIONAL.getStartPosition());
        final ChessActionGenerator generator = new DefaultChessActionGenerator();
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));

        generator.generateMoves(board);

        printBoardMoves(board);

        {
            final ChessToken fromToken = board.getTokenAt(1);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
            assertThat(fromToken.getType(), is(TokenType.KNIGHT));
            assertTrue(fromToken.getValidMoves().isEmpty());
        }

        {
            final ChessToken fromToken = (ChessToken)board.getTokenAt(TridPosition.b6G);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.BLACK));
            assertThat(fromToken.getType(), is(TokenType.KNIGHT));
            assertTrue(fromToken.getValidMoves().isEmpty());
        }

        assertFalse(board.isInCheck(ChessTeam.WHITE));
        assertFalse(board.isInCheck(ChessTeam.BLACK));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesTridBoardWhiteBishop()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.TRIDIMENSIONAL.getStartPosition());
        final ChessActionGenerator generator = new DefaultChessActionGenerator();
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));

        generator.generateMoves(board);

        printBoardMoves(board);

        {
            final ChessToken fromToken = (ChessToken)board.getTokenAt(TridPosition.b2B);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
            assertThat(fromToken.getType(), is(TokenType.BISHOP));
            assertFalse(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(2));
            assertThat(fromToken.getValidMoves().get(0), is(127));
            assertThat(fromToken.getValidMoves().get(1), is(117));
        }

        {
            final ChessToken fromToken = (ChessToken)board.getTokenAt(TridPosition.b5F);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.BLACK));
            assertThat(fromToken.getType(), is(TokenType.BISHOP));
            assertFalse(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(2));
            assertThat(fromToken.getValidMoves().get(0), is(135));
            assertThat(fromToken.getValidMoves().get(1), is(121));
        }

        assertFalse(board.isInCheck(ChessTeam.WHITE));
        assertFalse(board.isInCheck(ChessTeam.BLACK));
    }

    /**
     * Test the <code>generateValidMoves()</code> method.
     */
    @Test
    public void generateValidMovesNull()
    {
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        try
        {
            generator.generateValidMoves(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("board is null"));
        }
    }

    /**
     * Test the <code>generateValidMoves()</code> method.
     */
    @Test
    public void generateValidMovesPerformanceArtemis()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.ARTEMIS.getStartPosition());
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        final long start = System.currentTimeMillis();

        generator.generateValidMoves(board);

        final long end = System.currentTimeMillis();
        final long threshold = 200;
        System.out.println("Artemis    generateValidMoves() performance: " + (end - start) + " ms");
        assertTrue("generateValidMoves() exceeded performance threshold (" + threshold + "): " + (end - start),
                (end - start) < threshold);
    }

    /**
     * Test the <code>generateValidMoves()</code> method.
     */
    @Test
    public void generateValidMovesPerformanceRaumschach()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        final long start = System.currentTimeMillis();

        generator.generateValidMoves(board);

        final long end = System.currentTimeMillis();
        final long threshold = 250;
        System.out.println("Raumschach generateValidMoves() performance: " + (end - start) + " ms");
        assertTrue("generateValidMoves() exceeded performance threshold (" + threshold + "): " + (end - start),
                (end - start) < threshold);
    }

    /**
     * Test the <code>generateValidMoves()</code> method.
     */
    @Test
    public void generateValidMovesPerformanceStandard()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.STANDARD.getStartPosition());
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        final long start = System.currentTimeMillis();

        generator.generateValidMoves(board);

        final long end = System.currentTimeMillis();
        final long threshold = 250;
        System.out.println("Standard   generateValidMoves() performance: " + (end - start) + " ms");
        assertTrue("generateValidMoves() exceeded performance threshold (" + threshold + "): " + (end - start),
                (end - start) < threshold);
    }

    /**
     * Test the <code>generateValidMoves()</code> method.
     */
    @Test
    public void generateValidMovesPerformanceTrid()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.TRIDIMENSIONAL.getStartPosition());
        final ChessActionGenerator generator = new DefaultChessActionGenerator();

        final long start = System.currentTimeMillis();

        assertThat(board, is(TridEnvironment.class));

        generator.generateValidMoves(board);

        final long end = System.currentTimeMillis();
        final long threshold = 250;
        System.out.println("Trid       generateValidMoves() performance: " + (end - start) + " ms");
        assertTrue("generateValidMoves() exceeded performance threshold (" + threshold + "): " + (end - start),
                (end - start) < threshold);
    }

    /**
     * Test the <code>generateValidMoves()</code> method.
     */
    @Test
    public void generateValidMovesRaumschachBoard()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final ChessActionGenerator generator = new DefaultChessActionGenerator();
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));

        generator.generateValidMoves(board);

        printBoardMoves(board);

        {
            final ChessToken fromToken = board.getTokenAt(1);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
            assertThat(fromToken.getType(), is(TokenType.KNIGHT));
            assertFalse(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(6));
            assertThat(fromToken.getValidMoves().get(0), is(12));
            assertThat(fromToken.getValidMoves().get(1), is(10));
            assertThat(fromToken.getValidMoves().get(2), is(36));
            assertThat(fromToken.getValidMoves().get(3), is(56));
            assertThat(fromToken.getValidMoves().get(4), is(52));
            assertThat(fromToken.getValidMoves().get(5), is(50));
        }

        {
            final ChessToken fromToken = board.getTokenAt(121);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.BLACK));
            assertThat(fromToken.getType(), is(TokenType.KNIGHT));
            assertTrue(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(0));
        }

        assertFalse(board.isInCheck(ChessTeam.WHITE));
        assertFalse(board.isInCheck(ChessTeam.BLACK));
    }

    /**
     * Test the <code>generateValidMoves()</code> method.
     */
    @Test
    public void generateValidMovesRaumschachBoardWhiteCheck()
    {
        final String boardString = "rnkn1/5/5/2r2/5|bu1bu/2q2/5/5/5|5/5/5/5/5|5/5/5/5/BUQBU|5/5/5/5/RNKNR w 0 1";
        final ChessEnvironment board = fenFormatter.parse(boardString);
        printBoard(board);
        final ChessActionGenerator generator = new DefaultChessActionGenerator();
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));

        generator.generateValidMoves(board);

        printBoardMoves(board);

        {
            final ChessToken fromToken = board.getTokenAt(1);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
            assertThat(fromToken.getType(), is(TokenType.KNIGHT));
            assertTrue(fromToken.getValidMoves().isEmpty());

            assertThat(fromToken.getActionValue(), is(3));
            assertThat(fromToken.getAttackedValue(), is(0));
            assertThat(fromToken.getDefendedValue(), is(0));
            assertThat(fromToken.getValue(), is(320));
        }

        {
            final ChessToken fromToken = board.getTokenAt(2);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
            assertThat(fromToken.getType(), is(TokenType.KING));
            assertFalse(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(2));
            assertThat(fromToken.getValidMoves().get(0), is(33));
            assertThat(fromToken.getValidMoves().get(1), is(31));

            assertThat(fromToken.getActionValue(), is(1));
            assertThat(fromToken.getAttackedValue(), is(1));
            assertThat(fromToken.getDefendedValue(), is(0));
            assertThat(fromToken.getValue(), is(32767));
        }

        {
            final ChessToken fromToken = board.getTokenAt(27);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
            assertThat(fromToken.getType(), is(TokenType.QUEEN));
            assertFalse(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(1));
            assertThat(fromToken.getValidMoves().get(0), is(32));

            assertThat(fromToken.getActionValue(), is(1));
            assertThat(fromToken.getAttackedValue(), is(0));
            assertThat(fromToken.getDefendedValue(), is(0));
            assertThat(fromToken.getValue(), is(975));
        }

        {
            final ChessToken fromToken = board.getTokenAt(28);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
            assertThat(fromToken.getType(), is(TokenType.BISHOP));
            assertFalse(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(1));
            assertThat(fromToken.getValidMoves().get(0), is(32));

            assertThat(fromToken.getActionValue(), is(3));
            assertThat(fromToken.getAttackedValue(), is(0));
            assertThat(fromToken.getDefendedValue(), is(0));
            assertThat(fromToken.getValue(), is(325));
        }

        {
            final ChessToken fromToken = board.getTokenAt(121);
            assertNotNull(fromToken);
            assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.BLACK));
            assertThat(fromToken.getType(), is(TokenType.KNIGHT));
            assertTrue(fromToken.getValidMoves().isEmpty());
            assertThat(fromToken.getValidMoves().size(), is(0));
        }

        assertTrue(board.isInCheck(ChessTeam.WHITE));
        assertFalse(board.isInCheck(ChessTeam.BLACK));
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
     * @param board Chess board.
     */
    private void printBoard(final ChessEnvironment board)
    {
        if (IS_VERBOSE)
        {
            System.out.println(outputFormatter.format(board));
        }
    }

    /**
     * @param board Chess board.
     */
    private void printBoardMoves(final ChessEnvironment board)
    {
        if (IS_VERBOSE)
        {
            for (int i = 0; i < board.getDimensions().getCellCount(); i++)
            {
                final ChessToken token = board.getTokenAt(i);

                if (token != null)
                {
                    final List<Integer> moves = token.getValidMoves();

                    if (!moves.isEmpty())
                    {
                        System.out.println(token.getTeam() + " " + token.getType() + ": " + moves);
                    }
                }
            }
        }
    }

    /**
     * @param title Title.
     * @param moves Moves.
     */
    private void printMoves(final String title, final List<Integer> moves)
    {
        if (IS_VERBOSE)
        {
            System.out.println(title);

            for (int i = 0; i < moves.size(); i++)
            {
                final int move = moves.get(i);
                System.out.println(i + " " + move);
            }
        }
    }
}

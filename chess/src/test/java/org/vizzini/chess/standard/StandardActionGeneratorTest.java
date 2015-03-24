package org.vizzini.chess.standard;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.List;

import org.junit.Test;
import org.vizzini.chess.ChessActionGenerator;
import org.vizzini.chess.ChessEnvironment;
import org.vizzini.chess.ChessToken;
import org.vizzini.chess.FENBoardFormat;
import org.vizzini.chess.GameType;

/**
 * Provides tests for the <code>StandardActionGenerator</code> class.
 */
public final class StandardActionGeneratorTest
{
    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesChessBlackKnight()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(GameType.STANDARD.getStartPosition());
        final int index = 57;
        final ChessActionGenerator generator = new StandardActionGenerator();

        // final List<Integer> result = generator.generateMoves(board, index);
        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Chess black knight moves =", result);

        assertThat(result.size(), is(2));
        assertThat(result.get(0), is(42));
        assertThat(result.get(1), is(40));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesChessBlackPawn()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(GameType.STANDARD.getStartPosition());
        final int index = 51;
        final ChessActionGenerator generator = new StandardActionGenerator();

        // final List<Integer> result = generator.generateMoves(board, index);
        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Chess black pawn moves =", result);

        assertThat(result.size(), is(2));
        assertThat(result.get(0), is(43));
        assertThat(result.get(1), is(35));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesChessWhiteKnight()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(GameType.STANDARD.getStartPosition());
        final int index = 1;
        final ChessActionGenerator generator = new StandardActionGenerator();

        // final List<Integer> result = generator.generateMoves(board, index);
        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Chess white knight moves =", result);

        assertThat(result.size(), is(2));
        assertThat(result.get(0), is(18));
        assertThat(result.get(1), is(16));
    }

    /**
     * Test the <code>generateMoves()</code> method.
     */
    @Test
    public void generateMovesChessWhitePawn()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(GameType.STANDARD.getStartPosition());
        final int index = 11;
        final ChessActionGenerator generator = new StandardActionGenerator();

        // final List<Integer> result = generator.generateMoves(board, index);
        generator.generateMoves(board, index);
        final ChessToken token = board.getTokenAt(index);
        final List<Integer> result = token.getValidMoves();

        assertNotNull(result);
        assertFalse(result.isEmpty());

        printMoves("Chess white pawn moves =", result);

        assertThat(result.size(), is(2));
        assertThat(result.get(0), is(19));
        assertThat(result.get(1), is(27));
    }

    /**
     * @param title Title.
     * @param moves Moves.
     */
    private void printMoves(final String title, final List<Integer> moves)
    {
        // System.out.println(title);
        //
        // for (int i = 0; i < moves.size(); i++)
        // {
        // final int move = moves.get(i);
        // System.out.println(i + " " + move);
        // }
    }
}

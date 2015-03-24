package org.vizzini.chess;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultChessBoardFormat</code> class.
 */
public final class DefaultChessBoardFormatTest
{
    /** FEN board formatter. */
    private final FENBoardFormat fenFormatter = new FENBoardFormat();

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatArtemis()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.ARTEMIS.getStartPosition());
        assertNotNull(board.getTokenAt(0));

        final DefaultChessBoardFormat formatter = new DefaultChessBoardFormat();
        final String result = formatter.format(board);

        // System.out.println("\n" + result);
        assertThat(
                result,
                is("\nLevel D\n4 r | q | k | r\n3 p | p | p | p\n2   |   |   |  \n1   |   |   |  \n\nLevel C\n4 n | b | b | n\n3 p | p | p | p\n2   |   |   |  \n1   |   |   |  \n\nLevel B\n4   |   |   |  \n3   |   |   |  \n2 P | P | P | P\n1 N | B | B | N\n\nLevel A\n4   |   |   |  \n3   |   |   |  \n2 P | P | P | P\n1 R | Q | K | R\n  a   b   c   d   "));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatRaumschach()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.RAUMSCHACH.getStartPosition());
        assertNotNull(board.getTokenAt(0));

        final DefaultChessBoardFormat formatter = new DefaultChessBoardFormat();
        final String result = formatter.format(board);

        // System.out.println("\n" + result);
        assertThat(
                result,
                is("\nLevel E\n5 r | n | k | n | r\n4 p | p | p | p | p\n3   |   |   |   |  \n2   |   |   |   |  \n1   |   |   |   |  \n\nLevel D\n5 b | u | q | b | u\n4 p | p | p | p | p\n3   |   |   |   |  \n2   |   |   |   |  \n1   |   |   |   |  \n\nLevel C\n5   |   |   |   |  \n4   |   |   |   |  \n3   |   |   |   |  \n2   |   |   |   |  \n1   |   |   |   |  \n\nLevel B\n5   |   |   |   |  \n4   |   |   |   |  \n3   |   |   |   |  \n2 P | P | P | P | P\n1 B | U | Q | B | U\n\nLevel A\n5   |   |   |   |  \n4   |   |   |   |  \n3   |   |   |   |  \n2 P | P | P | P | P\n1 R | N | K | N | R\n  a   b   c   d   e   "));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatStandard()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.STANDARD.getStartPosition());
        assertNotNull(board.getTokenAt(0));

        final DefaultChessBoardFormat formatter = new DefaultChessBoardFormat();
        final String result = formatter.format(board);

        // System.out.println("\n" + result);
        assertThat(
                result,
                is("8 r | n | b | q | k | b | n | r\n7 p | p | p | p | p | p | p | p\n6   |   |   |   |   |   |   |  \n5   |   |   |   |   |   |   |  \n4   |   |   |   |   |   |   |  \n3   |   |   |   |   |   |   |  \n2 P | P | P | P | P | P | P | P\n1 R | N | B | Q | K | B | N | R\n  a   b   c   d   e   f   g   h   "));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatTrid()
    {
        final ChessEnvironment board = fenFormatter.parse(GameType.TRIDIMENSIONAL.getStartPosition());
        assertNotNull(board.getTokenAt(0));

        final DefaultChessBoardFormat formatter = new DefaultChessBoardFormat();
        final String result = formatter.format(board);

        // System.out.println("\n" + result);
        assertThat(
                result,
                is("\nLevel G\n6 r | n |   |   | n | r\n5 p | p |   |   | p | p\n4   |   |   |   |   |  \n3   |   |   |   |   |  \n2   |   |   |   |   |  \n1   |   |   |   |   |  \n\nLevel F\n6   |   |   |   |   |  \n5   | b | q | k | b |  \n4   | p | p | p | p |  \n3   |   |   |   |   |  \n2   |   |   |   |   |  \n1   |   |   |   |   |  \n\nLevel E\n6   |   |   |   |   |  \n5   |   |   |   |   |  \n4   |   |   |   |   |  \n3   |   |   |   |   |  \n2   |   |   |   |   |  \n1   |   |   |   |   |  \n\nLevel D\n6   |   |   |   |   |  \n5   |   |   |   |   |  \n4   |   |   |   |   |  \n3   |   |   |   |   |  \n2   |   |   |   |   |  \n1   |   |   |   |   |  \n\nLevel C\n6   |   |   |   |   |  \n5   |   |   |   |   |  \n4   |   |   |   |   |  \n3   |   |   |   |   |  \n2   |   |   |   |   |  \n1   |   |   |   |   |  \n\nLevel B\n6   |   |   |   |   |  \n5   |   |   |   |   |  \n4   |   |   |   |   |  \n3   | P | P | P | P |  \n2   | B | Q | K | B |  \n1   |   |   |   |   |  \n\nLevel A\n6   |   |   |   |   |  \n5   |   |   |   |   |  \n4   |   |   |   |   |  \n3   |   |   |   |   |  \n2 P | P |   |   | P | P\n1 R | N |   |   | N | R\n  a   b   c   d   e   f   "));
    }
}

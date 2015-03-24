package org.vizzini.chess;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.Map;
import java.util.Map.Entry;

import org.junit.Test;

/**
 * Provides tests for the <code>TokenMapFilter</code> class.
 */
public final class TokenMapFilterTest
{
    /**
     * Test the <code>filterByCaptureMove()</code> method.
     */
    @Test
    public void filterByCaptureMoveRaumschach()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final ChessActionGenerator generator = new DefaultChessActionGenerator();
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));

        generator.generateMoves(board);

        final TokenMapFilter filter = new TokenMapFilter();

        final Map<Integer, ChessToken> result = filter.filterByCaptureMove(board, board.getWhoseMove());

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(5));
        printMap(result);

        assertThat(result.get(25).getType(), is(TokenType.BISHOP));
        assertTrue(result.get(25).getValidMoves().contains(115));
    }

    /**
     * Test the <code>filterByCaptureMove()</code> method.
     */
    @Test
    public void filterByCaptureMoveRaumschachWhiteCheck()
    {
        final String boardString = "rnknr/5/5/5/5|bu1bu/2q2/5/5/5|5/5/5/5/5|5/5/5/PP1PP/BUQBU|5/5/5/PPPPP/RNKNR b 0 1";
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(boardString);
        final ChessActionGenerator generator = new DefaultChessActionGenerator();
        assertThat(board.getWhoseMove(), is(ChessTeam.BLACK));

        generator.generateMoves(board);

        final TokenMapFilter filter = new TokenMapFilter();

        final Map<Integer, ChessToken> result = filter.filterByCaptureMove(board, board.getWhoseMove());

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(5));
        printMap(result);

        assertThat(result.get(92).getType(), is(TokenType.QUEEN));
        assertTrue(result.get(92).getValidMoves().contains(2));
    }

    /**
     * Test the <code>filterByOtherTeam()</code> method.
     */
    @Test
    public void filterByOtherTeamRaumschach()
    {
        final String boardString = "rnknr/pp1pp/5/5/5|buqbu/ppppp/5/5/5|5/5/5/5/5|5/5/5/PPPPP/BUQBU|5/5/5/PPPPP/RNKNR w 0 1";
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(boardString);
        final ChessActionGenerator generator = new DefaultChessActionGenerator();
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));

        generator.generateMoves(board);

        final TokenMapFilter filter = new TokenMapFilter();

        final Map<Integer, ChessToken> result = filter.filterByOtherTeam(board, board.getWhoseMove());

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(19));

        for (final Entry<Integer, ChessToken> entry : result.entrySet())
        {
            final ChessToken token = entry.getValue();
            assertThat((ChessTeam)token.getTeam(), is(ChessTeam.BLACK));
        }
    }

    /**
     * @param map Map of index to chess token.
     */
    private void printMap(final Map<Integer, ChessToken> map)
    {
        // for (final Entry<Integer, ChessToken> entry : map.entrySet())
        // {
        // System.out.println(entry.getKey() + " " + entry.getValue());
        // }
    }
}

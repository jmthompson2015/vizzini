package org.vizzini.example.boardgame.hexchess;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;

/**
 * Provides tests for the <code>HexChessToken</code> class.
 */
public final class HexChessTokenTest
{
    /**
     * Test the <code>findByTeamAndType()</code> method.
     */
    @Test
    public void findByTeamAndType()
    {
        assertThat(HexChessToken.findByTeamAndType(HexChessTeam.WHITE, TokenType.BISHOP),
                is(HexChessToken.WHITE_BISHOP));
        assertThat(HexChessToken.findByTeamAndType(HexChessTeam.WHITE, TokenType.KING), is(HexChessToken.WHITE_KING));
        assertThat(HexChessToken.findByTeamAndType(HexChessTeam.WHITE, TokenType.KNIGHT),
                is(HexChessToken.WHITE_KNIGHT));
        assertThat(HexChessToken.findByTeamAndType(HexChessTeam.WHITE, TokenType.PAWN), is(HexChessToken.WHITE_PAWN));
        assertThat(HexChessToken.findByTeamAndType(HexChessTeam.WHITE, TokenType.QUEEN), is(HexChessToken.WHITE_QUEEN));
        assertThat(HexChessToken.findByTeamAndType(HexChessTeam.WHITE, TokenType.ROOK), is(HexChessToken.WHITE_ROOK));

        assertThat(HexChessToken.findByTeamAndType(HexChessTeam.BLACK, TokenType.BISHOP),
                is(HexChessToken.BLACK_BISHOP));
        assertThat(HexChessToken.findByTeamAndType(HexChessTeam.BLACK, TokenType.KING), is(HexChessToken.BLACK_KING));
        assertThat(HexChessToken.findByTeamAndType(HexChessTeam.BLACK, TokenType.KNIGHT),
                is(HexChessToken.BLACK_KNIGHT));
        assertThat(HexChessToken.findByTeamAndType(HexChessTeam.BLACK, TokenType.PAWN), is(HexChessToken.BLACK_PAWN));
        assertThat(HexChessToken.findByTeamAndType(HexChessTeam.BLACK, TokenType.QUEEN), is(HexChessToken.BLACK_QUEEN));
        assertThat(HexChessToken.findByTeamAndType(HexChessTeam.BLACK, TokenType.ROOK), is(HexChessToken.BLACK_ROOK));
    }

    /**
     * Test the <code>getDescription()</code> method.
     */
    @Test
    public void getDescription()
    {
        assertThat(HexChessToken.WHITE_BISHOP.getDescription(), is("White Bishop"));
        assertThat(HexChessToken.WHITE_KING.getDescription(), is("White King"));
        assertThat(HexChessToken.WHITE_KNIGHT.getDescription(), is("White Knight"));
        assertThat(HexChessToken.WHITE_PAWN.getDescription(), is("White Pawn"));
        assertThat(HexChessToken.WHITE_QUEEN.getDescription(), is("White Queen"));
        assertThat(HexChessToken.WHITE_ROOK.getDescription(), is("White Rook"));

        assertThat(HexChessToken.BLACK_BISHOP.getDescription(), is("Black Bishop"));
        assertThat(HexChessToken.BLACK_KING.getDescription(), is("Black King"));
        assertThat(HexChessToken.BLACK_KNIGHT.getDescription(), is("Black Knight"));
        assertThat(HexChessToken.BLACK_PAWN.getDescription(), is("Black Pawn"));
        assertThat(HexChessToken.BLACK_QUEEN.getDescription(), is("Black Queen"));
        assertThat(HexChessToken.BLACK_ROOK.getDescription(), is("Black Rook"));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(HexChessToken.WHITE_BISHOP.getName(), is("B"));
        assertThat(HexChessToken.WHITE_KING.getName(), is("K"));
        assertThat(HexChessToken.WHITE_KNIGHT.getName(), is("N"));
        assertThat(HexChessToken.WHITE_PAWN.getName(), is("P"));
        assertThat(HexChessToken.WHITE_QUEEN.getName(), is("Q"));
        assertThat(HexChessToken.WHITE_ROOK.getName(), is("R"));

        assertThat(HexChessToken.BLACK_BISHOP.getName(), is("b"));
        assertThat(HexChessToken.BLACK_KING.getName(), is("k"));
        assertThat(HexChessToken.BLACK_KNIGHT.getName(), is("n"));
        assertThat(HexChessToken.BLACK_PAWN.getName(), is("p"));
        assertThat(HexChessToken.BLACK_QUEEN.getName(), is("q"));
        assertThat(HexChessToken.BLACK_ROOK.getName(), is("r"));
    }

    /**
     * Test the <code>getType()</code> method.
     */
    @Test
    public void getTeam()
    {
        assertThat(HexChessToken.WHITE_BISHOP.getTeam(), is(HexChessTeam.WHITE));
        assertThat(HexChessToken.WHITE_KING.getTeam(), is(HexChessTeam.WHITE));
        assertThat(HexChessToken.WHITE_KNIGHT.getTeam(), is(HexChessTeam.WHITE));
        assertThat(HexChessToken.WHITE_PAWN.getTeam(), is(HexChessTeam.WHITE));
        assertThat(HexChessToken.WHITE_QUEEN.getTeam(), is(HexChessTeam.WHITE));
        assertThat(HexChessToken.WHITE_ROOK.getTeam(), is(HexChessTeam.WHITE));

        assertThat(HexChessToken.BLACK_BISHOP.getTeam(), is(HexChessTeam.BLACK));
        assertThat(HexChessToken.BLACK_KING.getTeam(), is(HexChessTeam.BLACK));
        assertThat(HexChessToken.BLACK_KNIGHT.getTeam(), is(HexChessTeam.BLACK));
        assertThat(HexChessToken.BLACK_PAWN.getTeam(), is(HexChessTeam.BLACK));
        assertThat(HexChessToken.BLACK_QUEEN.getTeam(), is(HexChessTeam.BLACK));
        assertThat(HexChessToken.BLACK_ROOK.getTeam(), is(HexChessTeam.BLACK));
    }

    /**
     * Test the <code>getType()</code> method.
     */
    @Test
    public void getType()
    {
        assertThat(HexChessToken.WHITE_BISHOP.getType(), is(TokenType.BISHOP));
        assertThat(HexChessToken.WHITE_KING.getType(), is(TokenType.KING));
        assertThat(HexChessToken.WHITE_KNIGHT.getType(), is(TokenType.KNIGHT));
        assertThat(HexChessToken.WHITE_PAWN.getType(), is(TokenType.PAWN));
        assertThat(HexChessToken.WHITE_QUEEN.getType(), is(TokenType.QUEEN));
        assertThat(HexChessToken.WHITE_ROOK.getType(), is(TokenType.ROOK));

        assertThat(HexChessToken.BLACK_BISHOP.getType(), is(TokenType.BISHOP));
        assertThat(HexChessToken.BLACK_KING.getType(), is(TokenType.KING));
        assertThat(HexChessToken.BLACK_KNIGHT.getType(), is(TokenType.KNIGHT));
        assertThat(HexChessToken.BLACK_PAWN.getType(), is(TokenType.PAWN));
        assertThat(HexChessToken.BLACK_QUEEN.getType(), is(TokenType.QUEEN));
        assertThat(HexChessToken.BLACK_ROOK.getType(), is(TokenType.ROOK));
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        // Setup.
        final HexChessToken token0 = HexChessToken.WHITE_KING;
        final HexChessToken token1 = HexChessToken.BLACK_QUEEN;
        final HexChessToken token2 = HexChessToken.WHITE_KING;

        // Run / Verify.
        assertTrue(token0.equals(token0));
        assertFalse(token0.equals(token1));
        assertTrue(token0.equals(token2));

        assertFalse(token0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        // Setup.
        final HexChessToken token0 = HexChessToken.WHITE_KING;
        final HexChessToken token1 = HexChessToken.BLACK_QUEEN;
        final HexChessToken token2 = HexChessToken.WHITE_KING;

        // Run / Verify.
        assertThat(token0.hashCode(), is(token0.hashCode()));
        assertThat(token0.hashCode(), not(token1.hashCode()));
        assertThat(token0.hashCode(), is(token2.hashCode()));
    }

    /**
     * Test the <code>withAgent()</code> method.
     */
    @Test
    public void withAgent()
    {
        // Setup.
        final HexChessToken token = HexChessToken.WHITE_KING;
        final Agent agent = new DefaultAgent("name", "description", HexChessTeam.WHITE);

        // Run.
        final HexChessToken result = token.withAgent(agent);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(token));
        assertFalse(result == token);
        assertThat(result.getAgent(), is(agent));
        assertNull(token.getAgent());
    }
}

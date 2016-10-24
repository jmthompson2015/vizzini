package org.vizzini.chess;

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
 * Provides tests for the <code>DefaultChessToken</code> class.
 */
public final class DefaultChessTokenTest
{
    /**
     * Test the <code>copy()</code> method.
     */
    @Test
    public void copy()
    {
        // Setup.
        final Agent agent = new DefaultAgent("name", "description", ChessTeam.WHITE);
        final ChessToken token = (ChessToken)DefaultChessToken.WHITE_KING.withAgent(agent);
        final int attackedValue = 12;
        final int defendedValue = 34;
        token.addAttackedValue(attackedValue);
        token.addDefendedValue(defendedValue);

        // Run.
        final ChessToken result = token.copy();

        // Verify.
        assertNotNull(result);
        assertThat(result, is(token));
        assertFalse(result == token);
        assertThat(result.getValidMoves(), is(token.getValidMoves()));
        assertFalse(result.getValidMoves() == token.getValidMoves());
        assertThat(result.getAttackedValue(), is(attackedValue));
        assertThat(result.getDefendedValue(), is(defendedValue));
    }

    /**
     * Test the <code>findByTeamAndType()</code> method.
     */
    @Test
    public void findByTeamAndType()
    {
        assertThat(DefaultChessToken.findByTeamAndType(ChessTeam.WHITE, TokenType.BISHOP),
                is(DefaultChessToken.WHITE_BISHOP));
        assertThat(DefaultChessToken.findByTeamAndType(ChessTeam.WHITE, TokenType.KING),
                is(DefaultChessToken.WHITE_KING));
        assertThat(DefaultChessToken.findByTeamAndType(ChessTeam.WHITE, TokenType.KNIGHT),
                is(DefaultChessToken.WHITE_KNIGHT));
        assertThat(DefaultChessToken.findByTeamAndType(ChessTeam.WHITE, TokenType.PAWN),
                is(DefaultChessToken.WHITE_PAWN));
        assertThat(DefaultChessToken.findByTeamAndType(ChessTeam.WHITE, TokenType.QUEEN),
                is(DefaultChessToken.WHITE_QUEEN));
        assertThat(DefaultChessToken.findByTeamAndType(ChessTeam.WHITE, TokenType.ROOK),
                is(DefaultChessToken.WHITE_ROOK));
        assertThat(DefaultChessToken.findByTeamAndType(ChessTeam.WHITE, TokenType.UNICORN),
                is(DefaultChessToken.WHITE_UNICORN));

        assertThat(DefaultChessToken.findByTeamAndType(ChessTeam.BLACK, TokenType.BISHOP),
                is(DefaultChessToken.BLACK_BISHOP));
        assertThat(DefaultChessToken.findByTeamAndType(ChessTeam.BLACK, TokenType.KING),
                is(DefaultChessToken.BLACK_KING));
        assertThat(DefaultChessToken.findByTeamAndType(ChessTeam.BLACK, TokenType.KNIGHT),
                is(DefaultChessToken.BLACK_KNIGHT));
        assertThat(DefaultChessToken.findByTeamAndType(ChessTeam.BLACK, TokenType.PAWN),
                is(DefaultChessToken.BLACK_PAWN));
        assertThat(DefaultChessToken.findByTeamAndType(ChessTeam.BLACK, TokenType.QUEEN),
                is(DefaultChessToken.BLACK_QUEEN));
        assertThat(DefaultChessToken.findByTeamAndType(ChessTeam.BLACK, TokenType.ROOK),
                is(DefaultChessToken.BLACK_ROOK));
        assertThat(DefaultChessToken.findByTeamAndType(ChessTeam.BLACK, TokenType.UNICORN),
                is(DefaultChessToken.BLACK_UNICORN));
    }

    /**
     * Test the <code>getDescription()</code> method.
     */
    @Test
    public void getDescription()
    {
        assertThat(DefaultChessToken.WHITE_BISHOP.getDescription(), is("White Bishop"));
        assertThat(DefaultChessToken.WHITE_KING.getDescription(), is("White King"));
        assertThat(DefaultChessToken.WHITE_KNIGHT.getDescription(), is("White Knight"));
        assertThat(DefaultChessToken.WHITE_PAWN.getDescription(), is("White Pawn"));
        assertThat(DefaultChessToken.WHITE_QUEEN.getDescription(), is("White Queen"));
        assertThat(DefaultChessToken.WHITE_ROOK.getDescription(), is("White Rook"));
        assertThat(DefaultChessToken.WHITE_UNICORN.getDescription(), is("White Unicorn"));

        assertThat(DefaultChessToken.BLACK_BISHOP.getDescription(), is("Black Bishop"));
        assertThat(DefaultChessToken.BLACK_KING.getDescription(), is("Black King"));
        assertThat(DefaultChessToken.BLACK_KNIGHT.getDescription(), is("Black Knight"));
        assertThat(DefaultChessToken.BLACK_PAWN.getDescription(), is("Black Pawn"));
        assertThat(DefaultChessToken.BLACK_QUEEN.getDescription(), is("Black Queen"));
        assertThat(DefaultChessToken.BLACK_ROOK.getDescription(), is("Black Rook"));
        assertThat(DefaultChessToken.BLACK_UNICORN.getDescription(), is("Black Unicorn"));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(DefaultChessToken.WHITE_BISHOP.getName(), is("B"));
        assertThat(DefaultChessToken.WHITE_KING.getName(), is("K"));
        assertThat(DefaultChessToken.WHITE_KNIGHT.getName(), is("N"));
        assertThat(DefaultChessToken.WHITE_PAWN.getName(), is("P"));
        assertThat(DefaultChessToken.WHITE_QUEEN.getName(), is("Q"));
        assertThat(DefaultChessToken.WHITE_ROOK.getName(), is("R"));
        assertThat(DefaultChessToken.WHITE_UNICORN.getName(), is("U"));

        assertThat(DefaultChessToken.BLACK_BISHOP.getName(), is("b"));
        assertThat(DefaultChessToken.BLACK_KING.getName(), is("k"));
        assertThat(DefaultChessToken.BLACK_KNIGHT.getName(), is("n"));
        assertThat(DefaultChessToken.BLACK_PAWN.getName(), is("p"));
        assertThat(DefaultChessToken.BLACK_QUEEN.getName(), is("q"));
        assertThat(DefaultChessToken.BLACK_ROOK.getName(), is("r"));
        assertThat(DefaultChessToken.BLACK_UNICORN.getName(), is("u"));
    }

    /**
     * Test the <code>getType()</code> method.
     */
    @Test
    public void getTeam()
    {
        assertThat((ChessTeam)DefaultChessToken.WHITE_BISHOP.getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)DefaultChessToken.WHITE_KING.getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)DefaultChessToken.WHITE_KNIGHT.getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)DefaultChessToken.WHITE_PAWN.getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)DefaultChessToken.WHITE_QUEEN.getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)DefaultChessToken.WHITE_ROOK.getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)DefaultChessToken.WHITE_UNICORN.getTeam(), is(ChessTeam.WHITE));

        assertThat((ChessTeam)DefaultChessToken.BLACK_BISHOP.getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)DefaultChessToken.BLACK_KING.getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)DefaultChessToken.BLACK_KNIGHT.getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)DefaultChessToken.BLACK_PAWN.getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)DefaultChessToken.BLACK_QUEEN.getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)DefaultChessToken.BLACK_ROOK.getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)DefaultChessToken.BLACK_UNICORN.getTeam(), is(ChessTeam.BLACK));
    }

    /**
     * Test the <code>getType()</code> method.
     */
    @Test
    public void getType()
    {
        assertThat(DefaultChessToken.WHITE_BISHOP.getType(), is(TokenType.BISHOP));
        assertThat(DefaultChessToken.WHITE_KING.getType(), is(TokenType.KING));
        assertThat(DefaultChessToken.WHITE_KNIGHT.getType(), is(TokenType.KNIGHT));
        assertThat(DefaultChessToken.WHITE_PAWN.getType(), is(TokenType.PAWN));
        assertThat(DefaultChessToken.WHITE_QUEEN.getType(), is(TokenType.QUEEN));
        assertThat(DefaultChessToken.WHITE_ROOK.getType(), is(TokenType.ROOK));
        assertThat(DefaultChessToken.WHITE_UNICORN.getType(), is(TokenType.UNICORN));

        assertThat(DefaultChessToken.BLACK_BISHOP.getType(), is(TokenType.BISHOP));
        assertThat(DefaultChessToken.BLACK_KING.getType(), is(TokenType.KING));
        assertThat(DefaultChessToken.BLACK_KNIGHT.getType(), is(TokenType.KNIGHT));
        assertThat(DefaultChessToken.BLACK_PAWN.getType(), is(TokenType.PAWN));
        assertThat(DefaultChessToken.BLACK_QUEEN.getType(), is(TokenType.QUEEN));
        assertThat(DefaultChessToken.BLACK_ROOK.getType(), is(TokenType.ROOK));
        assertThat(DefaultChessToken.BLACK_UNICORN.getType(), is(TokenType.UNICORN));
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        // Setup.
        final ChessToken token0 = DefaultChessToken.WHITE_KING;
        final ChessToken token1 = DefaultChessToken.BLACK_QUEEN;
        final ChessToken token2 = DefaultChessToken.WHITE_KING;

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
        final ChessToken token0 = DefaultChessToken.WHITE_KING;
        final ChessToken token1 = DefaultChessToken.BLACK_QUEEN;
        final ChessToken token2 = DefaultChessToken.WHITE_KING;

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
        final ChessToken token = DefaultChessToken.WHITE_KING;
        final Agent agent = new DefaultAgent("name", "description", ChessTeam.WHITE);

        // Run.
        final ChessToken result = (ChessToken)token.withAgent(agent);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(token));
        assertFalse(result == token);
        assertThat(result.getAgent(), is(agent));
        assertNull(token.getAgent());
    }
}

package org.vizzini.example.boardgame.hexchess;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Test the <code>TokenType<code> class.
 */
public final class TokenTypeTest
{
    /**
     * Test the <code>getBySymbol()</code> method.
     */
    @Test
    public void getBySymbol()
    {
        assertThat(TokenType.getBySymbol("K"), is(TokenType.KING));
        assertThat(TokenType.getBySymbol("Q"), is(TokenType.QUEEN));
        assertThat(TokenType.getBySymbol("B"), is(TokenType.BISHOP));
        assertThat(TokenType.getBySymbol("N"), is(TokenType.KNIGHT));
        assertThat(TokenType.getBySymbol("R"), is(TokenType.ROOK));
        assertThat(TokenType.getBySymbol("P"), is(TokenType.PAWN));
    }

    /**
     * Test the <code>getBySymbol()</code> method.
     */
    @Test
    public void getBySymbolNull()
    {
        assertNull(TokenType.getBySymbol(null));
        assertNull(TokenType.getBySymbol(""));
        assertNull(TokenType.getBySymbol("T"));
    }
}

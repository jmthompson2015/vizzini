package org.vizzini.chess.tridimensional;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.chess.ChessTeam;
import org.vizzini.chess.ChessToken;
import org.vizzini.chess.Dimensions;
import org.vizzini.chess.TokenType;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;

/**
 * Provides tests for the <code>TridEnvironment</code> class.
 */
public final class TridEnvironmentTest
{
    /**
     * Test the <code>contains()</code> method.
     */
    @Test
    public void getDimensionsContainsCoordinates()
    {
        // Setup.
        final TridEnvironment environment = new TridEnvironment();
        final Dimensions dimensions = environment.getDimensions();

        // Run / Verify.
        assertTrue(dimensions.contains(0, 0, 0));
        assertTrue(dimensions.contains(5, 5, 6));
    }

    /**
     * Test the <code>contains()</code> method.
     */
    @Test
    public void getDimensionsContainsIndex()
    {
        // Setup.
        final TridEnvironment environment = new TridEnvironment();
        final Dimensions dimensions = environment.getDimensions();

        // Run / Verify.
        assertThat(dimensions.getFileCount(), is(6));
        assertThat(dimensions.getRankCount(), is(6));
        assertThat(dimensions.getLevelCount(), is(7));
        assertThat(dimensions.getCellCount(), is(252));
        assertTrue("index = " + TridPosition.a1A.getIndex(), dimensions.contains(TridPosition.a1A.getIndex()));
        assertTrue("index = " + TridPosition.b2F.getIndex(), dimensions.contains(TridPosition.b2F.getIndex()));
        assertTrue("index = " + TridPosition.e5F.getIndex(), dimensions.contains(TridPosition.e5F.getIndex()));
        assertTrue("index = " + TridPosition.a1G.getIndex(), dimensions.contains(TridPosition.a1G.getIndex()));
        assertTrue("index = " + TridPosition.a6G.getIndex(), dimensions.contains(TridPosition.a6G.getIndex()));
        assertTrue("index = " + TridPosition.f6G.getIndex(), dimensions.contains(TridPosition.f6G.getIndex()));
    }

    /**
     * Test the <code>placeInitialTokens()</code> method.
     */
    @Test
    public void placeInitialTokens()
    {
        // Setup.
        final TridEnvironment environment = new TridEnvironment();
        final Agent agentWhite = new DefaultAgent("white", "white", ChessTeam.WHITE);
        final Agent agentBlack = new DefaultAgent("black", "black", ChessTeam.BLACK);
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentWhite);
        agents.add(agentBlack);

        // Run.
        environment.placeInitialTokens(agents);

        // Verify.
        verifyToken(environment, TridPosition.a1A, ChessTeam.WHITE, TokenType.ROOK);
        verifyToken(environment, TridPosition.b1A, ChessTeam.WHITE, TokenType.KNIGHT);
        verifyToken(environment, TridPosition.e1A, ChessTeam.WHITE, TokenType.KNIGHT);
        verifyToken(environment, TridPosition.f1A, ChessTeam.WHITE, TokenType.ROOK);

        verifyToken(environment, TridPosition.a2A, ChessTeam.WHITE, TokenType.PAWN);
        verifyToken(environment, TridPosition.b2A, ChessTeam.WHITE, TokenType.PAWN);
        verifyToken(environment, TridPosition.e2A, ChessTeam.WHITE, TokenType.PAWN);
        verifyToken(environment, TridPosition.f2A, ChessTeam.WHITE, TokenType.PAWN);

        verifyToken(environment, TridPosition.b2B, ChessTeam.WHITE, TokenType.BISHOP);
        verifyToken(environment, TridPosition.c2B, ChessTeam.WHITE, TokenType.QUEEN);
        verifyToken(environment, TridPosition.d2B, ChessTeam.WHITE, TokenType.KING);
        verifyToken(environment, TridPosition.e2B, ChessTeam.WHITE, TokenType.BISHOP);

        verifyToken(environment, TridPosition.b3B, ChessTeam.WHITE, TokenType.PAWN);
        verifyToken(environment, TridPosition.c3B, ChessTeam.WHITE, TokenType.PAWN);
        verifyToken(environment, TridPosition.d3B, ChessTeam.WHITE, TokenType.PAWN);
        verifyToken(environment, TridPosition.e3B, ChessTeam.WHITE, TokenType.PAWN);

        verifyToken(environment, TridPosition.b4F, ChessTeam.BLACK, TokenType.PAWN);
        verifyToken(environment, TridPosition.c4F, ChessTeam.BLACK, TokenType.PAWN);
        verifyToken(environment, TridPosition.d4F, ChessTeam.BLACK, TokenType.PAWN);
        verifyToken(environment, TridPosition.e4F, ChessTeam.BLACK, TokenType.PAWN);

        verifyToken(environment, TridPosition.b5F, ChessTeam.BLACK, TokenType.BISHOP);
        verifyToken(environment, TridPosition.c5F, ChessTeam.BLACK, TokenType.QUEEN);
        verifyToken(environment, TridPosition.d5F, ChessTeam.BLACK, TokenType.KING);
        verifyToken(environment, TridPosition.e5F, ChessTeam.BLACK, TokenType.BISHOP);

        verifyToken(environment, TridPosition.a5G, ChessTeam.BLACK, TokenType.PAWN);
        verifyToken(environment, TridPosition.b5G, ChessTeam.BLACK, TokenType.PAWN);
        verifyToken(environment, TridPosition.e5G, ChessTeam.BLACK, TokenType.PAWN);
        verifyToken(environment, TridPosition.f5G, ChessTeam.BLACK, TokenType.PAWN);

        verifyToken(environment, TridPosition.a6G, ChessTeam.BLACK, TokenType.ROOK);
        verifyToken(environment, TridPosition.b6G, ChessTeam.BLACK, TokenType.KNIGHT);
        verifyToken(environment, TridPosition.e6G, ChessTeam.BLACK, TokenType.KNIGHT);
        verifyToken(environment, TridPosition.f6G, ChessTeam.BLACK, TokenType.ROOK);
    }

    /**
     * @param environment Environment.
     * @param position Position.
     * @param team Team.
     * @param type Type.
     */
    private void verifyToken(final TridEnvironment environment, final TridPosition position, final ChessTeam team,
            final TokenType type)
    {
        final ChessToken token = environment.getTokenAt(position);

        assertNotNull(token);
        assertThat((ChessTeam)token.getTeam(), is(team));
        assertThat(token.getType(), is(type));
    }
}

package org.vizzini.chess.standard;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.chess.ChessTeam;
import org.vizzini.chess.ChessToken;
import org.vizzini.chess.TokenType;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;

/**
 * Provides tests for the <code>StandardEnvironment</code> class.
 */
public final class StandardEnvironmentTest
{
    /**
     * Test the <code>placeInitialTokens()</code> method.
     */
    @Test
    public void placeInitialTokens()
    {
        // Setup.
        final StandardEnvironment environment = new StandardEnvironment();
        final Agent agentWhite = new DefaultAgent("white", "white", ChessTeam.WHITE);
        final Agent agentBlack = new DefaultAgent("black", "black", ChessTeam.BLACK);
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentWhite);
        agents.add(agentBlack);

        // Run.
        environment.placeInitialTokens(agents);

        // Verify.
        verifyToken(environment, StandardPosition.a1, ChessTeam.WHITE, TokenType.ROOK);
        verifyToken(environment, StandardPosition.b1, ChessTeam.WHITE, TokenType.KNIGHT);
        verifyToken(environment, StandardPosition.c1, ChessTeam.WHITE, TokenType.BISHOP);
        verifyToken(environment, StandardPosition.d1, ChessTeam.WHITE, TokenType.QUEEN);
        verifyToken(environment, StandardPosition.e1, ChessTeam.WHITE, TokenType.KING);
        verifyToken(environment, StandardPosition.f1, ChessTeam.WHITE, TokenType.BISHOP);
        verifyToken(environment, StandardPosition.g1, ChessTeam.WHITE, TokenType.KNIGHT);
        verifyToken(environment, StandardPosition.h1, ChessTeam.WHITE, TokenType.ROOK);

        for (int i = StandardPosition.a2.getIndex(); i < StandardPosition.a3.getIndex(); i++)
        {
            verifyToken(environment, StandardPosition.findByIndex(i), ChessTeam.WHITE, TokenType.PAWN);
        }

        for (int i = StandardPosition.a7.getIndex(); i < StandardPosition.a8.getIndex(); i++)
        {
            verifyToken(environment, StandardPosition.findByIndex(i), ChessTeam.BLACK, TokenType.PAWN);
        }

        verifyToken(environment, StandardPosition.a8, ChessTeam.BLACK, TokenType.ROOK);
        verifyToken(environment, StandardPosition.b8, ChessTeam.BLACK, TokenType.KNIGHT);
        verifyToken(environment, StandardPosition.c8, ChessTeam.BLACK, TokenType.BISHOP);
        verifyToken(environment, StandardPosition.d8, ChessTeam.BLACK, TokenType.QUEEN);
        verifyToken(environment, StandardPosition.e8, ChessTeam.BLACK, TokenType.KING);
        verifyToken(environment, StandardPosition.f8, ChessTeam.BLACK, TokenType.BISHOP);
        verifyToken(environment, StandardPosition.g8, ChessTeam.BLACK, TokenType.KNIGHT);
        verifyToken(environment, StandardPosition.h8, ChessTeam.BLACK, TokenType.ROOK);
    }

    /**
     * @param environment Environment.
     * @param position Position.
     * @param team Team.
     * @param type Type.
     */
    private void verifyToken(final StandardEnvironment environment, final StandardPosition position,
            final ChessTeam team, final TokenType type)
    {
        final ChessToken token = environment.getTokenAt(position);

        assertNotNull(token);
        assertThat((ChessTeam)token.getTeam(), is(team));
        assertThat(token.getType(), is(type));
    }
}

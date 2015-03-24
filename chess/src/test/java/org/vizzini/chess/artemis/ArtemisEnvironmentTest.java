package org.vizzini.chess.artemis;

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
 * Provides tests for the <code>ArtemisEnvironment</code> class.
 */
public final class ArtemisEnvironmentTest
{
    /**
     * Test the <code>placeInitialTokens()</code> method.
     */
    @Test
    public void placeInitialTokens()
    {
        // Setup.
        final ArtemisEnvironment environment = new ArtemisEnvironment();
        final Agent agentWhite = new DefaultAgent("white", "white", ChessTeam.WHITE);
        final Agent agentBlack = new DefaultAgent("black", "black", ChessTeam.BLACK);
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentWhite);
        agents.add(agentBlack);

        // Run.
        environment.placeInitialTokens(agents);

        // Verify.
        verifyToken(environment, ArtemisPosition.a1A, ChessTeam.WHITE, TokenType.ROOK);
        verifyToken(environment, ArtemisPosition.b1A, ChessTeam.WHITE, TokenType.QUEEN);
        verifyToken(environment, ArtemisPosition.c1A, ChessTeam.WHITE, TokenType.KING);
        verifyToken(environment, ArtemisPosition.d1A, ChessTeam.WHITE, TokenType.ROOK);

        verifyToken(environment, ArtemisPosition.a1B, ChessTeam.WHITE, TokenType.KNIGHT);
        verifyToken(environment, ArtemisPosition.b1B, ChessTeam.WHITE, TokenType.BISHOP);
        verifyToken(environment, ArtemisPosition.c1B, ChessTeam.WHITE, TokenType.BISHOP);
        verifyToken(environment, ArtemisPosition.d1B, ChessTeam.WHITE, TokenType.KNIGHT);

        verifyToken(environment, ArtemisPosition.a4C, ChessTeam.BLACK, TokenType.KNIGHT);
        verifyToken(environment, ArtemisPosition.b4C, ChessTeam.BLACK, TokenType.BISHOP);
        verifyToken(environment, ArtemisPosition.c4C, ChessTeam.BLACK, TokenType.BISHOP);
        verifyToken(environment, ArtemisPosition.d4C, ChessTeam.BLACK, TokenType.KNIGHT);

        verifyToken(environment, ArtemisPosition.a4D, ChessTeam.BLACK, TokenType.ROOK);
        verifyToken(environment, ArtemisPosition.b4D, ChessTeam.BLACK, TokenType.QUEEN);
        verifyToken(environment, ArtemisPosition.c4D, ChessTeam.BLACK, TokenType.KING);
        verifyToken(environment, ArtemisPosition.d4D, ChessTeam.BLACK, TokenType.ROOK);
    }

    /**
     * @param environment Environment.
     * @param position Position.
     * @param team Team.
     * @param type Type.
     */
    private void verifyToken(final ArtemisEnvironment environment, final ArtemisPosition position,
            final ChessTeam team, final TokenType type)
    {
        final ChessToken token = environment.getTokenAt(position);

        assertNotNull(token);
        assertThat((ChessTeam)token.getTeam(), is(team));
        assertThat(token.getType(), is(type));
    }
}

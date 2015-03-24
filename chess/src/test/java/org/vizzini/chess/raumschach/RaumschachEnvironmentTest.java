package org.vizzini.chess.raumschach;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.chess.ChessTeam;
import org.vizzini.chess.ChessToken;
import org.vizzini.chess.FENBoardFormat;
import org.vizzini.chess.GameType;
import org.vizzini.chess.TokenType;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;

/**
 * Provides tests for the <code>RaumschachEnvironment</code> class.
 */
public final class RaumschachEnvironmentTest
{
    /**
     * Test the <code>copy()</code> method.
     */
    @Test
    public void copy()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final RaumschachEnvironment board = (RaumschachEnvironment)formatter.parse(GameType.RAUMSCHACH
                .getStartPosition());

        final RaumschachEnvironment result = (RaumschachEnvironment)board.copy();

        assertNotNull(result);
        assertThat(result, is(board));
        // assertThat(result.getTokens(), is(board.getTokens()));
        // assertFalse(result.getTokens() == board.getTokens());

        final ChessToken token00 = board.getTokenAt(0);
        final ChessToken token10 = result.getTokenAt(0);
        assertThat(token00, is(token10));
        assertFalse(token00 == token10);

        assertThat(result.getGameType(), is(board.getGameType()));
        assertThat(result.getDimensions(), is(board.getDimensions()));
    }

    /**
     * Test the <code>placeInitialTokens()</code> method.
     */
    @Test
    public void placeInitialTokens()
    {
        // Setup.
        final RaumschachEnvironment environment = new RaumschachEnvironment();
        final Agent agentWhite = new DefaultAgent("white", "white", ChessTeam.WHITE);
        final Agent agentBlack = new DefaultAgent("black", "black", ChessTeam.BLACK);
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentWhite);
        agents.add(agentBlack);

        // Run.
        environment.placeInitialTokens(agents);

        // Verify.
        verifyToken(environment, RaumschachPosition.a1A, ChessTeam.WHITE, TokenType.ROOK);
        verifyToken(environment, RaumschachPosition.b1A, ChessTeam.WHITE, TokenType.KNIGHT);
        verifyToken(environment, RaumschachPosition.c1A, ChessTeam.WHITE, TokenType.KING);
        verifyToken(environment, RaumschachPosition.d1A, ChessTeam.WHITE, TokenType.KNIGHT);
        verifyToken(environment, RaumschachPosition.e1A, ChessTeam.WHITE, TokenType.ROOK);

        verifyToken(environment, RaumschachPosition.a1B, ChessTeam.WHITE, TokenType.BISHOP);
        verifyToken(environment, RaumschachPosition.b1B, ChessTeam.WHITE, TokenType.UNICORN);
        verifyToken(environment, RaumschachPosition.c1B, ChessTeam.WHITE, TokenType.QUEEN);
        verifyToken(environment, RaumschachPosition.d1B, ChessTeam.WHITE, TokenType.BISHOP);
        verifyToken(environment, RaumschachPosition.e1B, ChessTeam.WHITE, TokenType.UNICORN);

        verifyToken(environment, RaumschachPosition.a5D, ChessTeam.BLACK, TokenType.BISHOP);
        verifyToken(environment, RaumschachPosition.b5D, ChessTeam.BLACK, TokenType.UNICORN);
        verifyToken(environment, RaumschachPosition.c5D, ChessTeam.BLACK, TokenType.QUEEN);
        verifyToken(environment, RaumschachPosition.d5D, ChessTeam.BLACK, TokenType.BISHOP);
        verifyToken(environment, RaumschachPosition.e5D, ChessTeam.BLACK, TokenType.UNICORN);

        verifyToken(environment, RaumschachPosition.a5E, ChessTeam.BLACK, TokenType.ROOK);
        verifyToken(environment, RaumschachPosition.b5E, ChessTeam.BLACK, TokenType.KNIGHT);
        verifyToken(environment, RaumschachPosition.c5E, ChessTeam.BLACK, TokenType.KING);
        verifyToken(environment, RaumschachPosition.d5E, ChessTeam.BLACK, TokenType.KNIGHT);
        verifyToken(environment, RaumschachPosition.e5E, ChessTeam.BLACK, TokenType.ROOK);
    }

    /**
     * @param environment Environment.
     * @param position Position.
     * @param team Team.
     * @param type Type.
     */
    private void verifyToken(final RaumschachEnvironment environment, final RaumschachPosition position,
            final ChessTeam team, final TokenType type)
    {
        final ChessToken token = environment.getTokenAt(position);

        assertNotNull(token);
        assertThat((ChessTeam)token.getTeam(), is(team));
        assertThat(token.getType(), is(type));
    }
}

package org.vizzini.chess;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>SimpleAgent</code> class.
 */
public final class SimpleAgentTest
{
    /** FEN formatter. */
    private final FENBoardFormat formatter = new FENBoardFormat();

    /** Move generator. */
    private final ChessActionGenerator moveGenerator = new DefaultChessActionGenerator();

    /** Agent. */
    private final Agent agentWhite = new SimpleAgent("White", ChessTeam.WHITE, moveGenerator);

    /** Agent. */
    private final Agent agentBlack = new SimpleAgent("Black", ChessTeam.BLACK, moveGenerator);

    /**
     * Test the <code>getMove()</code> method.
     */
    @Test
    public void getMoveBlack()
    {
        // Setup.
        final String boardString = GameType.RAUMSCHACH.getStartPosition().replaceAll(" w ", " b ");
        final ChessEnvironment board = formatter.parse(boardString);
        assertThat(board.getWhoseMove(), is(ChessTeam.BLACK));
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        // Run.
        final ChessAction result = (ChessAction)agentBlack.getAction(board, adjudicator);

        // Verify.
        assertNotNull(result);
        final ChessToken fromToken = (ChessToken)board.getTokenAt(result.getFromPosition());
        assertNotNull(fromToken);
    }

    /**
     * Test the <code>getMove()</code> method.
     */
    @Test
    public void getMoveWhite()
    {
        // Setup.
        final String boardString = GameType.RAUMSCHACH.getStartPosition();
        final ChessEnvironment board = formatter.parse(boardString);
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        // Run.
        final ChessAction result = (ChessAction)agentWhite.getAction(board, adjudicator);

        // Verify.
        assertNotNull(result);
        final ChessToken fromToken = (ChessToken)board.getTokenAt(result.getFromPosition());
        assertNotNull(fromToken);
    }
}

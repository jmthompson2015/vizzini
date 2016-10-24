package org.vizzini.chess;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.chess.artemis.ArtemisPosition;
import org.vizzini.chess.raumschach.RaumschachPosition;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>SimpleAgent</code> class.
 */
public final class CaptureAgentTest
{
    /** Output formatter. */
    // private final ChessBoardFormat outputFormatter = new ChessBoardFormat();

    /** FEN formatter. */
    private final FENBoardFormat formatter = new FENBoardFormat();

    /** Move generator. */
    private final ChessActionGenerator moveGenerator = new DefaultChessActionGenerator();

    /** Agent. */
    private final Agent simpleAgentWhite = new SimpleAgent("White", ChessTeam.WHITE, moveGenerator);

    /** Agent. */
    private final Agent agentWhite = new CaptureAgent(simpleAgentWhite);

    /** Agent. */
    private final Agent simpleAgentBlack = new SimpleAgent("Black", ChessTeam.BLACK, moveGenerator);

    /** Agent. */
    private final Agent agentBlack = new CaptureAgent(simpleAgentBlack);

    /**
     * Test the <code>getMove()</code> method.
     */
    @Test
    public void getMoveArtemisBlack()
    {
        final ChessEnvironment board = formatter.parse(GameType.ARTEMIS.getStartPosition());
        board.setWhoseMove(ChessTeam.BLACK);
        moveGenerator.generateMoves(board);

        assertThat(board.getFiftyMoveCount(), is(0));
        assertThat(board.getMoveCount(), is(1));
        assertThat(board.getWhoseMove(), is(ChessTeam.BLACK));
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        final ChessAction result = (ChessAction)agentBlack.getAction(board, adjudicator);

        assertNotNull(result);

        assertThat((ArtemisPosition)result.getFromPosition(), is(ArtemisPosition.a3C));
        final ChessToken fromToken = (ChessToken)board.getTokenAt(result.getFromPosition());
        assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.BLACK));
        assertThat(fromToken.getType(), is(TokenType.PAWN));

        assertThat((ArtemisPosition)result.getToPosition(), is(ArtemisPosition.a2B));
        final ChessToken toToken = (ChessToken)board.getTokenAt(result.getToPosition());
        assertThat((ChessTeam)toToken.getTeam(), is(ChessTeam.WHITE));
        assertThat(toToken.getType(), is(TokenType.PAWN));
    }

    /**
     * Test the <code>getMove()</code> method.
     */
    @Test
    public void getMoveArtemisWhite()
    {
        final ChessEnvironment board = formatter.parse(GameType.ARTEMIS.getStartPosition());
        moveGenerator.generateMoves(board);

        assertThat(board.getFiftyMoveCount(), is(0));
        assertThat(board.getMoveCount(), is(1));
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        final ChessAction result = (ChessAction)agentWhite.getAction(board, adjudicator);

        assertNotNull(result);

        assertThat((ArtemisPosition)result.getFromPosition(), is(ArtemisPosition.a1B));
        final ChessToken fromToken = (ChessToken)board.getTokenAt(result.getFromPosition());
        assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
        assertThat(fromToken.getType(), is(TokenType.KNIGHT));

        assertThat((ArtemisPosition)result.getToPosition(), is(ArtemisPosition.a3C));
        final ChessToken toToken = (ChessToken)board.getTokenAt(result.getToPosition());
        assertThat((ChessTeam)toToken.getTeam(), is(ChessTeam.BLACK));
        assertThat(toToken.getType(), is(TokenType.PAWN));
    }

    /**
     * Test the <code>getMove()</code> method.
     */
    @Test
    public void getMoveRaumscachBlack()
    {
        final ChessEnvironment board = formatter.parse(GameType.RAUMSCHACH.getStartPosition());
        board.setWhoseMove(ChessTeam.BLACK);
        moveGenerator.generateMoves(board);

        assertThat(board.getFiftyMoveCount(), is(0));
        assertThat(board.getMoveCount(), is(1));
        assertThat(board.getWhoseMove(), is(ChessTeam.BLACK));
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        final ChessAction result = (ChessAction)agentBlack.getAction(board, adjudicator);

        assertNotNull(result);

        assertThat((RaumschachPosition)result.getFromPosition(), is(RaumschachPosition.a5D));
        final ChessToken fromToken = (ChessToken)board.getTokenAt(result.getFromPosition());
        assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.BLACK));
        assertThat(fromToken.getType(), is(TokenType.BISHOP));

        assertThat((RaumschachPosition)result.getToPosition(), is(RaumschachPosition.a2A));
        final ChessToken toToken = (ChessToken)board.getTokenAt(result.getToPosition());
        assertThat((ChessTeam)toToken.getTeam(), is(ChessTeam.WHITE));
        assertThat(toToken.getType(), is(TokenType.PAWN));
    }

    /**
     * Test the <code>getMove()</code> method.
     */
    @Test
    public void getMoveRaumschachWhite()
    {
        final ChessEnvironment board = formatter.parse(GameType.RAUMSCHACH.getStartPosition());
        moveGenerator.generateMoves(board);

        assertThat(board.getFiftyMoveCount(), is(0));
        assertThat(board.getMoveCount(), is(1));
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        final ChessAction result = (ChessAction)agentWhite.getAction(board, adjudicator);

        assertNotNull(result);

        assertThat((RaumschachPosition)result.getFromPosition(), is(RaumschachPosition.a1B));
        final ChessToken fromToken = (ChessToken)board.getTokenAt(result.getFromPosition());
        assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
        assertThat(fromToken.getType(), is(TokenType.BISHOP));

        assertThat((RaumschachPosition)result.getToPosition(), is(RaumschachPosition.a4E));
        final ChessToken toToken = (ChessToken)board.getTokenAt(result.getToPosition());
        assertThat((ChessTeam)toToken.getTeam(), is(ChessTeam.BLACK));
        assertThat(toToken.getType(), is(TokenType.PAWN));
    }

    /**
     * Test the <code>getMove()</code> method.
     */
    @Test
    public void getMoveRaumschachWhiteCheckBlackMove()
    {
        final String boardString = "rnknr/5/5/5/5|bu1bu/2q2/5/5/5|5/5/5/5/5|5/5/5/PP1PP/BUQBU|5/5/5/PPPPP/RNKNR b 0 1";
        final ChessEnvironment board = formatter.parse(boardString);
        board.setWhoseMove(ChessTeam.BLACK);
        // System.out.println(outputFormatter.format(board));
        moveGenerator.generateMoves(board);

        assertThat(board.getFiftyMoveCount(), is(0));
        assertThat(board.getMoveCount(), is(1));
        assertThat(board.getWhoseMove(), is(ChessTeam.BLACK));
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        final ChessAction result = (ChessAction)agentBlack.getAction(board, adjudicator);

        assertNotNull(result);

        assertThat((RaumschachPosition)result.getFromPosition(), is(RaumschachPosition.c4D));
        final ChessToken fromToken = (ChessToken)board.getTokenAt(result.getFromPosition());
        assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.BLACK));
        assertThat(fromToken.getType(), is(TokenType.QUEEN));

        assertThat((RaumschachPosition)result.getToPosition(), is(RaumschachPosition.c1A));
        final ChessToken toToken = (ChessToken)board.getTokenAt(result.getToPosition());
        assertThat((ChessTeam)toToken.getTeam(), is(ChessTeam.WHITE));
        assertThat(toToken.getType(), is(TokenType.KING));
    }

    /**
     * Test the <code>getMove()</code> method.
     */
    @Test
    public void getMoveRaumschachWhiteCheckWhiteMove()
    {
        final String boardString = "rnknr/5/5/5/5|bu1bu/2q2/5/5/5|5/5/5/5/5|5/5/5/PPPPP/BUQBU|5/5/5/PPPPP/RNKNR w 0 1";
        final ChessEnvironment board = formatter.parse(boardString);
        board.setWhoseMove(ChessTeam.WHITE);
        moveGenerator.generateMoves(board);

        assertThat(board.getFiftyMoveCount(), is(0));
        assertThat(board.getMoveCount(), is(1));
        assertThat(board.getWhoseMove(), is(ChessTeam.WHITE));
        final ChessAdjudicator adjudicator = new DefaultChessAdjudicator();

        final ChessAction result = (ChessAction)agentWhite.getAction(board, adjudicator);

        assertNotNull(result);

        assertThat((RaumschachPosition)result.getFromPosition(), is(RaumschachPosition.b1A));
        final ChessToken fromToken = (ChessToken)board.getTokenAt(result.getFromPosition());
        assertThat((ChessTeam)fromToken.getTeam(), is(ChessTeam.WHITE));
        assertThat(fromToken.getType(), is(TokenType.KNIGHT));

        // FIXME white is still in check
        final ChessToken toToken = (ChessToken)board.getTokenAt(result.getToPosition());
        assertNull(toToken);
    }
}

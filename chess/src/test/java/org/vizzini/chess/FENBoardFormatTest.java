package org.vizzini.chess;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.chess.artemis.ArtemisEnvironment;
import org.vizzini.chess.raumschach.RaumschachEnvironment;
import org.vizzini.chess.raumschach.RaumschachPosition;
import org.vizzini.chess.standard.StandardEnvironment;
import org.vizzini.chess.tridimensional.TridEnvironment;
import org.vizzini.chess.tridimensional.TridPosition;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>FENBoardFormat</code> class.
 */
public final class FENBoardFormatTest
{
    /**
     * Test the <code>determineGameType()</code> method.
     */
    @Test
    public void determineGameTypeArtemis()
    {
        final FENBoardFormat formatter = new FENBoardFormat();

        final GameType result = formatter.determineGameType(GameType.ARTEMIS.getStartPosition());

        assertNotNull(result);
        assertThat(result, is(GameType.ARTEMIS));
    }

    /**
     * Test the <code>determineGameType()</code> method.
     */
    @Test
    public void determineGameTypeRaumschach()
    {
        final FENBoardFormat formatter = new FENBoardFormat();

        final GameType result = formatter.determineGameType(GameType.RAUMSCHACH.getStartPosition());

        assertNotNull(result);
        assertThat(result, is(GameType.RAUMSCHACH));
    }

    /**
     * Test the <code>determineGameType()</code> method.
     */
    @Test
    public void determineGameTypeStandard()
    {
        final FENBoardFormat formatter = new FENBoardFormat();

        final GameType result = formatter.determineGameType(GameType.STANDARD.getStartPosition());

        assertNotNull(result);
        assertThat(result, is(GameType.STANDARD));
    }

    /**
     * Test the <code>determineGameType()</code> method.
     */
    @Test
    public void determineGameTypeTrid()
    {
        final FENBoardFormat formatter = new FENBoardFormat();

        final GameType result = formatter.determineGameType(GameType.TRIDIMENSIONAL.getStartPosition());

        assertNotNull(result);
        assertThat(result, is(GameType.TRIDIMENSIONAL));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatArtemis()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(GameType.ARTEMIS.getStartPosition());

        final String result = formatter.format(board);

        assertNotNull(result);
        final String expected = GameType.ARTEMIS.getStartPosition() + " " + SimpleAgent.class.getName() + " "
                + SimpleAgent.class.getName();
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatNull()
    {
        final FENBoardFormat formatter = new FENBoardFormat();

        try
        {
            formatter.format(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("board is null"));
        }
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatRaumschach()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(GameType.RAUMSCHACH.getStartPosition());

        final String result = formatter.format(board);

        assertNotNull(result);
        final String expected = GameType.RAUMSCHACH.getStartPosition() + " " + SimpleAgent.class.getName() + " "
                + SimpleAgent.class.getName();
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatRaumschachWhiteKnight()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(GameType.RAUMSCHACH.getStartPosition());
        final ChessPosition fromPosition = RaumschachPosition.findByIndex(1);
        final ChessPosition toPosition = RaumschachPosition.findByIndex(12);
        moveToken(board, fromPosition, toPosition);

        final String result = formatter.format(board);

        assertNotNull(result);
        final String expected = "rnknr/ppppp/5/5/5|buqbu/ppppp/5/5/5|5/5/5/5/5|5/5/5/PPPPP/BUQBU|5/5/2N2/PPPPP/R1KNR b 1 1"
                + " " + SimpleAgent.class.getName() + " " + SimpleAgent.class.getName();
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatStandard()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(GameType.STANDARD.getStartPosition());

        final String result = formatter.format(board);

        assertNotNull(result);
        final String expected = GameType.STANDARD.getStartPosition() + " " + SimpleAgent.class.getName() + " "
                + SimpleAgent.class.getName();
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatTrid()
    {
        // Setup.
        final FENBoardFormat formatter = new FENBoardFormat();
        final ChessEnvironment board = formatter.parse(GameType.TRIDIMENSIONAL.getStartPosition());

        // Run.
        final String result = formatter.format(board);

        // Verify.
        assertNotNull(result);
        final String expected = GameType.TRIDIMENSIONAL.getStartPosition() + " " + SimpleAgent.class.getName() + " "
                + SimpleAgent.class.getName();
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseArtemis()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final Dimensions dimensions = GameType.ARTEMIS.getDimensions();

        final ChessEnvironment result = formatter.parse(GameType.ARTEMIS.getStartPosition());

        assertNotNull(result);
        assertThat(result, is(ArtemisEnvironment.class));
        assertThat(result.getDimensions(), is(dimensions));

        for (int r = 0; r < 2; r++)
        {
            for (int f = 0; f < 4; f++)
            {
                assertThat((ChessTeam)result.getTokenAt(dimensions.coordsToIndex(f, r, 0)).getTeam(),
                        is(ChessTeam.WHITE));
                assertThat((ChessTeam)result.getTokenAt(dimensions.coordsToIndex(f, r, 1)).getTeam(),
                        is(ChessTeam.WHITE));
            }
        }

        for (int f = 0; f < 4; f++)
        {
            assertThat("f = " + f, result.getTokenAt(dimensions.coordsToIndex(f, 1, 0)).getType(), is(TokenType.PAWN));
            assertThat("f = " + f, result.getTokenAt(dimensions.coordsToIndex(f, 1, 1)).getType(), is(TokenType.PAWN));
        }

        assertThat(result.getTokenAt(dimensions.coordsToIndex(0, 0, 0)).getType(), is(TokenType.ROOK));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(1, 0, 0)).getType(), is(TokenType.QUEEN));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(2, 0, 0)).getType(), is(TokenType.KING));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(3, 0, 0)).getType(), is(TokenType.ROOK));

        assertThat(result.getTokenAt(dimensions.coordsToIndex(0, 0, 1)).getType(), is(TokenType.KNIGHT));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(1, 0, 1)).getType(), is(TokenType.BISHOP));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(2, 0, 1)).getType(), is(TokenType.BISHOP));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(3, 0, 1)).getType(), is(TokenType.KNIGHT));

        assertThat(result.getTokenAt(dimensions.coordsToIndex(0, 3, 2)).getType(), is(TokenType.KNIGHT));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(1, 3, 2)).getType(), is(TokenType.BISHOP));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(2, 3, 2)).getType(), is(TokenType.BISHOP));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(3, 3, 2)).getType(), is(TokenType.KNIGHT));

        assertThat(result.getTokenAt(dimensions.coordsToIndex(0, 3, 3)).getType(), is(TokenType.ROOK));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(1, 3, 3)).getType(), is(TokenType.QUEEN));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(2, 3, 3)).getType(), is(TokenType.KING));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(3, 3, 3)).getType(), is(TokenType.ROOK));

        for (int f = 0; f < 4; f++)
        {
            assertThat(result.getTokenAt(dimensions.coordsToIndex(f, 2, 2)).getType(), is(TokenType.PAWN));
            assertThat(result.getTokenAt(dimensions.coordsToIndex(f, 2, 3)).getType(), is(TokenType.PAWN));
        }

        for (int r = 2; r < 4; r++)
        {
            for (int f = 0; f < 4; f++)
            {
                assertThat((ChessTeam)result.getTokenAt(dimensions.coordsToIndex(f, r, 2)).getTeam(),
                        is(ChessTeam.BLACK));
                assertThat((ChessTeam)result.getTokenAt(dimensions.coordsToIndex(f, r, 3)).getTeam(),
                        is(ChessTeam.BLACK));
            }
        }

        assertThat(result.getWhoseMove(), is(ChessTeam.WHITE));

        assertThat(result.getFiftyMoveCount(), is(0));
        assertThat(result.getMoveCount(), is(1));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseNull()
    {
        final FENBoardFormat formatter = new FENBoardFormat();

        try
        {
            formatter.parse(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("boardString is empty"));
        }

        try
        {
            formatter.parse("");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("boardString is empty"));
        }

        try
        {
            formatter.parse("bogus");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Cannot parse boardString [bogus]"));
        }
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseRaumschach()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final Dimensions dimensions = GameType.RAUMSCHACH.getDimensions();

        final ChessEnvironment result = formatter.parse(GameType.RAUMSCHACH.getStartPosition());

        assertNotNull(result);
        assertThat(result, is(RaumschachEnvironment.class));
        assertThat(result.getDimensions(), is(dimensions));

        for (int r = 0; r < 2; r++)
        {
            for (int f = 0; f < 5; f++)
            {
                assertThat("f = " + f, (ChessTeam)result.getTokenAt(dimensions.coordsToIndex(f, r, 0)).getTeam(),
                        is(ChessTeam.WHITE));
                assertThat("f = " + f, (ChessTeam)result.getTokenAt(dimensions.coordsToIndex(f, r, 1)).getTeam(),
                        is(ChessTeam.WHITE));
            }
        }

        for (int f = 0; f < 5; f++)
        {
            assertThat("f = " + f, result.getTokenAt(dimensions.coordsToIndex(f, 1, 0)).getType(), is(TokenType.PAWN));
            assertThat("f = " + f, result.getTokenAt(dimensions.coordsToIndex(f, 1, 1)).getType(), is(TokenType.PAWN));
        }

        assertThat(result.getTokenAt(dimensions.coordsToIndex(0, 0, 0)).getType(), is(TokenType.ROOK));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(1, 0, 0)).getType(), is(TokenType.KNIGHT));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(2, 0, 0)).getType(), is(TokenType.KING));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(3, 0, 0)).getType(), is(TokenType.KNIGHT));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(4, 0, 0)).getType(), is(TokenType.ROOK));

        assertThat(result.getTokenAt(dimensions.coordsToIndex(0, 0, 1)).getType(), is(TokenType.BISHOP));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(1, 0, 1)).getType(), is(TokenType.UNICORN));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(2, 0, 1)).getType(), is(TokenType.QUEEN));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(3, 0, 1)).getType(), is(TokenType.BISHOP));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(4, 0, 1)).getType(), is(TokenType.UNICORN));

        assertThat(result.getTokenAt(dimensions.coordsToIndex(0, 4, 3)).getType(), is(TokenType.BISHOP));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(1, 4, 3)).getType(), is(TokenType.UNICORN));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(2, 4, 3)).getType(), is(TokenType.QUEEN));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(3, 4, 3)).getType(), is(TokenType.BISHOP));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(4, 4, 3)).getType(), is(TokenType.UNICORN));

        assertThat(result.getTokenAt(dimensions.coordsToIndex(0, 4, 4)).getType(), is(TokenType.ROOK));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(1, 4, 4)).getType(), is(TokenType.KNIGHT));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(2, 4, 4)).getType(), is(TokenType.KING));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(3, 4, 4)).getType(), is(TokenType.KNIGHT));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(4, 4, 4)).getType(), is(TokenType.ROOK));

        for (int f = 0; f < 5; f++)
        {
            assertThat(result.getTokenAt(dimensions.coordsToIndex(f, 3, 3)).getType(), is(TokenType.PAWN));
            assertThat(result.getTokenAt(dimensions.coordsToIndex(f, 3, 4)).getType(), is(TokenType.PAWN));
        }

        for (int r = 3; r < 5; r++)
        {
            for (int f = 0; f < 5; f++)
            {
                assertThat((ChessTeam)result.getTokenAt(dimensions.coordsToIndex(f, r, 3)).getTeam(),
                        is(ChessTeam.BLACK));
                assertThat((ChessTeam)result.getTokenAt(dimensions.coordsToIndex(f, r, 4)).getTeam(),
                        is(ChessTeam.BLACK));
            }
        }

        assertThat(result.getWhoseMove(), is(ChessTeam.WHITE));

        assertThat(result.getFiftyMoveCount(), is(0));
        assertThat(result.getMoveCount(), is(1));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseRaumschachBlack()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        String boardString = GameType.RAUMSCHACH.getStartPosition();
        final int index = boardString.lastIndexOf('w');
        boardString = boardString.substring(0, index) + "b" + boardString.substring(index + 1);

        final ChessEnvironment result = formatter.parse(boardString);

        assertThat(result.getWhoseMove(), is(ChessTeam.BLACK));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseStandard()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final Dimensions dimensions = GameType.STANDARD.getDimensions();

        final ChessEnvironment result = formatter.parse(GameType.STANDARD.getStartPosition());

        assertNotNull(result);
        assertThat(result, is(StandardEnvironment.class));
        assertThat(result.getDimensions(), is(dimensions));

        for (int r = 0; r < 2; r++)
        {
            for (int f = 0; f < 8; f++)
            {
                assertThat((ChessTeam)result.getTokenAt(dimensions.coordsToIndex(f, r, 0)).getTeam(),
                        is(ChessTeam.WHITE));
            }
        }

        for (int f = 0; f < 8; f++)
        {
            assertThat("f = " + f, result.getTokenAt(dimensions.coordsToIndex(f, 1, 0)).getType(), is(TokenType.PAWN));
        }

        assertThat(result.getTokenAt(dimensions.coordsToIndex(0, 0, 0)).getType(), is(TokenType.ROOK));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(1, 0, 0)).getType(), is(TokenType.KNIGHT));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(2, 0, 0)).getType(), is(TokenType.BISHOP));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(3, 0, 0)).getType(), is(TokenType.QUEEN));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(4, 0, 0)).getType(), is(TokenType.KING));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(5, 0, 0)).getType(), is(TokenType.BISHOP));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(6, 0, 0)).getType(), is(TokenType.KNIGHT));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(7, 0, 0)).getType(), is(TokenType.ROOK));

        assertThat(result.getTokenAt(dimensions.coordsToIndex(0, 7, 0)).getType(), is(TokenType.ROOK));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(1, 7, 0)).getType(), is(TokenType.KNIGHT));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(2, 7, 0)).getType(), is(TokenType.BISHOP));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(3, 7, 0)).getType(), is(TokenType.QUEEN));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(4, 7, 0)).getType(), is(TokenType.KING));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(5, 7, 0)).getType(), is(TokenType.BISHOP));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(6, 7, 0)).getType(), is(TokenType.KNIGHT));
        assertThat(result.getTokenAt(dimensions.coordsToIndex(7, 7, 0)).getType(), is(TokenType.ROOK));

        for (int f = 0; f < 8; f++)
        {
            assertThat(result.getTokenAt(dimensions.coordsToIndex(f, 6, 0)).getType(), is(TokenType.PAWN));
        }

        for (int r = 6; r < 8; r++)
        {
            for (int f = 0; f < 8; f++)
            {
                assertThat((ChessTeam)result.getTokenAt(dimensions.coordsToIndex(f, r, 0)).getTeam(),
                        is(ChessTeam.BLACK));
            }
        }

        assertThat(result.getWhoseMove(), is(ChessTeam.WHITE));

        assertThat(result.getFiftyMoveCount(), is(0));
        assertThat(result.getMoveCount(), is(1));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseTrid()
    {
        final FENBoardFormat formatter = new FENBoardFormat();
        final Dimensions dimensions = GameType.TRIDIMENSIONAL.getDimensions();

        final ChessEnvironment result = formatter.parse(GameType.TRIDIMENSIONAL.getStartPosition());

        assertNotNull(result);
        assertThat(result, is(TridEnvironment.class));
        assertThat(result.getDimensions(), is(dimensions));

        // Level A.
        assertThat((ChessTeam)result.getTokenAt(TridPosition.a1A).getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.b1A).getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.a2A).getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.b2A).getTeam(), is(ChessTeam.WHITE));

        assertThat(((ChessToken)result.getTokenAt(TridPosition.a1A)).getType(), is(TokenType.ROOK));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.b1A)).getType(), is(TokenType.KNIGHT));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.a2A)).getType(), is(TokenType.PAWN));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.b2A)).getType(), is(TokenType.PAWN));

        assertThat((ChessTeam)result.getTokenAt(TridPosition.e1A).getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.f1A).getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.e2A).getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.f2A).getTeam(), is(ChessTeam.WHITE));

        assertThat(((ChessToken)result.getTokenAt(TridPosition.e1A)).getType(), is(TokenType.KNIGHT));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.f1A)).getType(), is(TokenType.ROOK));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.e2A)).getType(), is(TokenType.PAWN));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.f2A)).getType(), is(TokenType.PAWN));

        // Level B.
        assertThat((ChessTeam)result.getTokenAt(TridPosition.b2B).getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.c2B).getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.d2B).getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.e2B).getTeam(), is(ChessTeam.WHITE));

        assertThat(((ChessToken)result.getTokenAt(TridPosition.b2B)).getType(), is(TokenType.BISHOP));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.c2B)).getType(), is(TokenType.QUEEN));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.d2B)).getType(), is(TokenType.KING));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.e2B)).getType(), is(TokenType.BISHOP));

        assertThat((ChessTeam)result.getTokenAt(TridPosition.b3B).getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.c3B).getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.d3B).getTeam(), is(ChessTeam.WHITE));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.e3B).getTeam(), is(ChessTeam.WHITE));

        assertThat(((ChessToken)result.getTokenAt(TridPosition.b3B)).getType(), is(TokenType.PAWN));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.c3B)).getType(), is(TokenType.PAWN));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.d3B)).getType(), is(TokenType.PAWN));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.e3B)).getType(), is(TokenType.PAWN));

        // Level F.
        assertThat((ChessTeam)result.getTokenAt(TridPosition.b5F).getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.c5F).getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.d5F).getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.e5F).getTeam(), is(ChessTeam.BLACK));

        assertThat(((ChessToken)result.getTokenAt(TridPosition.b5F)).getType(), is(TokenType.BISHOP));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.c5F)).getType(), is(TokenType.QUEEN));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.d5F)).getType(), is(TokenType.KING));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.e5F)).getType(), is(TokenType.BISHOP));

        assertThat((ChessTeam)result.getTokenAt(TridPosition.b4F).getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.c4F).getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.d4F).getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.e4F).getTeam(), is(ChessTeam.BLACK));

        assertThat(((ChessToken)result.getTokenAt(TridPosition.b4F)).getType(), is(TokenType.PAWN));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.c4F)).getType(), is(TokenType.PAWN));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.d4F)).getType(), is(TokenType.PAWN));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.e4F)).getType(), is(TokenType.PAWN));

        // Level G.
        assertThat((ChessTeam)result.getTokenAt(TridPosition.a6G).getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.b6G).getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.a5G).getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.b5G).getTeam(), is(ChessTeam.BLACK));

        assertThat(((ChessToken)result.getTokenAt(TridPosition.a6G)).getType(), is(TokenType.ROOK));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.b6G)).getType(), is(TokenType.KNIGHT));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.a5G)).getType(), is(TokenType.PAWN));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.b5G)).getType(), is(TokenType.PAWN));

        assertThat((ChessTeam)result.getTokenAt(TridPosition.e6G).getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.f6G).getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.e5G).getTeam(), is(ChessTeam.BLACK));
        assertThat((ChessTeam)result.getTokenAt(TridPosition.f5G).getTeam(), is(ChessTeam.BLACK));

        assertThat(((ChessToken)result.getTokenAt(TridPosition.e6G)).getType(), is(TokenType.KNIGHT));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.f6G)).getType(), is(TokenType.ROOK));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.e5G)).getType(), is(TokenType.PAWN));
        assertThat(((ChessToken)result.getTokenAt(TridPosition.f5G)).getType(), is(TokenType.PAWN));

        assertThat(result.getWhoseMove(), is(ChessTeam.WHITE));

        assertThat(result.getFiftyMoveCount(), is(0));
        assertThat(result.getMoveCount(), is(1));
    }

    /**
     * @param board Board.
     * @param fromPosition From position.
     * @param toPosition To position.
     */
    private void moveToken(final ChessEnvironment board, final ChessPosition fromPosition,
            final ChessPosition toPosition)
    {
        final Agent agent = board.getTokenAt(fromPosition).getAgent();

        final ChessAction move = new DefaultChessAction(board, agent, fromPosition, toPosition);
        move.doIt();
    }
}

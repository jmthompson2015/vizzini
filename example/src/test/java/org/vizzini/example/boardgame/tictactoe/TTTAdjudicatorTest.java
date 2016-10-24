package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>TTTAdjudicator</code> class.
 */
public final class TTTAdjudicatorTest
{
    /** Game injector. */
    private final TTTGameInjector gameInjector = new TTTGameInjector();

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerColumns()
    {
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        for (int column = 0; column < TTTPosition.MAX_X; column++)
        {
            populateColumn(environment, actionGenerator, column, TTTTeam.X, TTTTeam.O);

            Agent result = adjudicator.determineWinner(environment);
            assertNotNull("column = " + column, result);
            assertThat((TTTTeam)result.getTeam(), is(TTTTeam.X));

            populateColumn(environment, actionGenerator, column, TTTTeam.O, TTTTeam.X);

            result = adjudicator.determineWinner(environment);
            assertNotNull(result);
            assertThat((TTTTeam)result.getTeam(), is(TTTTeam.O));
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerDiagnonal0O()
    {
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        final SimpleAgent agentO = new SimpleAgent(TTTTeam.O.getName(), TTTTeam.O, actionGenerator);
        final TTTToken token = TTTToken.O.withAgent(agentO);

        for (int i = 0; i < TTTPosition.MAX_X; i++)
        {
            environment.placeToken(TTTPosition.findByCoordinates(i, i), token);
        }

        final SimpleAgent agentX = new SimpleAgent(TTTTeam.X.getName(), TTTTeam.X, actionGenerator);
        environment.placeToken(TTTPosition.c1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.c2, TTTToken.X.withAgent(agentX));

        // System.out.println(environment);

        final Agent result = adjudicator.determineWinner(environment);
        assertNotNull(result);
        assertThat((TTTTeam)result.getTeam(), is(TTTTeam.O));
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerDiagnonal0X()
    {
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        final SimpleAgent agentX = new SimpleAgent(TTTTeam.X.getName(), TTTTeam.X, actionGenerator);
        final TTTToken token = TTTToken.X.withAgent(agentX);

        for (int i = 0; i < TTTPosition.MAX_X; i++)
        {
            environment.placeToken(TTTPosition.findByCoordinates(i, i), token);
        }

        final SimpleAgent agentO = new SimpleAgent(TTTTeam.O.getName(), TTTTeam.O, actionGenerator);
        environment.placeToken(TTTPosition.c1, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.c2, TTTToken.O.withAgent(agentO));

        final Agent result = adjudicator.determineWinner(environment);
        assertNotNull(result);
        assertThat((TTTTeam)result.getTeam(), is(TTTTeam.X));
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerDiagnonal1O()
    {
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        final SimpleAgent agentO = new SimpleAgent(TTTTeam.O.getName(), TTTTeam.O, actionGenerator);
        final TTTToken token = TTTToken.O.withAgent(agentO);

        for (int i = 0; i < TTTPosition.MAX_X; i++)
        {
            final TTTPosition position = TTTPosition.findByCoordinates(TTTPosition.MAX_X - i - 1, i);
            environment.placeToken(position, token);
        }

        final SimpleAgent agentX = new SimpleAgent(TTTTeam.X.getName(), TTTTeam.X, actionGenerator);
        environment.placeToken(TTTPosition.a1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.a2, TTTToken.X.withAgent(agentX));

        // System.out.println(environment);

        final Agent result = adjudicator.determineWinner(environment);
        assertNotNull(result);
        assertThat((TTTTeam)result.getTeam(), is(TTTTeam.O));
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerDiagnonal1X()
    {
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        final SimpleAgent agentX = new SimpleAgent(TTTTeam.X.getName(), TTTTeam.X, actionGenerator);
        final TTTToken token = TTTToken.X.withAgent(agentX);

        for (int i = 0; i < TTTPosition.MAX_X; i++)
        {
            final TTTPosition position = TTTPosition.findByCoordinates(TTTPosition.MAX_X - i - 1, i);
            environment.placeToken(position, token);
        }

        final SimpleAgent agentO = new SimpleAgent(TTTTeam.O.getName(), TTTTeam.O, actionGenerator);
        environment.placeToken(TTTPosition.a1, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.a2, TTTToken.O.withAgent(agentO));

        // System.out.println(environment);

        final Agent result = adjudicator.determineWinner(environment);
        assertNotNull(result);
        assertThat((TTTTeam)result.getTeam(), is(TTTTeam.X));
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerEmptyBoard()
    {
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final Agent result = adjudicator.determineWinner(environment);
        assertNull(result);
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerNull()
    {
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final Agent result = adjudicator.determineWinner(null);
        assertNull(result);
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerRows()
    {
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        for (int row = 0; row < TTTPosition.MAX_Y; row++)
        {
            populateRow(environment, actionGenerator, row, TTTTeam.X, TTTTeam.O);

            Agent result = adjudicator.determineWinner(environment);
            assertNotNull(result);
            assertThat((TTTTeam)result.getTeam(), is(TTTTeam.X));

            populateRow(environment, actionGenerator, row, TTTTeam.O, TTTTeam.X);

            result = adjudicator.determineWinner(environment);
            assertNotNull(result);
            assertThat((TTTTeam)result.getTeam(), is(TTTTeam.O));
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerXO()
    {
        // Setup.
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent(TTTTeam.X.getName(), TTTTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent(TTTTeam.O.getName(), TTTTeam.O, actionGenerator);
        environment.placeToken(TTTPosition.a1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b1, TTTToken.O.withAgent(agentO));

        // Run.
        final Agent result = adjudicator.determineWinner(environment);

        // Verify.
        assertNull(result);
    }

    /**
     * Test the <code>determineWinningAgentTeam()</code> method.
     */
    @Test
    public void determineWinningAgentTeamColumns()
    {
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final EnvironmentStringifier environmentStringifier = new EnvironmentStringifier();

        for (int column = 0; column < TTTPosition.MAX_X; column++)
        {
            populateColumn(environment, actionGenerator, column, TTTTeam.X, TTTTeam.O);

            String boardString = environmentStringifier.stringify(environment);
            TTTTeam result = adjudicator.determineWinningAgentTeam(boardString);
            assertNotNull("column = " + column, result);
            assertThat(result, is(TTTTeam.X));

            populateColumn(environment, actionGenerator, column, TTTTeam.O, TTTTeam.X);

            boardString = environmentStringifier.stringify(environment);
            result = adjudicator.determineWinningAgentTeam(boardString);
            assertNotNull(result);
            assertThat(result, is(TTTTeam.O));
        }
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegalEmptyBoard()
    {
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final TTTPosition[] values = TTTPosition.values();

        for (final TTTPosition position : values)
        {
            final TTTAction action = new TTTAction(environment, position, TTTToken.X);
            final boolean result = adjudicator.isActionLegal(action);
            assertTrue(result);
        }
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegalNull()
    {
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final boolean result = adjudicator.isActionLegal(null);
        assertFalse(result);
    }

    /**
     * Test the <code>isGameOver()</code> method.
     */
    @Test
    public void isGameOver()
    {
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", TTTTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", TTTTeam.O, actionGenerator);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(TTTPosition.a1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.c1, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.CENTER, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.c2, TTTToken.O.withAgent(agentO));
        // System.out.println("initial environment =\n" + environment);
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();

        assertFalse(adjudicator.isGameOver(environment));

        environment.placeToken(TTTPosition.c3, TTTToken.X.withAgent(agentX));
        // System.out.println("final environment =\n" + environment);
        assertTrue(adjudicator.isGameOver(environment));
    }

    /**
     * Test the <code>isGameOver()</code> method.
     */
    @Test
    public void isGameOverNull()
    {
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final boolean result = adjudicator.isGameOver(null);
        assertFalse(result);
    }

    /**
     * @param environment Environment.
     * @param actionGenerator Action generator.
     * @param column Column index.
     * @param team0 First team.
     * @param team1 Second team.
     */
    private void populateColumn(final TTTEnvironment environment, final TTTActionGenerator actionGenerator,
            final int column, final TTTTeam team0, final TTTTeam team1)
    {
        environment.clear();
        final SimpleAgent agent0 = new SimpleAgent(team0.getName(), team0, actionGenerator);
        final TTTToken token0 = TTTToken.findByName(team0.getName()).withAgent(agent0);

        for (int y = 0; y < TTTPosition.MAX_Y; y++)
        {
            environment.placeToken(TTTPosition.findByCoordinates(column, y), token0);
        }

        int column2 = column + 1;

        if (column2 >= TTTPosition.MAX_X)
        {
            column2 = 0;
        }

        final SimpleAgent agent1 = new SimpleAgent(team1.getName(), team1, actionGenerator);
        final TTTToken token1 = TTTToken.findByName(team1.getName()).withAgent(agent1);

        for (int y = 0; y < 2; y++)
        {
            environment.placeToken(TTTPosition.findByCoordinates(column2, y), token1);
        }
    }

    /**
     * @param environment Environment.
     * @param actionGenerator Action generator.
     * @param row Row index.
     * @param team0 First team.
     * @param team1 Second team.
     */
    private void populateRow(final TTTEnvironment environment, final TTTActionGenerator actionGenerator, final int row,
            final TTTTeam team0, final TTTTeam team1)
    {
        environment.clear();
        final SimpleAgent agent0 = new SimpleAgent(team0.getName(), team0, actionGenerator);
        final TTTToken token0 = TTTToken.findByName(team0.getName()).withAgent(agent0);

        for (int x = 0; x < TTTPosition.MAX_X; x++)
        {
            environment.placeToken(TTTPosition.findByCoordinates(x, row), token0);
        }

        int row2 = row + 1;

        if (row2 >= TTTPosition.MAX_Y)
        {
            row2 = 0;
        }

        final SimpleAgent agent1 = new SimpleAgent(team1.getName(), team1, actionGenerator);
        final TTTToken token1 = TTTToken.findByName(team1.getName()).withAgent(agent1);

        for (int x = 0; x < 2; x++)
        {
            environment.placeToken(TTTPosition.findByCoordinates(x, row2), token1);
        }
    }
}

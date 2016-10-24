package org.vizzini.example.boardgame.qubic;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>QubicAdjudicator</code> class.
 */
public final class QubicAdjudicatorTest
{
    /** Game injector. */
    private final QubicGameInjector gameInjector = new QubicGameInjector();

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerEmptyBoard()
    {
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final Agent result = adjudicator.determineWinner(environment);
        assertNull(result);
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerNone()
    {
        // Setup.
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent(QubicTeam.O.getName(), QubicTeam.O, actionGenerator);
        environment.placeToken(QubicPosition.a1A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.b1A, QubicToken.O.withAgent(agentO));

        // Run.
        final Agent result = adjudicator.determineWinner(environment);

        // Verify.
        assertNull(result);
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerNull()
    {
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final Agent result = adjudicator.determineWinner(null);
        assertNull(result);
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerODiagnonalXY0()
    {
        for (int z = 0; z < 4; z++)
        {
            final QubicEnvironment environment = gameInjector.injectEnvironment();
            final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
            final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

            final SimpleAgent agent = new SimpleAgent(QubicTeam.O.getName(), QubicTeam.O, actionGenerator);
            final QubicToken token = QubicToken.O.withAgent(agent);

            for (int i = 0; i < QubicPosition.MAX_X; i++)
            {
                environment.placeToken(QubicPosition.findByCoordinates(i, i, z), token);
            }

            final Agent result = adjudicator.determineWinner(environment);
            assertNotNull(result);
            assertThat((QubicTeam)result.getTeam(), is(QubicTeam.O));
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerODiagnonalXY1()
    {
        for (int z = 0; z < 4; z++)
        {
            final QubicEnvironment environment = gameInjector.injectEnvironment();
            final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
            final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

            final SimpleAgent agent = new SimpleAgent(QubicTeam.O.getName(), QubicTeam.O, actionGenerator);
            final QubicToken token = QubicToken.O.withAgent(agent);

            for (int i = 0; i < QubicPosition.MAX_X; i++)
            {
                environment.placeToken(QubicPosition.findByCoordinates(3 - i, i, z), token);
            }

            final Agent result = adjudicator.determineWinner(environment);
            assertNotNull(result);
            assertThat((QubicTeam)result.getTeam(), is(QubicTeam.O));
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerODiagnonalXZ0()
    {
        for (int y = 0; y < 4; y++)
        {
            final QubicEnvironment environment = gameInjector.injectEnvironment();
            final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
            final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

            final SimpleAgent agent = new SimpleAgent(QubicTeam.O.getName(), QubicTeam.O, actionGenerator);
            final QubicToken token = QubicToken.O.withAgent(agent);

            for (int i = 0; i < QubicPosition.MAX_X; i++)
            {
                environment.placeToken(QubicPosition.findByCoordinates(i, y, i), token);
            }

            final Agent result = adjudicator.determineWinner(environment);
            assertNotNull(result);
            assertThat((QubicTeam)result.getTeam(), is(QubicTeam.O));
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerODiagnonalXZ1()
    {
        for (int y = 0; y < 4; y++)
        {
            final QubicEnvironment environment = gameInjector.injectEnvironment();
            final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
            final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

            final SimpleAgent agent = new SimpleAgent(QubicTeam.O.getName(), QubicTeam.O, actionGenerator);
            final QubicToken token = QubicToken.O.withAgent(agent);

            for (int i = 0; i < QubicPosition.MAX_X; i++)
            {
                environment.placeToken(QubicPosition.findByCoordinates(3 - i, y, i), token);
            }

            final Agent result = adjudicator.determineWinner(environment);
            assertNotNull(result);
            assertThat((QubicTeam)result.getTeam(), is(QubicTeam.O));
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerODiagnonalYZ0()
    {
        for (int x = 0; x < 4; x++)
        {
            final QubicEnvironment environment = gameInjector.injectEnvironment();
            final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
            final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

            final SimpleAgent agent = new SimpleAgent(QubicTeam.O.getName(), QubicTeam.O, actionGenerator);
            final QubicToken token = QubicToken.O.withAgent(agent);

            for (int i = 0; i < QubicPosition.MAX_X; i++)
            {
                environment.placeToken(QubicPosition.findByCoordinates(x, i, i), token);
            }

            final Agent result = adjudicator.determineWinner(environment);
            assertNotNull(result);
            assertThat((QubicTeam)result.getTeam(), is(QubicTeam.O));
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerODiagnonalYZ1()
    {
        for (int x = 0; x < 4; x++)
        {
            final QubicEnvironment environment = gameInjector.injectEnvironment();
            final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
            final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

            final SimpleAgent agent = new SimpleAgent(QubicTeam.O.getName(), QubicTeam.O, actionGenerator);
            final QubicToken token = QubicToken.O.withAgent(agent);

            for (int i = 0; i < QubicPosition.MAX_X; i++)
            {
                environment.placeToken(QubicPosition.findByCoordinates(x, 3 - i, i), token);
            }

            final Agent result = adjudicator.determineWinner(environment);
            assertNotNull(result);
            assertThat((QubicTeam)result.getTeam(), is(QubicTeam.O));
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerOFiles()
    {
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        for (int level = 0; level < QubicPosition.MAX_Z; level++)
        {
            for (int rank = 0; rank < QubicPosition.MAX_Y; rank++)
            {
                populateFile(environment, actionGenerator, rank, level, QubicTeam.O);

                final Agent result = adjudicator.determineWinner(environment);
                assertNotNull(result);
                assertThat((QubicTeam)result.getTeam(), is(QubicTeam.O));
            }
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerOLevels()
    {
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        for (int rank = 0; rank < QubicPosition.MAX_Y; rank++)
        {
            for (int file = 0; file < QubicPosition.MAX_X; file++)
            {
                populateLevel(environment, actionGenerator, file, rank, QubicTeam.O);

                final Agent result = adjudicator.determineWinner(environment);
                assertNotNull(result);
                assertThat((QubicTeam)result.getTeam(), is(QubicTeam.O));
            }
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerORanks()
    {
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        for (int level = 0; level < QubicPosition.MAX_Z; level++)
        {
            for (int file = 0; file < QubicPosition.MAX_X; file++)
            {
                populateRank(environment, actionGenerator, file, level, QubicTeam.O);

                final Agent result = adjudicator.determineWinner(environment);
                assertNotNull(result);
                assertThat((QubicTeam)result.getTeam(), is(QubicTeam.O));
            }
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerOTriagnonal0()
    {
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        final SimpleAgent agent = new SimpleAgent(QubicTeam.O.getName(), QubicTeam.O, actionGenerator);
        final QubicToken token = QubicToken.O.withAgent(agent);

        for (int i = 0; i < QubicPosition.MAX_X; i++)
        {
            environment.placeToken(QubicPosition.findByCoordinates(i, i, i), token);
        }

        final Agent result = adjudicator.determineWinner(environment);
        assertNotNull(result);
        assertThat((QubicTeam)result.getTeam(), is(QubicTeam.O));
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerOTriagnonal1()
    {
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        final SimpleAgent agent = new SimpleAgent(QubicTeam.O.getName(), QubicTeam.O, actionGenerator);
        final QubicToken token = QubicToken.O.withAgent(agent);

        for (int i = 0; i < QubicPosition.MAX_X; i++)
        {
            environment.placeToken(QubicPosition.findByCoordinates(3 - i, i, i), token);
        }

        final Agent result = adjudicator.determineWinner(environment);
        assertNotNull(result);
        assertThat((QubicTeam)result.getTeam(), is(QubicTeam.O));
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerOTriagnonal2()
    {
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        final SimpleAgent agent = new SimpleAgent(QubicTeam.O.getName(), QubicTeam.O, actionGenerator);
        final QubicToken token = QubicToken.O.withAgent(agent);

        for (int i = 0; i < QubicPosition.MAX_X; i++)
        {
            environment.placeToken(QubicPosition.findByCoordinates(i, 3 - i, i), token);
        }

        final Agent result = adjudicator.determineWinner(environment);
        assertNotNull(result);
        assertThat((QubicTeam)result.getTeam(), is(QubicTeam.O));
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerOTriagnonal3()
    {
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        final SimpleAgent agent = new SimpleAgent(QubicTeam.O.getName(), QubicTeam.O, actionGenerator);
        final QubicToken token = QubicToken.O.withAgent(agent);

        for (int i = 0; i < QubicPosition.MAX_X; i++)
        {
            environment.placeToken(QubicPosition.findByCoordinates(i, i, 3 - i), token);
        }

        final Agent result = adjudicator.determineWinner(environment);
        assertNotNull(result);
        assertThat((QubicTeam)result.getTeam(), is(QubicTeam.O));
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerXDiagnonalXY0()
    {
        for (int z = 0; z < 4; z++)
        {
            final QubicEnvironment environment = gameInjector.injectEnvironment();
            final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
            final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

            final SimpleAgent agent = new SimpleAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
            final QubicToken token = QubicToken.X.withAgent(agent);

            for (int i = 0; i < QubicPosition.MAX_X; i++)
            {
                environment.placeToken(QubicPosition.findByCoordinates(i, i, z), token);
            }

            final Agent result = adjudicator.determineWinner(environment);
            assertNotNull(result);
            assertThat((QubicTeam)result.getTeam(), is(QubicTeam.X));
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerXDiagnonalXY1()
    {
        for (int z = 0; z < 4; z++)
        {
            final QubicEnvironment environment = gameInjector.injectEnvironment();
            final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
            final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

            final SimpleAgent agent = new SimpleAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
            final QubicToken token = QubicToken.X.withAgent(agent);

            for (int i = 0; i < QubicPosition.MAX_X; i++)
            {
                environment.placeToken(QubicPosition.findByCoordinates(3 - i, i, z), token);
            }

            final Agent result = adjudicator.determineWinner(environment);
            assertNotNull(result);
            assertThat((QubicTeam)result.getTeam(), is(QubicTeam.X));
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerXDiagnonalXZ0()
    {
        for (int y = 0; y < 4; y++)
        {
            final QubicEnvironment environment = gameInjector.injectEnvironment();
            final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
            final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

            final SimpleAgent agent = new SimpleAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
            final QubicToken token = QubicToken.X.withAgent(agent);

            for (int i = 0; i < QubicPosition.MAX_X; i++)
            {
                environment.placeToken(QubicPosition.findByCoordinates(i, y, i), token);
            }

            final Agent result = adjudicator.determineWinner(environment);
            assertNotNull(result);
            assertThat((QubicTeam)result.getTeam(), is(QubicTeam.X));
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerXDiagnonalXZ1()
    {
        for (int y = 0; y < 4; y++)
        {
            final QubicEnvironment environment = gameInjector.injectEnvironment();
            final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
            final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

            final SimpleAgent agent = new SimpleAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
            final QubicToken token = QubicToken.X.withAgent(agent);

            for (int i = 0; i < QubicPosition.MAX_X; i++)
            {
                environment.placeToken(QubicPosition.findByCoordinates(3 - i, y, i), token);
            }

            final Agent result = adjudicator.determineWinner(environment);
            assertNotNull(result);
            assertThat((QubicTeam)result.getTeam(), is(QubicTeam.X));
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerXDiagnonalYZ0()
    {
        for (int x = 0; x < 4; x++)
        {
            final QubicEnvironment environment = gameInjector.injectEnvironment();
            final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
            final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

            final SimpleAgent agent = new SimpleAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
            final QubicToken token = QubicToken.X.withAgent(agent);

            for (int i = 0; i < QubicPosition.MAX_X; i++)
            {
                environment.placeToken(QubicPosition.findByCoordinates(x, i, i), token);
            }

            final Agent result = adjudicator.determineWinner(environment);
            assertNotNull(result);
            assertThat((QubicTeam)result.getTeam(), is(QubicTeam.X));
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerXDiagnonalYZ1()
    {
        for (int x = 0; x < 4; x++)
        {
            final QubicEnvironment environment = gameInjector.injectEnvironment();
            final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
            final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

            final SimpleAgent agent = new SimpleAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
            final QubicToken token = QubicToken.X.withAgent(agent);

            for (int i = 0; i < QubicPosition.MAX_X; i++)
            {
                environment.placeToken(QubicPosition.findByCoordinates(x, 3 - i, i), token);
            }

            final Agent result = adjudicator.determineWinner(environment);
            assertNotNull(result);
            assertThat((QubicTeam)result.getTeam(), is(QubicTeam.X));
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerXFiles()
    {
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        for (int level = 0; level < QubicPosition.MAX_Z; level++)
        {
            for (int rank = 0; rank < QubicPosition.MAX_Y; rank++)
            {
                populateFile(environment, actionGenerator, rank, level, QubicTeam.X);

                final Agent result = adjudicator.determineWinner(environment);
                assertNotNull(result);
                assertThat((QubicTeam)result.getTeam(), is(QubicTeam.X));
            }
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerXLevels()
    {
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        for (int rank = 0; rank < QubicPosition.MAX_Y; rank++)
        {
            for (int file = 0; file < QubicPosition.MAX_X; file++)
            {
                populateLevel(environment, actionGenerator, file, rank, QubicTeam.X);

                final Agent result = adjudicator.determineWinner(environment);
                assertNotNull("column = " + file, result);
                assertThat((QubicTeam)result.getTeam(), is(QubicTeam.X));
            }
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerXRanks()
    {
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        for (int level = 0; level < QubicPosition.MAX_Z; level++)
        {
            for (int file = 0; file < QubicPosition.MAX_X; file++)
            {
                populateRank(environment, actionGenerator, file, level, QubicTeam.X);

                final Agent result = adjudicator.determineWinner(environment);
                assertNotNull("column = " + file, result);
                assertThat((QubicTeam)result.getTeam(), is(QubicTeam.X));
            }
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerXTriagnonal0()
    {
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        final SimpleAgent agent = new SimpleAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
        final QubicToken token = QubicToken.X.withAgent(agent);

        for (int i = 0; i < QubicPosition.MAX_X; i++)
        {
            environment.placeToken(QubicPosition.findByCoordinates(i, i, i), token);
        }

        final Agent result = adjudicator.determineWinner(environment);
        assertNotNull(result);
        assertThat((QubicTeam)result.getTeam(), is(QubicTeam.X));
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerXTriagnonal1()
    {
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        final SimpleAgent agent = new SimpleAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
        final QubicToken token = QubicToken.X.withAgent(agent);

        for (int i = 0; i < QubicPosition.MAX_X; i++)
        {
            environment.placeToken(QubicPosition.findByCoordinates(3 - i, i, i), token);
        }

        final Agent result = adjudicator.determineWinner(environment);
        assertNotNull(result);
        assertThat((QubicTeam)result.getTeam(), is(QubicTeam.X));
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerXTriagnonal2()
    {
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        final SimpleAgent agent = new SimpleAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
        final QubicToken token = QubicToken.X.withAgent(agent);

        for (int i = 0; i < QubicPosition.MAX_X; i++)
        {
            environment.placeToken(QubicPosition.findByCoordinates(i, 3 - i, i), token);
        }

        final Agent result = adjudicator.determineWinner(environment);
        assertNotNull(result);
        assertThat((QubicTeam)result.getTeam(), is(QubicTeam.X));
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerXTriagnonal3()
    {
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();

        final SimpleAgent agent = new SimpleAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
        final QubicToken token = QubicToken.X.withAgent(agent);

        for (int i = 0; i < QubicPosition.MAX_X; i++)
        {
            environment.placeToken(QubicPosition.findByCoordinates(i, i, 3 - i), token);
        }

        final Agent result = adjudicator.determineWinner(environment);
        assertNotNull(result);
        assertThat((QubicTeam)result.getTeam(), is(QubicTeam.X));
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegalEmptyBoard()
    {
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final QubicPosition[] values = QubicPosition.values();

        for (final QubicPosition position : values)
        {
            final QubicAction action = new QubicAction(environment, position, QubicToken.X);
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
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final boolean result = adjudicator.isActionLegal(null);
        assertFalse(result);
    }

    /**
     * Test the <code>isGameOver()</code> method.
     */
    @Test
    public void isGameOver()
    {
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agentX = new SimpleAgent("X", QubicTeam.X, actionGenerator);
        final SimpleAgent agentO = new SimpleAgent("O", QubicTeam.O, actionGenerator);
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        environment.placeToken(QubicPosition.a1A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.d1A, QubicToken.O.withAgent(agentO));
        environment.placeToken(QubicPosition.b2A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.d2A, QubicToken.O.withAgent(agentO));
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();

        assertFalse(adjudicator.isGameOver(environment));

        environment.placeToken(QubicPosition.c3A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.d3A, QubicToken.O.withAgent(agentO));
        assertFalse(adjudicator.isGameOver(environment));
        environment.placeToken(QubicPosition.d4A, QubicToken.X.withAgent(agentX));
        assertTrue(adjudicator.isGameOver(environment));
    }

    /**
     * Test the <code>isGameOver()</code> method.
     */
    @Test
    public void isGameOverNull()
    {
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final boolean result = adjudicator.isGameOver(null);
        assertFalse(result);
    }

    /**
     * @param environment Environment.
     * @param actionGenerator Action generator.
     * @param rank Rank.
     * @param level Level.
     * @param team Team.
     */
    private void populateFile(final QubicEnvironment environment, final QubicActionGenerator actionGenerator,
            final int rank, final int level, final QubicTeam team)
    {
        environment.clear();
        final SimpleAgent agent = new SimpleAgent(team.getName(), team, actionGenerator);
        final QubicToken token = QubicToken.findByName(team.getName()).withAgent(agent);

        for (int x = 0; x < QubicPosition.MAX_X; x++)
        {
            environment.placeToken(QubicPosition.findByCoordinates(x, rank, level), token);
        }
    }

    /**
     * @param environment Environment.
     * @param actionGenerator Action generator.
     * @param file File.
     * @param rank Rank.
     * @param team Team.
     */
    private void populateLevel(final QubicEnvironment environment, final QubicActionGenerator actionGenerator,
            final int file, final int rank, final QubicTeam team)
    {
        environment.clear();
        final SimpleAgent agent = new SimpleAgent(team.getName(), team, actionGenerator);
        final QubicToken token = QubicToken.findByTeam(team).withAgent(agent);

        for (int z = 0; z < QubicPosition.MAX_Y; z++)
        {
            environment.placeToken(QubicPosition.findByCoordinates(file, rank, z), token);
        }
    }

    /**
     * @param environment Environment.
     * @param actionGenerator Action generator.
     * @param file File.
     * @param level Level.
     * @param team Team.
     */
    private void populateRank(final QubicEnvironment environment, final QubicActionGenerator actionGenerator,
            final int file, final int level, final QubicTeam team)
    {
        environment.clear();
        final SimpleAgent agent = new SimpleAgent(team.getName(), team, actionGenerator);
        final QubicToken token = QubicToken.findByTeam(team).withAgent(agent);

        for (int y = 0; y < QubicPosition.MAX_Y; y++)
        {
            environment.placeToken(QubicPosition.findByCoordinates(file, y, level), token);
        }
    }
}

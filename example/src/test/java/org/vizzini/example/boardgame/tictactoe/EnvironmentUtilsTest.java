package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Token;

/**
 * Provides tests for the <code>EnvironmentUtils</code> class.
 */
public final class EnvironmentUtilsTest
{
    /** Environment utilities. */
    private final EnvironmentUtils environmentUtils = new EnvironmentUtils();

    /** Tic-tac-toe game injector. */
    private final TTTGameInjector injector = new TTTGameInjector();

    /**
     * Test the <code>getZ090()</code> method.
     */
    @Test
    public void getZ090()
    {
        final TTTEnvironment environment = createEnvironment();

        final TTTEnvironment result = environmentUtils.getZ090(environment);

        assertNotNull(result);
        assertNull(result.getTokenAt(TTTPosition.a1));
        assertNull(result.getTokenAt(TTTPosition.b1));
        assertNull(result.getTokenAt(TTTPosition.a2));
        assertNull(result.getTokenAt(TTTPosition.CENTER));
        assertNull(result.getTokenAt(TTTPosition.a3));
        assertNull(result.getTokenAt(TTTPosition.b3));
        assertNull(result.getTokenAt(TTTPosition.c3));

        {
            final Token token = result.getTokenAt(TTTPosition.c1);
            assertNotNull(token);
            assertThat(token.getName(), is("X"));
        }

        {
            final Token token = result.getTokenAt(TTTPosition.c2);
            assertNotNull(token);
            assertThat(token.getName(), is("O"));
        }
    }

    /**
     * Test the <code>getZ180()</code> method.
     */
    @Test
    public void getZ180()
    {
        final TTTEnvironment environment = createEnvironment();

        final TTTEnvironment result = environmentUtils.getZ180(environment);

        assertNotNull(result);
        assertNull(result.getTokenAt(TTTPosition.a1));
        assertNull(result.getTokenAt(TTTPosition.b1));
        assertNull(result.getTokenAt(TTTPosition.c1));
        assertNull(result.getTokenAt(TTTPosition.a2));
        assertNull(result.getTokenAt(TTTPosition.CENTER));
        assertNull(result.getTokenAt(TTTPosition.c2));
        assertNull(result.getTokenAt(TTTPosition.a3));

        {
            final Token token = result.getTokenAt(TTTPosition.b3);
            assertNotNull(token);
            assertThat(token.getName(), is("O"));
        }

        {
            final Token token = result.getTokenAt(TTTPosition.c3);
            assertNotNull(token);
            assertThat(token.getName(), is("X"));
        }
    }

    /**
     * Test the <code>getZ180()</code> method.
     */
    @Test
    public void getZ270()
    {
        final TTTEnvironment environment = createEnvironment();

        final TTTEnvironment result = environmentUtils.getZ270(environment);

        assertNotNull(result);
        assertNull(result.getTokenAt(TTTPosition.a1));
        assertNull(result.getTokenAt(TTTPosition.b1));
        assertNull(result.getTokenAt(TTTPosition.c1));
        assertNull(result.getTokenAt(TTTPosition.CENTER));
        assertNull(result.getTokenAt(TTTPosition.c2));
        assertNull(result.getTokenAt(TTTPosition.b3));
        assertNull(result.getTokenAt(TTTPosition.c3));

        {
            final Token token = result.getTokenAt(TTTPosition.a2);
            assertNotNull(token);
            assertThat(token.getName(), is("O"));
        }

        {
            final Token token = result.getTokenAt(TTTPosition.a3);
            assertNotNull(token);
            assertThat(token.getName(), is("X"));
        }
    }

    /**
     * @return a new tic-tac-toe environment.
     */
    private TTTEnvironment createEnvironment()
    {
        final TTTEnvironment answer = injector.injectEnvironment();

        final TTTActionGenerator actionGenerator = injector.injectActionGenerator();
        final Agent agentX = new SimpleAgent(TTTTeam.X.getName(), TTTTeam.X, actionGenerator);
        final Agent agentO = new SimpleAgent(TTTTeam.O.getName(), TTTTeam.O, actionGenerator);

        answer.placeToken(TTTPosition.a1, TTTToken.X.withAgent(agentX));
        answer.placeToken(TTTPosition.b1, TTTToken.O.withAgent(agentO));

        return answer;
    }
}

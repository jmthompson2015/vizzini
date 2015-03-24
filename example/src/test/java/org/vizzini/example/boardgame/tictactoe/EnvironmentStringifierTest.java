package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>EnvironmentStringifier</code> class.
 */
public final class EnvironmentStringifierTest
{
    /**
     * Test the <code>stringify()</code> method.
     */
    @Test
    public void stringify()
    {
        final TTTGameInjector injector = new TTTGameInjector();
        final TTTEnvironment environment = injector.injectEnvironment();
        final TTTActionGenerator actionGenerator = injector.injectActionGenerator();
        final Agent agentX = new SimpleAgent(TTTTeam.X.getName(), TTTTeam.X, actionGenerator);
        final Agent agentO = new SimpleAgent(TTTTeam.O.getName(), TTTTeam.O, actionGenerator);
        environment.placeToken(TTTPosition.a1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.CENTER, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.c3, TTTToken.X.withAgent(agentX));
        final EnvironmentStringifier stringifier = injector.injectEnvironmentStringifier();
        final String result = stringifier.stringify(environment);
        assertNotNull(result);
        assertThat(result, is("X---O---X"));
    }

    /**
     * Test the <code>stringify()</code> method.
     */
    @Test
    public void stringifyEmpty()
    {
        final TTTGameInjector injector = new TTTGameInjector();
        final TTTEnvironment environment = injector.injectEnvironment();
        final EnvironmentStringifier stringifier = injector.injectEnvironmentStringifier();
        final String result = stringifier.stringify(environment);
        assertNotNull(result);
        assertThat(result, is("---------"));
    }

    /**
     * Test the <code>stringify()</code> method.
     */
    @Test
    public void stringifyNull()
    {
        final TTTGameInjector injector = new TTTGameInjector();
        final EnvironmentStringifier stringifier = injector.injectEnvironmentStringifier();
        final String result = stringifier.stringify(null);
        assertNull(result);
    }
}

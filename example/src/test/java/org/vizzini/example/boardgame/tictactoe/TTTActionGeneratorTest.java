package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>TTTActionGenerator</code> class.
 */
public final class TTTActionGeneratorTest
{
    /** Game injector. */
    private final TTTGameInjector gameInjector = new TTTGameInjector();

    /**
     * Test the <code>generateActions()</code> method.
     */
    @Test
    public void generateActionsXO()
    {
        // Setup.
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final Agent agentX = new SimpleAgent(TTTTeam.X.getName(), TTTTeam.X, actionGenerator);
        final Agent agentO = new SimpleAgent(TTTTeam.O.getName(), TTTTeam.O, actionGenerator);
        environment.placeToken(TTTPosition.a1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b1, TTTToken.O.withAgent(agentO));

        // Run.
        final List<Action> result = actionGenerator.generateActions(environment, adjudicator, agentX);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(7));
        int i = 0;
        assertThat(((TTTAction)result.get(i++)).getPosition(), is(TTTPosition.c1));
        assertThat(((TTTAction)result.get(i++)).getPosition(), is(TTTPosition.a2));
        assertThat(((TTTAction)result.get(i++)).getPosition(), is(TTTPosition.CENTER));
        assertThat(((TTTAction)result.get(i++)).getPosition(), is(TTTPosition.c2));
        assertThat(((TTTAction)result.get(i++)).getPosition(), is(TTTPosition.a3));
        assertThat(((TTTAction)result.get(i++)).getPosition(), is(TTTPosition.b3));
        assertThat(((TTTAction)result.get(i++)).getPosition(), is(TTTPosition.c3));
    }
}

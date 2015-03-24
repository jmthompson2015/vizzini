package org.vizzini.example.boardgame.qubic;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>QubicActionGenerator</code> class.
 */
public final class QubicActionGeneratorTest
{
    /** Game injector. */
    private final QubicGameInjector gameInjector = new QubicGameInjector();

    /**
     * Test the <code>generateActions()</code> method.
     */
    @Test
    public void generateActionsXO()
    {
        // Setup.
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final Agent agentX = new SimpleAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
        final Agent agentO = new SimpleAgent(QubicTeam.O.getName(), QubicTeam.O, actionGenerator);
        environment.placeToken(QubicPosition.a1A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.b1A, QubicToken.O.withAgent(agentO));
        environment.placeToken(QubicPosition.c1A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.d1A, QubicToken.O.withAgent(agentO));
        environment.placeToken(QubicPosition.a2A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.b2A, QubicToken.O.withAgent(agentO));
        environment.placeToken(QubicPosition.c2A, QubicToken.X.withAgent(agentX));
        environment.placeToken(QubicPosition.d2A, QubicToken.O.withAgent(agentO));

        // Run.
        final List<Action> result = actionGenerator.generateActions(environment, adjudicator, agentX);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(56));
        int i = 0;
        assertThat(((QubicAction)result.get(i++)).getPosition(), is(QubicPosition.a3A));
        assertThat(((QubicAction)result.get(i++)).getPosition(), is(QubicPosition.b3A));
        assertThat(((QubicAction)result.get(i++)).getPosition(), is(QubicPosition.c3A));
        assertThat(((QubicAction)result.get(i++)).getPosition(), is(QubicPosition.d3A));
        assertThat(((QubicAction)result.get(i++)).getPosition(), is(QubicPosition.a4A));
        assertThat(((QubicAction)result.get(i++)).getPosition(), is(QubicPosition.b4A));
        assertThat(((QubicAction)result.get(i++)).getPosition(), is(QubicPosition.c4A));

        assertThat(((QubicAction)result.get(55)).getPosition(), is(QubicPosition.d4D));
    }
}

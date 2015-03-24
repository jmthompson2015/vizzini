package org.vizzini.example.boardgame.qubic;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;

/**
 * Provides tests for the <code>SimpleAgent</code> class.
 */
public final class SimpleAgentTest
{
    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getAction()
    {
        final QubicGameInjector gameInjector = new QubicGameInjector();
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agent = new SimpleAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
        final QubicAction action = agent.getAction(environment, adjudicator);
        assertNotNull(action);
        action.doIt();

        final QubicAction result = agent.getAction(environment, adjudicator);
        assertNotNull(result);
        final QubicPosition position = result.getPosition();
        assertNotNull(position);
        // SimpleAgent selects a position randomly, so we can't check the coordinates.
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionEmptyBoard()
    {
        final QubicGameInjector gameInjector = new QubicGameInjector();
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agent = new SimpleAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
        final QubicAction result = agent.getAction(environment, adjudicator);
        assertNotNull(result);
        final QubicPosition position = result.getPosition();
        assertNotNull(position);
        // SimpleAgent selects a position randomly, so we can't check the coordinates.
    }
}

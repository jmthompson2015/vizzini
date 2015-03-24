package org.vizzini.example.boardgame.qubic;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;

/**
 * Provides tests for the <code>MediumAgent</code> class.
 */
public final class MediumAgentTest
{
    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getAction()
    {
        // Setup.
        final QubicGameInjector gameInjector = new QubicGameInjector();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final MediumAgent agent = new MediumAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final QubicAction action = agent.getAction(environment, adjudicator);

        // Run.
        action.doIt();
        final QubicAction result = agent.getAction(environment, adjudicator);

        // Verify.
        assertNotNull(result);
        final QubicPosition position = result.getPosition();
        assertNotNull(position);
        // MediumAgent selects a position randomly, so we can't check the coordinates.
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionEmptyBoard()
    {
        final QubicGameInjector gameInjector = new QubicGameInjector();
        final QubicActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final MediumAgent agent = new MediumAgent(QubicTeam.X.getName(), QubicTeam.X, actionGenerator);
        final QubicEnvironment environment = gameInjector.injectEnvironment();
        final QubicAdjudicator adjudicator = gameInjector.injectAdjudicator();

        // Run.
        final QubicAction result = agent.getAction(environment, adjudicator);

        // Verify.
        assertNotNull(result);
        final QubicPosition position = result.getPosition();
        assertNotNull(position);
        // MediumAgent selects a position randomly, so we can't check the coordinates.
    }
}

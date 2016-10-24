package org.vizzini.example.boardgame.tictactoe;

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
        final TTTGameInjector gameInjector = new TTTGameInjector();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final EnvironmentStringifier environmentStringifier = gameInjector.injectEnvironmentStringifier();
        final MediumAgent agent = new MediumAgent(TTTTeam.X.getName(), TTTTeam.X, actionGenerator,
                environmentStringifier);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final TTTAction action = agent.getAction(environment, adjudicator);

        // Run.
        action.doIt();
        final TTTAction result = agent.getAction(environment, adjudicator);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        // MediumAgent selects a position randomly, so we can't check the coordinates.
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionEmptyBoard()
    {
        final TTTGameInjector gameInjector = new TTTGameInjector();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final EnvironmentStringifier environmentStringifier = gameInjector.injectEnvironmentStringifier();
        final MediumAgent agent = new MediumAgent(TTTTeam.X.getName(), TTTTeam.X, actionGenerator,
                environmentStringifier);
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();

        // Run.
        final TTTAction result = agent.getAction(environment, adjudicator);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        // MediumAgent selects a position randomly, so we can't check the coordinates.
    }
}

package org.vizzini.example.boardgame.tictactoe;

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
        final TTTGameInjector gameInjector = new TTTGameInjector();
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agent = new SimpleAgent(TTTTeam.X.getName(), TTTTeam.X, actionGenerator);
        final TTTAction action = agent.getAction(environment, adjudicator);
        assertNotNull(action);
        action.doIt();

        final TTTAction result = agent.getAction(environment, adjudicator);
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        // SimpleAgent selects a position randomly, so we can't check the coordinates.
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionEmptyBoard()
    {
        final TTTGameInjector gameInjector = new TTTGameInjector();
        final TTTEnvironment environment = gameInjector.injectEnvironment();
        final TTTAdjudicator adjudicator = gameInjector.injectAdjudicator();
        final TTTActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        final SimpleAgent agent = new SimpleAgent(TTTTeam.X.getName(), TTTTeam.X, actionGenerator);
        final TTTAction result = agent.getAction(environment, adjudicator);
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        // SimpleAgent selects a position randomly, so we can't check the coordinates.
    }
}

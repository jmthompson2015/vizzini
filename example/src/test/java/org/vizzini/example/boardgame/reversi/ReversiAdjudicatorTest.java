package org.vizzini.example.boardgame.reversi;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;

/**
 * Provides tests for the <code>ReversiAdjudicator</code> class.
 */
public final class ReversiAdjudicatorTest
{
    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinner()
    {
        final ReversiGameInjector injector = new ReversiGameInjector();
        final ReversiEnvironment environment = injector.injectEnvironment();
        final Agent agentBlack = new DefaultAgent(ReversiTeam.BLACK.getName(), ReversiTeam.BLACK.getDescription(),
                ReversiTeam.BLACK);
        final Agent agentWhite = new DefaultAgent(ReversiTeam.WHITE.getName(), ReversiTeam.WHITE.getDescription(),
                ReversiTeam.WHITE);
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentBlack);
        agents.add(agentWhite);
        environment.placeInitialTokens(agents);
        final Adjudicator adjudicator = injector.injectAdjudicator();

        final Agent result = adjudicator.determineWinner(environment);
        assertNull(result);
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegal()
    {
        final ReversiGameInjector injector = new ReversiGameInjector();
        final Agent agentWhite = new DefaultAgent(ReversiTeam.WHITE.getName(), ReversiTeam.WHITE.getDescription(),
                ReversiTeam.WHITE);
        final ReversiEnvironment environment = createEnvironment(agentWhite);
        final Adjudicator adjudicator = injector.injectAdjudicator();
        final ReversiToken token = ReversiToken.WHITE.withAgent(agentWhite);

        for (int y = 0; y < ReversiPosition.MAX_Y; y++)
        {
            for (int x = 0; x < ReversiPosition.MAX_X; x++)
            {
                final Action action = new ReversiAction(environment, ReversiPosition.findByCoordinates(x, y), token);

                final boolean result = adjudicator.isActionLegal(action);

                if (((x == 2) && (y == 4)) || ((x == 4) && (y == 2)) || ((x == 3) && (y == 5))
                        || ((x == 5) && (y == 3)))
                {
                    assertTrue("(" + x + "," + y + ") should be legal", result);
                }
                else
                {
                    assertFalse("(" + x + "," + y + ") should not be legal", result);
                }
            }
        }
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegalFor0()
    {
        final ReversiGameInjector injector = new ReversiGameInjector();
        final Agent agentWhite = new DefaultAgent(ReversiTeam.WHITE.getName(), ReversiTeam.WHITE.getDescription(),
                ReversiTeam.WHITE);
        final ReversiEnvironment environment = createEnvironment(agentWhite);
        final ReversiAdjudicator adjudicator = injector.injectAdjudicator();

        for (int y = 0; y < ReversiPosition.MAX_Y; y++)
        {
            for (int x = 0; x < ReversiPosition.MAX_X; x++)
            {
                final ReversiPosition toPosition = ReversiPosition.findByCoordinates(x, y);

                final boolean result = adjudicator.isActionLegalFor(environment, ReversiTeam.WHITE, toPosition);

                if (((x == 2) && (y == 4)) || ((x == 4) && (y == 2)) || ((x == 3) && (y == 5))
                        || ((x == 5) && (y == 3)))
                {
                    assertTrue("(" + x + "," + y + ") should be legal", result);
                }
                else
                {
                    assertFalse("(" + x + "," + y + ") should not be legal", result);
                }
            }
        }
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegalFor1()
    {
        final ReversiGameInjector injector = new ReversiGameInjector();
        final Agent agentBlack = new DefaultAgent(ReversiTeam.BLACK.getName(), ReversiTeam.BLACK.getDescription(),
                ReversiTeam.BLACK);
        final Agent agentWhite = new DefaultAgent(ReversiTeam.WHITE.getName(), ReversiTeam.WHITE.getDescription(),
                ReversiTeam.WHITE);
        final ReversiEnvironment environment = createEnvironment(agentWhite);
        environment.placeToken(ReversiPosition.b5, ReversiToken.BLACK.withAgent(agentBlack));

        final ReversiAdjudicator adjudicator = injector.injectAdjudicator();

        for (int y = 0; y < ReversiPosition.MAX_Y; y++)
        {
            for (int x = 0; x < ReversiPosition.MAX_X; x++)
            {
                final ReversiPosition toPosition = ReversiPosition.findByCoordinates(x, y);

                final boolean result = adjudicator.isActionLegalFor(environment, ReversiTeam.WHITE, toPosition);

                if (((x == 2) && (y == 4)) || ((x == 4) && (y == 2)) || ((x == 3) && (y == 5))
                        || ((x == 5) && (y == 3)))
                {
                    assertTrue("(" + x + "," + y + ") should be legal", result);
                }
                else
                {
                    assertFalse("(" + x + "," + y + ") should not be legal", result);
                }
            }
        }
    }

    /**
     * Test the <code>isGameOver()</code> method.
     */
    @Test
    public void isGameOverNull()
    {
        final ReversiGameInjector gameInjector = new ReversiGameInjector();
        final ReversiAdjudicator adjudicator = gameInjector.injectAdjudicator();

        final boolean result = adjudicator.isGameOver(null);
        assertFalse(result);
    }

    /**
     * @param agentWhite Agent white.
     * 
     * @return a new environment.
     */
    private ReversiEnvironment createEnvironment(final Agent agentWhite)
    {
        final ReversiGameInjector injector = new ReversiGameInjector();
        final ReversiEnvironment environment = injector.injectEnvironment();
        final Agent agentBlack = new DefaultAgent(ReversiTeam.BLACK.getName(), ReversiTeam.BLACK.getDescription(),
                ReversiTeam.BLACK);
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentBlack);
        agents.add(agentWhite);
        environment.placeInitialTokens(agents);

        return environment;
    }

}

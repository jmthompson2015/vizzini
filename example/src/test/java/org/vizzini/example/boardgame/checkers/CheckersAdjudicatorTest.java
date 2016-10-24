package org.vizzini.example.boardgame.checkers;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>CheckersAdjudicator</code> class.
 */
public final class CheckersAdjudicatorTest
{
    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerNoRedMove()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final List<Agent> agents = createAgents(injector);
        final Agent agentRed = agents.get(0);
        final Agent agentWhite = agents.get(1);
        final CheckersEnvironment environment = new CheckersEnvironment();

        environment.placeToken(CheckersPosition.P07, King.WHITE.withAgent(agentWhite));
        environment.placeToken(CheckersPosition.P03, Pawn.WHITE.withAgent(agentWhite));
        environment.placeToken(CheckersPosition.P02, Pawn.WHITE.withAgent(agentWhite));
        environment.placeToken(CheckersPosition.P12, Pawn.RED.withAgent(agentRed));
        environment.placeToken(CheckersPosition.P08, Pawn.RED.withAgent(agentRed));
        environment.placeToken(CheckersPosition.P04, King.RED.withAgent(agentRed));
        // System.out.println(environment);

        assertThat(environment.getTokenCountFor(CheckersTeam.RED), is(3));
        assertThat(environment.getTokenCountFor(CheckersTeam.WHITE), is(3));

        final CheckersAdjudicator adjudicator = injector.injectAdjudicator();

        // Run / Verify.
        assertTrue(adjudicator.isGameOver(environment));
        assertThat(adjudicator.determineWinner(environment), is(agentWhite));
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerNoWhiteMove()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final List<Agent> agents = createAgents(injector);
        final Agent agentRed = agents.get(0);
        final Agent agentWhite = agents.get(1);
        final CheckersEnvironment environment = new CheckersEnvironment();

        environment.placeToken(CheckersPosition.P26, King.RED.withAgent(agentRed));
        environment.placeToken(CheckersPosition.P30, Pawn.RED.withAgent(agentRed));
        environment.placeToken(CheckersPosition.P31, Pawn.RED.withAgent(agentRed));
        environment.placeToken(CheckersPosition.P21, Pawn.WHITE.withAgent(agentWhite));
        environment.placeToken(CheckersPosition.P25, Pawn.WHITE.withAgent(agentWhite));
        environment.placeToken(CheckersPosition.P29, King.WHITE.withAgent(agentWhite));
        // System.out.println(environment);

        assertThat(environment.getTokenCountFor(CheckersTeam.RED), is(3));
        assertThat(environment.getTokenCountFor(CheckersTeam.WHITE), is(3));

        final CheckersAdjudicator adjudicator = injector.injectAdjudicator();

        // Run / Verify.
        assertTrue(adjudicator.isGameOver(environment));
        assertThat(adjudicator.determineWinner(environment), is(agentRed));
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerNull()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final CheckersAdjudicator adjudicator = injector.injectAdjudicator();

        // Run / Verify.
        assertNull(adjudicator.determineWinner(null));
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegal()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final List<Agent> agents = createAgents(injector);
        final Agent agentWhite = agents.get(1);
        final CheckersEnvironment environment = createEnvironment(injector, agents);
        final Adjudicator adjudicator = injector.injectAdjudicator();

        // Agent white can move his token to an adjacent empty space.
        {
            final CheckersMoveAction action = new CheckersMoveAction(environment, agentWhite, CheckersPosition.P09,
                    CheckersPosition.P13);
            assertTrue(adjudicator.isActionLegal(action));
        }

        // Agent white cannot move backwards.
        assertFalse(adjudicator.isActionLegal(new CheckersMoveAction(environment, agentWhite, CheckersPosition.P09,
                CheckersPosition.P05)));

        // Agent white cannot move to an occupied space.
        assertFalse(adjudicator.isActionLegal(new CheckersMoveAction(environment, agentWhite, CheckersPosition.P04,
                CheckersPosition.P08)));

        // Agent white cannot move a red token.
        assertFalse(adjudicator.isActionLegal(new CheckersMoveAction(environment, agentWhite, CheckersPosition.P21,
                CheckersPosition.P17)));

        // Agent white cannot move too far.
        assertFalse(adjudicator.isActionLegal(new CheckersMoveAction(environment, agentWhite, CheckersPosition.P09,
                CheckersPosition.P18)));
    }

    /**
     * Test the <code>isGameOver()</code> method.
     */
    @Test
    public void isGameOver()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final List<Agent> agents = createAgents(injector);
        final CheckersEnvironment environment = createEnvironment(injector, agents);
        final CheckersAdjudicator adjudicator = injector.injectAdjudicator();

        // Run / Verify.
        assertFalse(adjudicator.isGameOver(environment));
    }

    /**
     * Test the <code>isGameOver()</code> method.
     */
    @Test
    public void isGameOverNoRed()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final List<Agent> agents = createAgents(injector);
        final CheckersEnvironment environment = createEnvironment(injector, agents);

        for (int y = 8 - 3; y < 8; y++)
        {
            for (int x = 0; x < 8; x++)
            {
                if ((x % 2) != (y % 2))
                {
                    final CheckersPosition position = CheckersPosition.findByCoordinates(x, y);
                    environment.removeToken(position);
                }
            }
        }

        assertThat(environment.getTokenCountFor(CheckersTeam.RED), is(0));
        assertThat(environment.getTokenCountFor(CheckersTeam.WHITE), is(12));

        final CheckersAdjudicator adjudicator = injector.injectAdjudicator();

        // Run / Verify.
        assertTrue(adjudicator.isGameOver(environment));
    }

    /**
     * Test the <code>isGameOver()</code> method.
     */
    @Test
    public void isGameOverNoWhite()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final List<Agent> agents = createAgents(injector);
        final CheckersEnvironment environment = createEnvironment(injector, agents);

        for (int y = 0; y < 3; y++)
        {
            for (int x = 0; x < 8; x++)
            {
                if ((x % 2) != (y % 2))
                {
                    final CheckersPosition position = CheckersPosition.findByCoordinates(x, y);
                    environment.removeToken(position);
                }
            }
        }

        assertThat(environment.getTokenCountFor(CheckersTeam.RED), is(12));
        assertThat(environment.getTokenCountFor(CheckersTeam.WHITE), is(0));

        final CheckersAdjudicator adjudicator = injector.injectAdjudicator();

        // Run / Verify.
        assertTrue(adjudicator.isGameOver(environment));
    }

    /**
     * Test the <code>isGameOver()</code> method.
     */
    @Test
    public void isGameOverNull()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final CheckersAdjudicator adjudicator = injector.injectAdjudicator();

        // Run / Verify.
        assertFalse(adjudicator.isGameOver(null));
    }

    /**
     * Test the <code>isJumpActionLegalFor()</code> method.
     */
    @Test
    public void isJumpActionLegalFor()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final List<Agent> agents = createAgents(injector);
        final Agent agentRed = agents.get(0);
        final Agent agentWhite = agents.get(1);
        final CheckersEnvironment environment = createEnvironment(injector, agents);
        {
            final CheckersMoveAction action = new CheckersMoveAction(environment, agentRed, CheckersPosition.P21,
                    CheckersPosition.P17);
            action.doIt();
        }
        {
            final CheckersMoveAction action = new CheckersMoveAction(environment, agentWhite, CheckersPosition.P09,
                    CheckersPosition.P14);
            action.doIt();
        }
        {
            final CheckersMoveAction action = new CheckersMoveAction(environment, agentRed, CheckersPosition.P22,
                    CheckersPosition.P18);
            action.doIt();
        }
        final CheckersAdjudicator adjudicator = injector.injectAdjudicator();

        // Agent white can jump his token over a red token to an empty space.
        assertTrue(adjudicator.isJumpActionLegalFor(environment, CheckersTeam.WHITE, CheckersPosition.P14,
                CheckersPosition.P21));

        // Agent white cannot jump his token to an occupied space.
        assertFalse(adjudicator.isJumpActionLegalFor(environment, CheckersTeam.WHITE, CheckersPosition.P14,
                CheckersPosition.P23));

        // Agent white cannot jump his token to an adjacent empty space.
        assertFalse(adjudicator.isJumpActionLegalFor(environment, CheckersTeam.WHITE, CheckersPosition.P10,
                CheckersPosition.P15));

        // Agent white cannot jump his own token.
        assertFalse(adjudicator.isJumpActionLegalFor(environment, CheckersTeam.WHITE, CheckersPosition.P08,
                CheckersPosition.P15));
    }

    /**
     * Test the <code>isMoveActionLegalFor()</code> method.
     */
    @Test
    public void isMoveActionLegalFor()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final List<Agent> agents = createAgents(injector);
        final CheckersEnvironment environment = createEnvironment(injector, agents);
        final CheckersAdjudicator adjudicator = injector.injectAdjudicator();

        // Agent white can move his token to an adjacent empty space.
        assertTrue(adjudicator.isMoveActionLegalFor(environment, CheckersTeam.WHITE, CheckersPosition.P09,
                CheckersPosition.P13));

        // Agent white cannot move backwards.
        assertFalse(adjudicator.isMoveActionLegalFor(environment, CheckersTeam.WHITE, CheckersPosition.P09,
                CheckersPosition.P05));

        // Agent white cannot move to an occupied space.
        assertFalse(adjudicator.isMoveActionLegalFor(environment, CheckersTeam.WHITE, CheckersPosition.P04,
                CheckersPosition.P08));

        // Agent white cannot move a red token.
        assertFalse(adjudicator.isMoveActionLegalFor(environment, CheckersTeam.WHITE, CheckersPosition.P21,
                CheckersPosition.P17));

        // Agent white cannot move too far.
        assertFalse(adjudicator.isMoveActionLegalFor(environment, CheckersTeam.WHITE, CheckersPosition.P09,
                CheckersPosition.P18));
    }

    /**
     * @param injector Game injector.
     * 
     * @return a new list of new agents.
     */
    private List<Agent> createAgents(final CheckersGameInjector injector)
    {
        final CheckersActionGenerator actionGenerator = injector.injectActionGenerator();
        final Agent agentRed = new SimpleAgent(CheckersTeam.RED.getName(), CheckersTeam.RED, actionGenerator);
        final Agent agentWhite = new SimpleAgent(CheckersTeam.WHITE.getName(), CheckersTeam.WHITE, actionGenerator);

        final List<Agent> answer = new ArrayList<Agent>();

        answer.add(agentRed);
        answer.add(agentWhite);

        return answer;
    }

    /**
     * @param injector Game injector.
     * @param agents Agents.
     * 
     * @return a new, initialized environment.
     */
    private CheckersEnvironment createEnvironment(final CheckersGameInjector injector, final List<Agent> agents)
    {
        final CheckersEnvironment answer = injector.injectEnvironment();
        answer.placeInitialTokens(agents);

        return answer;
    }
}

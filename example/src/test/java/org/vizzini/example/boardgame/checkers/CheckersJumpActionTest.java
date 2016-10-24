package org.vizzini.example.boardgame.checkers;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Agent;

/**
 * Provides tests for the <code>CheckersJumpAction</code> class.
 */
public final class CheckersJumpActionTest
{
    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doIt()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final List<Agent> agents = createAgents(injector);
        final Agent agentRed = agents.get(0);
        final Agent agentWhite = agents.get(1);
        final CheckersEnvironment environment = createEnvironment(injector, agents);
        {
            final CheckersMoveAction action = new CheckersMoveAction(environment, agentRed, CheckersPosition.P05,
                    CheckersPosition.P14);
            action.doIt();
        }
        {
            final CheckersMoveAction action = new CheckersMoveAction(environment, agentWhite, CheckersPosition.P12,
                    CheckersPosition.P23);
            action.doIt();
        }
        assertNotNull(environment.getTokenAt(CheckersPosition.P23));
        assertNotNull(environment.getTokenAt(CheckersPosition.P14));
        assertNull(environment.getTokenAt(CheckersPosition.P05));
        final CheckersJumpAction action = new CheckersJumpAction(environment, agentWhite, CheckersPosition.P23,
                CheckersPosition.P05);

        // Run.
        action.doIt();

        // Verify.
        assertNull(environment.getTokenAt(CheckersPosition.P23));
        assertNull(environment.getTokenAt(CheckersPosition.P14));
        assertNotNull(environment.getTokenAt(CheckersPosition.P05));
    }

    /**
     * Test the <code>doIt()</code> method.
     */
    @Test
    public void doItPawnPromotion()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final List<Agent> agents = createAgents(injector);
        final Agent agentRed = agents.get(0);
        final CheckersEnvironment environment = createEnvironment(injector, agents);
        environment.removeToken(CheckersPosition.P01);
        environment.removeToken(CheckersPosition.P10);
        environment.placeToken(CheckersPosition.P10, Pawn.RED.withAgent(agentRed));
        assertNotNull(environment.getTokenAt(CheckersPosition.P10));
        assertNotNull(environment.getTokenAt(CheckersPosition.P06));
        assertNull(environment.getTokenAt(CheckersPosition.P01));
        final CheckersJumpAction action = new CheckersJumpAction(environment, agentRed, CheckersPosition.P10,
                CheckersPosition.P01);

        // Run.
        action.doIt();

        // Verify.
        assertNull(environment.getTokenAt(CheckersPosition.P14));
        assertNull(environment.getTokenAt(CheckersPosition.P17));
        assertNotNull(environment.getTokenAt(CheckersPosition.P03));
        assertThat(environment.getTokenAt(CheckersPosition.P01), is(King.class));
        final King king = (King)environment.getTokenAt(CheckersPosition.P01);
        assertThat(king.getAgent(), is(agentRed));
        assertThat(king.getTeam(), is(CheckersTeam.RED));
    }

    /**
     * Test the <code>undoIt()</code> method.
     */
    @Test
    public void undoIt()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final List<Agent> agents = createAgents(injector);
        final Agent agentRed = agents.get(0);
        final Agent agentWhite = agents.get(1);
        final CheckersEnvironment environment = createEnvironment(injector, agents);
        {
            final CheckersMoveAction action = new CheckersMoveAction(environment, agentRed, CheckersPosition.P05,
                    CheckersPosition.P14);
            action.doIt();
        }
        {
            final CheckersMoveAction action = new CheckersMoveAction(environment, agentWhite, CheckersPosition.P12,
                    CheckersPosition.P23);
            action.doIt();
        }
        final CheckersJumpAction action = new CheckersJumpAction(environment, agentWhite, CheckersPosition.P23,
                CheckersPosition.P05);
        action.doIt();
        assertNull(environment.getTokenAt(CheckersPosition.P23));
        assertNull(environment.getTokenAt(CheckersPosition.P14));
        assertNotNull(environment.getTokenAt(CheckersPosition.P05));

        // Run.
        action.undoIt();

        // Verify.
        assertNotNull(environment.getTokenAt(CheckersPosition.P23));
        assertNotNull(environment.getTokenAt(CheckersPosition.P14));
        assertNull(environment.getTokenAt(CheckersPosition.P05));
    }

    /**
     * Test the <code>undoIt()</code> method.
     */
    @Test
    public void undoItPawnPromotion()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final List<Agent> agents = createAgents(injector);
        final Agent agentRed = agents.get(0);
        final CheckersEnvironment environment = createEnvironment(injector, agents);
        environment.removeToken(CheckersPosition.P01);
        environment.removeToken(CheckersPosition.P10);
        environment.placeToken(CheckersPosition.P10, Pawn.RED.withAgent(agentRed));
        final CheckersJumpAction action = new CheckersJumpAction(environment, agentRed, CheckersPosition.P10,
                CheckersPosition.P01);
        action.doIt();
        assertNull(environment.getTokenAt(CheckersPosition.P14));
        assertNull(environment.getTokenAt(CheckersPosition.P17));
        assertNotNull(environment.getTokenAt(CheckersPosition.P03));

        // Run.
        action.undoIt();

        // Verify.
        assertNotNull(environment.getTokenAt(CheckersPosition.P10));
        assertNotNull(environment.getTokenAt(CheckersPosition.P06));
        assertNull(environment.getTokenAt(CheckersPosition.P01));
        assertThat(environment.getTokenAt(CheckersPosition.P10), is(Pawn.class));
        final Pawn pawn = (Pawn)environment.getTokenAt(CheckersPosition.P10);
        assertThat(pawn.getAgent(), is(agentRed));
        assertThat(pawn.getTeam(), is(CheckersTeam.RED));
    }

    /**
     * @param injector Game injector.
     * 
     * @return a new list of new agents.
     */
    private List<Agent> createAgents(final CheckersGameInjector injector)
    {
        final CheckersActionGenerator actionGenerator = injector.injectActionGenerator();

        final List<Agent> answer = new ArrayList<Agent>();

        answer.add(new SimpleAgent(CheckersTeam.RED.getName(), CheckersTeam.RED, actionGenerator));
        answer.add(new SimpleAgent(CheckersTeam.WHITE.getName(), CheckersTeam.WHITE, actionGenerator));

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

package org.vizzini.example.boardgame.checkers;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Token;

/**
 * Provides tests for the <code>CheckersEnvironment</code> class.
 */
public final class CheckersEnvironmentTest
{
    /**
     * Test the <code>getTokenCountFor()</code> method.
     */
    @Test
    public void getTokenCountForTeam()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final List<Agent> agents = createAgents(injector);
        final CheckersEnvironment environment = createEnvironment(injector, agents);

        // Run / Verify.
        assertThat(environment.getTokenCountFor(CheckersTeam.RED), is(12));
        assertThat(environment.getTokenCountFor(CheckersTeam.WHITE), is(12));

        environment.removeToken(CheckersPosition.P01);

        assertThat(environment.getTokenCountFor(CheckersTeam.RED), is(12));
        assertThat(environment.getTokenCountFor(CheckersTeam.WHITE), is(11));
    }

    /**
     * Test the <code>getTokenCountFor()</code> method.
     */
    @Test
    public void getTokenCountForTeamNoRed()
    {
        // Setup.
        final CheckersGameInjector injector = new CheckersGameInjector();
        final List<Agent> agents = createAgents(injector);
        final CheckersEnvironment environment = new CheckersEnvironment();

        final Agent agentWhite = agents.get(1);

        for (int y = 0; y < 3; y++)
        {
            for (int x = 0; x < 8; x++)
            {
                if ((x % 2) != (y % 2))
                {
                    final CheckersPosition position = CheckersPosition.findByCoordinates(x, y);
                    final Token token = Pawn.WHITE.withAgent(agentWhite);
                    environment.placeToken(position, token);
                }
            }
        }

        // Run / Verify.
        assertThat(environment.getTokenCountFor(CheckersTeam.RED), is(0));
        assertThat(environment.getTokenCountFor(CheckersTeam.WHITE), is(12));
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

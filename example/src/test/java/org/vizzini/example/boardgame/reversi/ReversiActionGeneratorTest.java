package org.vizzini.example.boardgame.reversi;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;

/**
 * Provides tests for the <code>ReversiActionGenerator</code> class.
 */
public final class ReversiActionGeneratorTest
{
    /**
     * Test the <code>generateActions()</code> method.
     */
    @Test
    public void generateActions()
    {
        final ReversiGameInjector injector = new ReversiGameInjector();
        final ReversiActionGenerator actionGenerator = injector.injectActionGenerator();
        final ReversiEnvironment environment = injector.injectEnvironment();
        final ReversiAdjudicator adjudicator = injector.injectAdjudicator();
        final Agent agentBlack = new DefaultAgent(ReversiTeam.BLACK.getName(), ReversiTeam.BLACK.getDescription(),
                ReversiTeam.BLACK);
        final Agent agentWhite = new DefaultAgent(ReversiTeam.WHITE.getName(), ReversiTeam.WHITE.getDescription(),
                ReversiTeam.WHITE);
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentBlack);
        agents.add(agentWhite);
        environment.placeInitialTokens(agents);

        final List<Action> actions = actionGenerator.generateActions(environment, adjudicator, agentWhite);
        assertNotNull(actions);
        assertFalse(actions.isEmpty());
        assertThat(actions.size(), is(4));

        {
            final ReversiAction action = (ReversiAction)actions.get(0);
            assertNotNull(action);
            assertThat(action.getPosition(), is(ReversiPosition.e3));
        }

        {
            final ReversiAction action = (ReversiAction)actions.get(1);
            assertNotNull(action);
            assertThat(action.getPosition(), is(ReversiPosition.f4));
        }

        {
            final ReversiAction action = (ReversiAction)actions.get(2);
            assertNotNull(action);
            assertThat(action.getPosition(), is(ReversiPosition.c5));
        }

        {
            final ReversiAction action = (ReversiAction)actions.get(3);
            assertNotNull(action);
            assertThat(action.getPosition(), is(ReversiPosition.d6));
        }
    }
}

package org.vizzini.example.boardgame.reversi;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;

/**
 * Provides tests for the <code>ReversiEnvironment</code> class.
 */
public final class ReversiEnvironmentTest
{
    /**
     * Test the <code>determineLineLength()</code> method.
     */
    @Test
    public void determineLineLength()
    {
        // 0: _ _ _ _ _ _ _ _
        // 1: _ _ _ _ _ _ _ _
        // 2: _ _ _ _ * _ _ _
        // 3: _ _ _ W B _ _ _
        // 4: _ _ _ B W _ _ _
        // 5: _ _ _ _ _ _ _ _
        // 6: _ _ _ _ _ _ _ _
        // 7: _ _ _ _ _ _ _ _
        // __ 0 1 2 3 4 5 6 7
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
        ReversiPosition position0 = ReversiPosition.e3;

        for (int i = 0; i < ReversiAdjudicator.DIRECTIONS.length; i++)
        {
            final int[] direction = ReversiAdjudicator.DIRECTIONS[i];
            final int result = environment.determineLineLength(ReversiTeam.WHITE, position0, direction);

            if (i == 6)
            {
                assertThat(result, is(1));
            }
            else
            {
                assertThat(i + " direction = " + direction[0] + "," + direction[1], result, is(-1));
            }
        }

        position0 = ReversiPosition.f4;

        for (int i = 0; i < ReversiAdjudicator.DIRECTIONS.length; i++)
        {
            final int[] direction = ReversiAdjudicator.DIRECTIONS[i];
            final int result = environment.determineLineLength(ReversiTeam.WHITE, position0, direction);

            if (i == 3)
            {
                assertThat(result, is(1));
            }
            else
            {
                assertThat(i + " direction = " + direction[0] + "," + direction[1], result, is(-1));
            }
        }

        // Not a playable position.
        position0 = ReversiPosition.d3;

        for (int i = 0; i < ReversiAdjudicator.DIRECTIONS.length; i++)
        {
            final int[] direction = ReversiAdjudicator.DIRECTIONS[i];
            final int result = environment.determineLineLength(ReversiTeam.WHITE, position0, direction);
            assertThat(result, is(-1));
        }
    }

    /**
     * Test the <code>determineLineLength()</code> method.
     */
    @Test
    public void determineLineLength00()
    {
        // 0: _ _ _ _ _ _ _ _
        // 1: _ _ _ _ _ _ _ _
        // 2: _ _ _ _ _ _ _ _
        // 3: _ _ _ W B _ _ _
        // 4: _ _ _ B W _ _ _
        // 5: _ _ _ _ _ _ _ _
        // 6: _ _ _ _ _ _ _ _
        // 7: _ _ _ _ _ _ _ _
        // __ 0 1 2 3 4 5 6 7
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
        environment.placeToken(ReversiPosition.e3, ReversiToken.BLACK.withAgent(agentBlack));
        final ReversiPosition position0 = ReversiPosition.e2;

        for (int i = 0; i < ReversiAdjudicator.DIRECTIONS.length; i++)
        {
            final int[] direction = ReversiAdjudicator.DIRECTIONS[i];
            final int result = environment.determineLineLength(ReversiTeam.WHITE, position0, direction);

            if (i == 6)
            {
                assertThat(result, is(2));
            }
            else
            {
                assertThat(i + " direction = " + direction[0] + "," + direction[1], result, is(-1));
            }
        }
    }

    /**
     * Test the <code>determineLineLength()</code> method.
     */
    @Test
    public void determineLineLength000()
    {
        // 0: _ _ _ _ _ _ _ _
        // 1: _ _ _ _ _ _ _ _
        // 2: _ _ _ _ _ _ _ _
        // 3: _ _ _ W B _ _ _
        // 4: _ _ _ B W _ _ _
        // 5: _ _ _ _ _ _ _ _
        // 6: _ _ _ _ _ _ _ _
        // 7: _ _ _ _ _ _ _ _
        // __ 0 1 2 3 4 5 6 7
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
        environment.placeToken(ReversiPosition.e3, ReversiToken.BLACK.withAgent(agentBlack));
        environment.placeToken(ReversiPosition.e2, ReversiToken.BLACK.withAgent(agentBlack));
        final ReversiPosition position0 = ReversiPosition.e1;

        for (int i = 0; i < ReversiAdjudicator.DIRECTIONS.length; i++)
        {
            final int[] direction = ReversiAdjudicator.DIRECTIONS[i];
            final int result = environment.determineLineLength(ReversiTeam.WHITE, position0, direction);

            if (i == 6)
            {
                assertThat(result, is(3));
            }
            else
            {
                assertThat(i + " direction = " + direction[0] + "," + direction[1], result, is(-1));
            }
        }
    }

    /**
     * Test the <code>determineLineLength()</code> method.
     */
    @Test
    public void determineLineLength0000()
    {
        // 0: _ _ _ _ _ _ _ _
        // 1: _ _ _ _ _ _ _ _
        // 2: _ _ * _ _ _ _ _
        // 3: _ _ _ B B _ _ _
        // 4: _ _ W B W _ _ _
        // 5: _ _ _ _ _ _ _ _
        // 6: _ _ _ _ _ _ _ _
        // 7: _ _ _ _ _ _ _ _
        // __ 0 1 2 3 4 5 6 7
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
        environment.flipTokenAt(ReversiPosition.CENTER0);
        environment.placeToken(ReversiPosition.c5, ReversiToken.WHITE.withAgent(agentWhite));
        // Verify
        assertThat(environment.getTokenAt(ReversiPosition.CENTER0).getName(), is(ReversiTeam.BLACK.getName()));
        assertThat(environment.getTokenAt(ReversiPosition.c5).getName(), is(ReversiTeam.WHITE.getName()));

        final ReversiPosition position0 = ReversiPosition.c3;

        for (int i = 0; i < ReversiAdjudicator.DIRECTIONS.length; i++)
        {
            final int[] direction = ReversiAdjudicator.DIRECTIONS[i];
            final int result = environment.determineLineLength(ReversiTeam.WHITE, position0, direction);

            if (i == 7)
            {
                assertThat(result, is(1));
            }
            else
            {
                assertThat(i + " direction = " + direction[0] + "," + direction[1], result, is(-1));
            }
        }
    }

    /**
     * Test the <code>determineLineLength()</code> method.
     */
    @Test
    public void determineLineLengthEdge()
    {
        // 0: _ _ _ _ _ _ _ _
        // 1: _ _ _ _ _ _ _ _
        // 2: _ _ _ _ _ _ _ _
        // 3: _ _ _ W B _ _ _
        // 4: _ _ _ B W _ _ _
        // 5: _ _ _ _ _ _ _ _
        // 6: _ _ _ _ _ _ _ _
        // 7: _ _ _ _ _ _ _ _
        // __ 0 1 2 3 4 5 6 7
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
        environment.placeToken(ReversiPosition.g4, ReversiToken.BLACK.withAgent(agentBlack));
        final ReversiPosition position0 = ReversiPosition.f4;

        {
            final int[] direction = { 1, 0 };
            final int result = environment.determineLineLength(ReversiTeam.WHITE, position0, direction);
            assertThat(result, is(-1));
        }

        {
            final int[] direction = { -1, 0 };
            final int result = environment.determineLineLength(ReversiTeam.WHITE, position0, direction);
            assertThat(result, is(1));
        }

        environment.placeToken(ReversiPosition.h4, ReversiToken.BLACK.withAgent(agentBlack));

        {
            final int[] direction = { 1, 0 };
            final int result = environment.determineLineLength(ReversiTeam.WHITE, position0, direction);
            assertThat(result, is(-1));
        }

        {
            final int[] direction = { -1, 0 };
            final int result = environment.determineLineLength(ReversiTeam.WHITE, position0, direction);
            assertThat(result, is(1));
        }
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinner()
    {
        // 0: _ _ _ _ _ _ _ _
        // 1: _ _ _ _ _ _ _ _
        // 2: _ _ _ _ _ _ _ _
        // 3: _ _ _ W B _ _ _
        // 4: _ _ _ B W _ _ _
        // 5: _ _ _ _ _ _ _ _
        // 6: _ _ _ _ _ _ _ _
        // 7: _ _ _ _ _ _ _ _
        // __ 0 1 2 3 4 5 6 7
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
        final ReversiPosition position0 = ReversiPosition.e3;
        final int[] direction = { 0, 1 };

        final int result = environment.determineLineLength(ReversiTeam.WHITE, position0, direction);
        assertThat(result, is(1));
    }
}

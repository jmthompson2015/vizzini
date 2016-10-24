package org.vizzini.example.boardgame.reversi;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.vizzini.core.TimePrinter;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;
import org.vizzini.core.game.boardgame.Search;

/**
 * Provides tests for implementations of the <code>Search</code> interface.
 */
public abstract class MyTestSearch
{
    /** Flag indicating whether to print output. */
    private static final boolean IS_VERBOSE = false;

    /** Search. */
    private final Search search;

    /**
     * Construct this object.
     * 
     * @param search Search.
     */
    @SuppressWarnings("hiding")
    public MyTestSearch(final Search search)
    {
        if (search == null)
        {
            throw new IllegalArgumentException("search is null");
        }

        this.search = search;
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchBlackForTheWin()
    {
        // Setup.
        final int maxPlies = 5;
        final ReversiEnvironment environment = createEnvironment();
        final Agent agentBlack = environment.getFirstAgent();
        final Agent agentWhite = environment.getSecondAgent();
        final ReversiToken tokenBlack = ReversiToken.BLACK.withAgent(agentBlack);
        environment.placeToken(ReversiPosition.e5, tokenBlack);
        final ReversiAdjudicator adjudicator = createAdjudicator();
        printEnvironment(environment);

        if (IS_VERBOSE)
        {
            printEnvironment(environment);
        }

        // Run.
        final ReversiAction result = (ReversiAction)search.search(environment, adjudicator, agentBlack, agentWhite,
                maxPlies);

        // Verify.
        assertNotNull(result);
        final ReversiPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(ReversiPosition.c3));
        assertThat(result.getAgent(), is(agentBlack));
        assertThat(result.getEnvironment(), is(environment));

        result.doIt();

        // if (IS_VERBOSE)
        {
            printEnvironment(environment);
        }

        assertThat(adjudicator.determineWinner(environment), is(agentBlack));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth3()
    {
        // Setup.
        final int maxPlies = 3;
        final ReversiEnvironment environment = createEnvironment();
        final Agent agentBlack = environment.getFirstAgent();
        final Agent agentWhite = environment.getSecondAgent();
        final ReversiAdjudicator adjudicator = createAdjudicator();

        if (IS_VERBOSE)
        {
            printEnvironment(environment);
        }

        // Run.
        final ReversiAction result = (ReversiAction)search.search(environment, adjudicator, agentBlack, agentWhite,
                maxPlies);

        // Verify.
        assertNotNull(result);
        final ReversiPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(ReversiPosition.d3));
        assertThat(result.getAgent(), is(agentBlack));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth5()
    {
        // Setup.
        final int maxPlies = 5;
        final ReversiEnvironment environment = createEnvironment();
        final Agent agentBlack = environment.getFirstAgent();
        final Agent agentWhite = environment.getSecondAgent();
        final ReversiAdjudicator adjudicator = createAdjudicator();

        if (IS_VERBOSE)
        {
            printEnvironment(environment);
        }

        // Run.
        final ReversiAction result = (ReversiAction)search.search(environment, adjudicator, agentBlack, agentWhite,
                maxPlies);

        // Verify.
        assertNotNull(result);
        final ReversiPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(ReversiPosition.d3));
        assertThat(result.getAgent(), is(agentBlack));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth7()
    {
        final long start = System.currentTimeMillis();

        // Setup.
        final int maxPlies = 7;
        final ReversiEnvironment environment = createEnvironment();
        final Agent agentBlack = environment.getFirstAgent();
        final Agent agentWhite = environment.getSecondAgent();
        final ReversiAdjudicator adjudicator = createAdjudicator();

        if (IS_VERBOSE)
        {
            printEnvironment(environment);
        }

        // Run.
        final ReversiAction result = (ReversiAction)search.search(environment, adjudicator, agentBlack, agentWhite,
                maxPlies);

        // Verify.
        assertNotNull(result);
        final ReversiPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(ReversiPosition.d3));
        assertThat(result.getAgent(), is(agentBlack));
        assertThat(result.getEnvironment(), is(environment));

        final long end = System.currentTimeMillis();
        final TimePrinter timePrinter = new TimePrinter();
        System.out.println(timePrinter.formatElapsedTime("searchDepth7()", start, end));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchFullGame()
    {
        // Setup.
        final int maxPlies = 5;
        final ReversiEnvironment environment = createEnvironment();
        final Agent agentBlack = environment.getFirstAgent();
        final Agent agentWhite = environment.getSecondAgent();
        final ReversiAdjudicator adjudicator = createAdjudicator();

        final ReversiPosition[] positions = { ReversiPosition.d3, // 0
                ReversiPosition.c5, // 1
                ReversiPosition.e6, // 2
                ReversiPosition.d2, // 3
                ReversiPosition.b5, // 4
                ReversiPosition.f5, // 5
                ReversiPosition.d1, // 6
                ReversiPosition.a5, // 7
                ReversiPosition.f4, // 8
        };

        for (int i = 0; i < positions.length; i++)
        {
            final Agent activeAgent = ((i % 2) == 0 ? agentBlack : agentWhite);
            final Agent opponent = (activeAgent == agentBlack ? agentWhite : agentBlack);

            // Run.
            final ReversiAction result = (ReversiAction)search.search(environment, adjudicator, activeAgent, opponent,
                    maxPlies);

            // Verify.
            assertNotNull(result);
            assertThat("i = " + i, result.getPosition(), is(positions[i]));
            assertThat("i = " + i, result.getAgent(), is(activeAgent));

            result.doIt();

            if (IS_VERBOSE)
            {
                printEnvironment(environment);
            }
        }
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchMaxPliesNegative()
    {
        // Setup.
        final ReversiEnvironment environment = createEnvironment();
        final Agent agentBlack = environment.getFirstAgent();
        final Agent agentWhite = environment.getSecondAgent();
        final ReversiAdjudicator adjudicator = createAdjudicator();

        // Run / Verify.
        try
        {
            search.search(environment, adjudicator, agentBlack, agentWhite, -1);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("maxPlies is zero or less"));
        }
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchMaxPliesZero()
    {
        // Setup.
        final ReversiEnvironment environment = createEnvironment();
        final Agent agentBlack = environment.getFirstAgent();
        final Agent agentWhite = environment.getSecondAgent();
        final ReversiAdjudicator adjudicator = createAdjudicator();

        // Run / Verify.
        try
        {
            search.search(environment, adjudicator, agentBlack, agentWhite, -1);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("maxPlies is zero or less"));
        }
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchNull()
    {
        // Setup.
        final ReversiEnvironment environment = createEnvironment();
        final Agent agentBlack = environment.getFirstAgent();
        final Agent agentWhite = environment.getSecondAgent();
        final ReversiAdjudicator adjudicator = createAdjudicator();
        final int depth = 10;

        try
        {
            search.search(environment, adjudicator, null, agentWhite, depth);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("agent is null"));
        }

        try
        {
            search.search(environment, adjudicator, agentBlack, null, depth);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("opponent is null"));
        }

        try
        {
            search.search(null, adjudicator, agentBlack, agentWhite, depth);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("environment is null"));
        }

        try
        {
            search.search(environment, null, agentBlack, agentWhite, depth);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("adjudicator is null"));
        }
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchWhiteForTheWin()
    {
        // Setup.
        final int maxPlies = 5;
        final ReversiEnvironment environment = createEnvironment();
        final Agent agentBlack = environment.getFirstAgent();
        final Agent agentWhite = environment.getSecondAgent();
        final ReversiToken tokenWhite = ReversiToken.WHITE.withAgent(agentWhite);
        environment.placeToken(ReversiPosition.d5, tokenWhite);
        final ReversiAdjudicator adjudicator = createAdjudicator();

        if (IS_VERBOSE)
        {
            printEnvironment(environment);
        }

        // Run.
        final ReversiAction result = (ReversiAction)search.search(environment, adjudicator, agentWhite, agentBlack,
                maxPlies);

        // Verify.
        assertNotNull(result);
        final ReversiPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(ReversiPosition.e3));
        assertThat(result.getAgent(), is(agentWhite));
        assertThat(result.getEnvironment(), is(environment));

        result.doIt();

        if (IS_VERBOSE)
        {
            printEnvironment(environment);
        }

        assertThat(adjudicator.determineWinner(environment), is(agentWhite));
    }

    /**
     * @return a new adjudicator.
     */
    private ReversiAdjudicator createAdjudicator()
    {
        final ReversiActionGenerator actionGenerator = new ReversiActionGenerator();

        return new ReversiAdjudicator(actionGenerator);
    }

    /**
     * @param team Team.
     * 
     * @return a new agent.
     */
    private DefaultAgent createAgent(final ReversiTeam team)
    {
        return new DefaultAgent(team.getName(), team.getName(), team);
    }

    /**
     * @return a new environment.
     */
    private ReversiEnvironment createEnvironment()
    {
        final List<Agent> agents = new ArrayList<Agent>();

        agents.add(createAgent(ReversiTeam.BLACK));
        agents.add(createAgent(ReversiTeam.WHITE));

        final ReversiEnvironment answer = new ReversiEnvironment();

        answer.placeInitialTokens(agents);

        return answer;
    }

    /**
     * @param environment Environment.
     */
    private void printEnvironment(final ReversiEnvironment environment)
    {
        System.out.println(environment);
        final int blackCount = environment.getTokenCountFor(ReversiTeam.BLACK);
        final int whiteCount = environment.getTokenCountFor(ReversiTeam.WHITE);
        final String message = blackCount + " to " + whiteCount;
        System.out.println(StringUtils.center(message, 19));
    }
}

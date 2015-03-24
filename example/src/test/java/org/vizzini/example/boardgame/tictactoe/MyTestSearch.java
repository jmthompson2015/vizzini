package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.core.TimePrinter;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.boardgame.Search;

/**
 * Provides tests for implementations of the <code>Search</code> interface.
 */
public abstract class MyTestSearch
{
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
    public void searchDepth1OWins()
    {
        // Setup.
        final int maxPlies = 1;
        final TTTSearchAgent agentO = createSearchAgent(TTTTeam.O, maxPlies);
        final SimpleAgent agentX = createSimpleAgent(TTTTeam.X);
        final TTTEnvironment environment = createEnvironmentDepthOne(agentX, agentO);
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentO, agentX, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.c1));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentO));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth1XWins()
    {
        // Setup.
        final int maxPlies = 1;
        final TTTSearchAgent agentX = createSearchAgent(TTTTeam.X, maxPlies);
        final SimpleAgent agentO = createSimpleAgent(TTTTeam.O);
        final TTTEnvironment environment = createEnvironmentDepthOne(agentX, agentO);
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentX, agentO, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.c1));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth2OBlocks()
    {
        // Setup.
        final SimpleAgent agentX = createSimpleAgent(TTTTeam.X);
        final int maxPlies = 2;
        final TTTSearchAgent agentO = createSearchAgent(TTTTeam.O, maxPlies);
        final TTTEnvironment environment = new TTTEnvironment();
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentX);
        agents.add(agentO);
        environment.placeInitialTokens(agents);
        final TTTToken tokenX = TTTToken.X.withAgent(agentX);
        final TTTToken tokenO = TTTToken.O.withAgent(agentO);
        environment.placeToken(TTTPosition.b2, tokenX);
        environment.placeToken(TTTPosition.a1, tokenO);
        environment.placeToken(TTTPosition.b1, tokenX);
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentO, agentX, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.b3));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentO));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth2OWins()
    {
        // Setup.
        final int maxPlies = 2;
        final TTTSearchAgent agentO = createSearchAgent(TTTTeam.O, maxPlies);
        final SimpleAgent agentX = createSimpleAgent(TTTTeam.X);
        final TTTEnvironment environment = createEnvironmentDepthOne(agentX, agentO);
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentO, agentX, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.c1));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentO));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth2XWins()
    {
        // Setup.
        final int maxPlies = 2;
        final TTTSearchAgent agentX = createSearchAgent(TTTTeam.X, maxPlies);
        final SimpleAgent agentO = createSimpleAgent(TTTTeam.O);
        final TTTEnvironment environment = createEnvironmentDepthOne(agentX, agentO);
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentX, agentO, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.c1));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth3EmptyBoard()
    {
        // Setup.
        final int maxPlies = 3;
        final TTTSearchAgent agentX = createSearchAgent(TTTTeam.X, maxPlies);
        final SimpleAgent agentO = createSimpleAgent(TTTTeam.O);
        final TTTEnvironment environment = new TTTEnvironment();
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentX, agentO, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.b2));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth3OBlocks()
    {
        // Setup.
        final SimpleAgent agentX = createSimpleAgent(TTTTeam.X);
        final int maxPlies = 3;
        final TTTSearchAgent agentO = createSearchAgent(TTTTeam.O, maxPlies);
        final TTTEnvironment environment = new TTTEnvironment();
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentX);
        agents.add(agentO);
        environment.placeInitialTokens(agents);
        final TTTToken tokenX = TTTToken.X.withAgent(agentX);
        final TTTToken tokenO = TTTToken.O.withAgent(agentO);
        environment.placeToken(TTTPosition.b2, tokenX);
        environment.placeToken(TTTPosition.a1, tokenO);
        environment.placeToken(TTTPosition.b1, tokenX);
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentO, agentX, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.b3));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentO));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth3OWins()
    {
        // Setup.
        final int maxPlies = 3;
        final SimpleAgent agentX = createSimpleAgent(TTTTeam.X);
        final TTTSearchAgent agentO = createSearchAgent(TTTTeam.O, maxPlies);
        final TTTEnvironment environment = new TTTEnvironment();
        environment.placeToken(TTTPosition.a1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b2, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.c3, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b1, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.a3, TTTToken.X.withAgent(agentX));
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentO, agentX, maxPlies);

        // Verify.
        assertNotNull(result);
        assertThat(result.getPosition(), is(TTTPosition.b3));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentO));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth3XWins()
    {
        // Setup.
        final int maxPlies = 3;
        final TTTSearchAgent agentX = createSearchAgent(TTTTeam.X, maxPlies);
        final SimpleAgent agentO = createSimpleAgent(TTTTeam.O);
        final TTTEnvironment environment = new TTTEnvironment();
        environment.placeToken(TTTPosition.a3, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.a1, TTTToken.O.withAgent(agentO));
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentX, agentO, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.c3));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth4XWins()
    {
        // Setup.
        final int maxPlies = 4;
        final TTTSearchAgent agentX = createSearchAgent(TTTTeam.X, maxPlies);
        final SimpleAgent agentO = createSimpleAgent(TTTTeam.O);
        final TTTEnvironment environment = new TTTEnvironment();
        environment.placeToken(TTTPosition.a3, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.a1, TTTToken.O.withAgent(agentO));
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentX, agentO, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.c3));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth5EmptyBoard()
    {
        // Setup.
        final int maxPlies = 5;
        final TTTSearchAgent agentX = createSearchAgent(TTTTeam.X, maxPlies);
        final SimpleAgent agentO = createSimpleAgent(TTTTeam.O);
        final TTTEnvironment environment = new TTTEnvironment();
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentX, agentO, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.b2));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth5XWins()
    {
        // Setup.
        final int maxPlies = 5;
        final TTTSearchAgent agentX = createSearchAgent(TTTTeam.X, maxPlies);
        final SimpleAgent agentO = createSimpleAgent(TTTTeam.O);
        final TTTEnvironment environment = createEnvironmentDepthThree(agentX, agentO);
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentX, agentO, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.c1));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth6OBlocks()
    {
        // Setup.
        final SimpleAgent agentX = createSimpleAgent(TTTTeam.X);
        final int maxPlies = 6;
        final TTTSearchAgent agentO = createSearchAgent(TTTTeam.O, maxPlies);
        final TTTEnvironment environment = new TTTEnvironment();
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentX);
        agents.add(agentO);
        environment.placeInitialTokens(agents);
        final TTTToken tokenX = TTTToken.X.withAgent(agentX);
        final TTTToken tokenO = TTTToken.O.withAgent(agentO);
        environment.placeToken(TTTPosition.b2, tokenX);
        environment.placeToken(TTTPosition.a1, tokenO);
        environment.placeToken(TTTPosition.b1, tokenX);
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentO, agentX, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.b3));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentO));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth6OBlocks0()
    {
        // Setup.
        final SimpleAgent agentX = createSimpleAgent(TTTTeam.X);
        final int maxPlies = 6;
        final TTTSearchAgent agentO = createSearchAgent(TTTTeam.O, maxPlies);
        final TTTEnvironment environment = new TTTEnvironment();
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentX);
        agents.add(agentO);
        environment.placeInitialTokens(agents);
        final TTTToken tokenX = TTTToken.X.withAgent(agentX);
        final TTTToken tokenO = TTTToken.O.withAgent(agentO);
        environment.placeToken(TTTPosition.c1, tokenX);
        environment.placeToken(TTTPosition.b2, tokenO);
        environment.placeToken(TTTPosition.a3, tokenX);
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentO, agentX, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.b1));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentO));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth6OBlocks1()
    {
        // Setup.
        final SimpleAgent agentX = createSimpleAgent(TTTTeam.X);
        final int maxPlies = 6;
        final TTTSearchAgent agentO = createSearchAgent(TTTTeam.O, maxPlies);
        final TTTEnvironment environment = new TTTEnvironment();
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentX);
        agents.add(agentO);
        environment.placeInitialTokens(agents);
        final TTTToken tokenX = TTTToken.X.withAgent(agentX);
        final TTTToken tokenO = TTTToken.O.withAgent(agentO);
        environment.placeToken(TTTPosition.b2, tokenX);
        environment.placeToken(TTTPosition.a1, tokenO);
        environment.placeToken(TTTPosition.b1, tokenX);
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentO, agentX, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.b3));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentO));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth6OWins()
    {
        // Setup.
        final int maxPlies = 6;
        final SimpleAgent agentX = createSimpleAgent(TTTTeam.X);
        final TTTSearchAgent agentO = createSearchAgent(TTTTeam.O, maxPlies);
        final TTTEnvironment environment = new TTTEnvironment();
        environment.placeToken(TTTPosition.a1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b2, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.c3, TTTToken.X.withAgent(agentX));
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        TTTAction result = (TTTAction)search.search(environment, adjudicator, agentO, agentX, maxPlies);

        // Verify.
        assertNotNull(result);
        assertThat(result.getPosition(), is(TTTPosition.b1));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentO));

        environment.placeToken(TTTPosition.b1, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.a3, TTTToken.X.withAgent(agentX));

        // Run.
        result = (TTTAction)search.search(environment, adjudicator, agentO, agentX, 3);

        // Verify.
        assertNotNull(result);
        assertThat(result.getPosition(), is(TTTPosition.b3));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentO));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth6XWins()
    {
        // Setup.
        final int maxPlies = 6;
        final TTTSearchAgent agentX = createSearchAgent(TTTTeam.X, maxPlies);
        final SimpleAgent agentO = createSimpleAgent(TTTTeam.O);
        final TTTEnvironment environment = createEnvironmentDepthThree(agentX, agentO);
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentX, agentO, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.c1));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth7EmptyBoard()
    {
        // Setup.
        final int maxPlies = 7;
        final TTTSearchAgent agentX = createSearchAgent(TTTTeam.X, maxPlies);
        final SimpleAgent agentO = createSimpleAgent(TTTTeam.O);
        final TTTEnvironment environment = new TTTEnvironment();
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentX, agentO, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.b2));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth7XWins()
    {
        // Setup.
        final int maxPlies = 7;
        final TTTSearchAgent agentX = createSearchAgent(TTTTeam.X, maxPlies);
        final SimpleAgent agentO = createSimpleAgent(TTTTeam.O);
        final TTTEnvironment environment = createEnvironmentDepthThree(agentX, agentO);
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentX, agentO, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.c1));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchDepth9EmptyBoard()
    {
        final long start = System.currentTimeMillis();

        // Setup.
        final int maxPlies = 9;
        final TTTSearchAgent agentX = createSearchAgent(TTTTeam.X, maxPlies);
        final SimpleAgent agentO = createSimpleAgent(TTTTeam.O);
        final TTTEnvironment environment = new TTTEnvironment();
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentX, agentO, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.a1));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentX));
        assertThat(result.getEnvironment(), is(environment));

        final long end = System.currentTimeMillis();
        final TimePrinter timePrinter = new TimePrinter();
        System.out.println(timePrinter.formatElapsedTime("searchDepth9EmptyBoard()", start, end));
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchFullGame()
    {
        // Setup.
        final int maxPlies = 9;
        final TTTSearchAgent agentX = createSearchAgent(TTTTeam.X, maxPlies);
        final TTTSearchAgent agentO = createSearchAgent(TTTTeam.O, maxPlies);
        final TTTEnvironment environment = new TTTEnvironment();
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentX);
        agents.add(agentO);
        environment.placeInitialTokens(agents);
        final TTTAdjudicator adjudicator = createAdjudicator();

        final TTTPosition[] positions = { TTTPosition.a1, TTTPosition.b2, TTTPosition.b1, TTTPosition.c1, };

        for (int i = 0; i < positions.length; i++)
        {
            final Agent activeAgent = ((i % 2) == 0 ? agentX : agentO);
            final Agent opponent = (activeAgent == agentX ? agentO : agentX);

            // Run.
            final TTTAction result = (TTTAction)search
                    .search(environment, adjudicator, activeAgent, opponent, maxPlies);

            // Verify.
            assertNotNull(result);
            assertThat("i = " + i, result.getPosition(), is(positions[i]));
            assertThat("i = " + i, result.getAgent(), is(activeAgent));

            result.doIt();
            // System.out.println(environment);
        }
    }

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void searchMaxPliesNegative()
    {
        // Setup.
        final TTTSearchAgent agentX = createSearchAgent(TTTTeam.X, 1);
        final SimpleAgent agentO = createSimpleAgent(TTTTeam.O);
        final TTTEnvironment environment = createEnvironmentDepthOne(agentX, agentO);
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run / Verify.
        try
        {
            search.search(environment, adjudicator, agentX, agentO, -1);
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
        final TTTSearchAgent agentX = createSearchAgent(TTTTeam.X, 1);
        final SimpleAgent agentO = createSimpleAgent(TTTTeam.O);
        final TTTEnvironment environment = createEnvironmentDepthOne(agentX, agentO);
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run / Verify.
        try
        {
            search.search(environment, adjudicator, agentX, agentO, -1);
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
        final TTTSearchAgent agentX = createSearchAgent(TTTTeam.X, 1);
        final SimpleAgent agentO = createSimpleAgent(TTTTeam.O);
        final TTTEnvironment environment = createEnvironmentDepthOne(agentX, agentO);
        final TTTAdjudicator adjudicator = createAdjudicator();
        final int depth = 10;

        try
        {
            search.search(environment, adjudicator, null, agentO, depth);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("agent is null"));
        }

        try
        {
            search.search(environment, adjudicator, agentX, null, depth);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("opponent is null"));
        }

        try
        {
            search.search(null, adjudicator, agentX, agentO, depth);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("environment is null"));
        }

        try
        {
            search.search(environment, null, agentX, agentO, depth);
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
    public void searchOForTheWin()
    {
        // Setup.
        final SimpleAgent agentX = createSimpleAgent(TTTTeam.X);
        final int maxPlies = 4;
        final TTTSearchAgent agentO = createSearchAgent(TTTTeam.O, maxPlies);
        final TTTEnvironment environment = new TTTEnvironment();
        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(agentX);
        agents.add(agentO);
        environment.placeInitialTokens(agents);
        final TTTToken tokenX = TTTToken.X.withAgent(agentX);
        final TTTToken tokenO = TTTToken.O.withAgent(agentO);
        environment.placeToken(TTTPosition.a1, tokenX);
        environment.placeToken(TTTPosition.b2, tokenO);
        environment.placeToken(TTTPosition.c3, tokenX);
        environment.placeToken(TTTPosition.b1, tokenO);
        environment.placeToken(TTTPosition.a3, tokenX);
        final TTTAdjudicator adjudicator = createAdjudicator();

        // Run.
        final TTTAction result = (TTTAction)search.search(environment, adjudicator, agentO, agentX, maxPlies);

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertThat(position, is(TTTPosition.b3));
        assertThat((TTTSearchAgent)result.getAgent(), is(agentO));
        assertThat(result.getEnvironment(), is(environment));
    }

    /**
     * @return a new adjudicator.
     */
    protected TTTAdjudicator createAdjudicator()
    {
        final EnvironmentStringifier environmentStringifier = new EnvironmentStringifier();

        return new TTTAdjudicator(environmentStringifier);
    }

    /**
     * @param agentX Agent X.
     * @param agentO Agent O.
     * 
     * @return a new environment.
     */
    protected TTTEnvironment createEnvironmentDepthOne(final Agent agentX, final Agent agentO)
    {
        final TTTEnvironment environment = new TTTEnvironment();
        environment.placeToken(TTTPosition.a3, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.a1, TTTToken.O.withAgent(agentO));
        environment.placeToken(TTTPosition.CENTER, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.b1, TTTToken.O.withAgent(agentO));

        return environment;
    }

    /**
     * @param agentX Agent X.
     * @param agentO Agent O.
     * 
     * @return a new environment.
     */
    protected TTTEnvironment createEnvironmentDepthThree(final Agent agentX, final Agent agentO)
    {
        final TTTEnvironment environment = new TTTEnvironment();
        environment.placeToken(TTTPosition.a3, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.a1, TTTToken.O.withAgent(agentO));

        return environment;
    }

    /**
     * @param team Team.
     * @param maxPlies Maximum plies.
     * 
     * @return a new agent.
     */
    protected TTTSearchAgent createSearchAgent(final TTTTeam team, final int maxPlies)
    {
        return new TTTSearchAgent(team.getName(), team, search, maxPlies);
    }

    /**
     * @param team Team.
     * 
     * @return a new agent.
     */
    protected SimpleAgent createSimpleAgent(final TTTTeam team)
    {
        final TTTActionGenerator actionGenerator = new TTTActionGenerator();

        return new SimpleAgent(team.getName(), team, actionGenerator);
    }
}

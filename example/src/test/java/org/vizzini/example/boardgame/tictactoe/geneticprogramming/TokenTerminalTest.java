package org.vizzini.example.boardgame.tictactoe.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Context;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Function;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Terminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.boardgame.AlphaBetaSearch;
import org.vizzini.core.game.boardgame.Search;
import org.vizzini.example.boardgame.tictactoe.TTTActionGenerator;
import org.vizzini.example.boardgame.tictactoe.TTTEnvironment;
import org.vizzini.example.boardgame.tictactoe.TTTGameInjector;
import org.vizzini.example.boardgame.tictactoe.TTTPosition;
import org.vizzini.example.boardgame.tictactoe.TTTSearchAgent;
import org.vizzini.example.boardgame.tictactoe.TTTTeam;
import org.vizzini.example.boardgame.tictactoe.TTTToken;

/**
 * Provides tests for the <code>TokenTerminal</code> class.
 */
public final class TokenTerminalTest
{
    /** Converter. */
    private final Converter<Integer> converter = new Converter<Integer>(Integer.class);

    /**
     * Test the <code>copy()</code> method.
     */
    @Test
    public void copy()
    {
        // Setup.
        final TokenTerminal terminal = new TokenTerminal(converter, TTTPosition.c1);

        // Run.
        final TreeNode<Integer> result = terminal.copy();

        // Verify.
        assertNotNull(result);
        assertFalse(terminal == result);
        assertTrue(terminal.equals(result));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate()
    {
        // Setup.
        final Agent agentX = createAgentX();
        final Agent agentO = createAgentO();
        final TTTGameInjector injector = new TTTGameInjector();
        final TTTEnvironment environment = injector.injectEnvironment();
        environment.placeToken(TTTPosition.a1, TTTToken.X.withAgent(agentX));
        environment.placeToken(TTTPosition.CENTER, TTTToken.O.withAgent(agentO));
        final Context context = new TTTContext(environment, TTTTeam.X);
        final TokenTerminal terminal00 = new TokenTerminal(converter, TTTPosition.a1);
        final TokenTerminal terminal11 = new TokenTerminal(converter, TTTPosition.b2);
        final TokenTerminal terminal22 = new TokenTerminal(converter, TTTPosition.c3);

        assertThat(terminal00.evaluate(context), is(1));
        assertThat(terminal11.evaluate(context), is(-1));
        assertThat(terminal22.evaluate(context), is(0));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateEmptyBoard()
    {
        // Setup.
        final TokenTerminal terminal = new TokenTerminal(converter, TTTPosition.c1);
        final TTTGameInjector injector = new TTTGameInjector();
        final TTTEnvironment environment = injector.injectEnvironment();
        final Context context = new TTTContext(environment, TTTTeam.X);

        // Run.
        final Integer result = terminal.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(0));
    }

    /**
     * Test the <code>getPosition()</code> method.
     */
    @Test
    public void getPosition()
    {
        // Setup.
        final TokenTerminal terminal = new TokenTerminal(converter, TTTPosition.c1);

        // Run / Verify.
        assertThat(terminal.getPosition(), is(TTTPosition.c1));
    }

    /**
     * Test the <code>TokenTerminal()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final TTTPosition position = TTTPosition.c1;

        try
        {
            new TokenTerminal((Converter<Integer>)null, position);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("converter is null"));
        }

        try
        {
            new TokenTerminal(converter, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("position is null"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final TokenTerminal node0 = create0();
        final TokenTerminal node1 = create1();
        final TokenTerminal node2 = create0();

        assertTrue(node0.equals(node0));
        assertFalse(node0.equals(node1));
        assertTrue(node0.equals(node2));

        assertFalse(node1.equals(node0));
        assertTrue(node1.equals(node1));
        assertFalse(node1.equals(node2));

        assertTrue(node2.equals(node0));
        assertFalse(node2.equals(node1));
        assertTrue(node2.equals(node2));

        assertFalse(node0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final TokenTerminal node0 = create0();
        final TokenTerminal node1 = create1();
        final TokenTerminal node2 = create0();

        assertTrue(node0.hashCode() == node0.hashCode());
        assertFalse(node0.hashCode() == node1.hashCode());
        assertTrue(node0.hashCode() == node2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final Terminal<Integer> node0 = create0();

        final String result = node0.toString();

        assertNotNull(result);
        final String expected = "TokenTerminal[returnType=Integer,parent=<null>,symbol=token(b1),position=TTTPosition[index=1,name=b1,x=1,y=0]]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree node.
     */
    private TokenTerminal create0()
    {
        return new TokenTerminal(converter, TTTPosition.b1);
    }

    /**
     * @return a new tree node.
     */
    private TokenTerminal create1()
    {
        return new TokenTerminal(converter, TTTPosition.c1);
    }

    /**
     * @return a new agent.
     */
    private Agent createAgentO()
    {
        final Search search = new AlphaBetaSearch(new TTTActionGenerator(), createEvaluator());
        final int maxPlies = 3;

        return new TTTSearchAgent(TTTTeam.O.getName(), TTTTeam.O, search, maxPlies);
    }

    /**
     * @return a new agent.
     */
    private Agent createAgentX()
    {
        final Search search = new AlphaBetaSearch(new TTTActionGenerator(), createEvaluator());
        final int maxPlies = 3;

        return new TTTSearchAgent(TTTTeam.X.getName(), TTTTeam.X, search, maxPlies);
    }

    /**
     * @return a new environment evaluator.
     */
    private GPEnvironmentEvaluator createEvaluator()
    {
        final TTTProblem problem = new TTTProblem();
        final Function<Integer> function = problem.getSimpleSolution();

        return new GPEnvironmentEvaluator(function);
    }
}

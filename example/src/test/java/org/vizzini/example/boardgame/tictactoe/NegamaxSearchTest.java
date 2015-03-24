package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.core.game.boardgame.NegamaxSearch;
import org.vizzini.core.game.boardgame.Search;

/**
 * Provides tests for the <code>NegamaxSearch</code> class.
 */
public final class NegamaxSearchTest extends MyTestSearch
{
    /**
     * @return a new search.
     */
    private static Search createSearch()
    {
        final TTTActionGenerator actionGenerator = new TTTActionGenerator();
        final TTTEnvironmentEvaluator environmentEvaluator = new TTTEnvironmentEvaluator();

        return new NegamaxSearch(actionGenerator, environmentEvaluator);
    }

    /**
     * Construct this object.
     */
    public NegamaxSearchTest()
    {
        super(createSearch());
    }

    /**
     * Test the <code>NegamaxSearch()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        // Setup.
        final TTTActionGenerator actionGenerator = new TTTActionGenerator();
        final TTTEnvironmentEvaluator environmentEvaluator = new TTTEnvironmentEvaluator();

        try
        {
            new NegamaxSearch(null, environmentEvaluator);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("actionGenerator is null"));
        }

        try
        {
            new NegamaxSearch(actionGenerator, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("environmentEvaluator is null"));
        }
    }
}

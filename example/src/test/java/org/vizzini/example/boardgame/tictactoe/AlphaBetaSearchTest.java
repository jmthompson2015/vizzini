package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.core.game.boardgame.AlphaBetaSearch;
import org.vizzini.core.game.boardgame.Search;

/**
 * Provides tests for the <code>AlphaBetaSearch</code> class.
 */
public final class AlphaBetaSearchTest extends MyTestSearch
{
    /**
     * @return a new search.
     */
    private static Search createSearch()
    {
        final TTTActionGenerator actionGenerator = new TTTActionGenerator();
        final TTTEnvironmentEvaluator environmentEvaluator = new TTTEnvironmentEvaluator();

        return new AlphaBetaSearch(actionGenerator, environmentEvaluator);
    }

    /**
     * Construct this object.
     */
    public AlphaBetaSearchTest()
    {
        super(createSearch());
    }

    /**
     * Test the <code>AlphaBetaSearch()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        // Setup.
        final TTTActionGenerator actionGenerator = new TTTActionGenerator();
        final TTTEnvironmentEvaluator environmentEvaluator = new TTTEnvironmentEvaluator();

        try
        {
            new AlphaBetaSearch(null, environmentEvaluator);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("actionGenerator is null"));
        }

        try
        {
            new AlphaBetaSearch(actionGenerator, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("environmentEvaluator is null"));
        }
    }
}

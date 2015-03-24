package org.vizzini.example.boardgame.reversi;

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
        final ReversiActionGenerator actionGenerator = new ReversiActionGenerator();
        final ReversiEnvironmentEvaluator environmentEvaluator = new ReversiEnvironmentEvaluator();

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
        final ReversiActionGenerator actionGenerator = new ReversiActionGenerator();
        final ReversiEnvironmentEvaluator environmentEvaluator = new ReversiEnvironmentEvaluator();

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

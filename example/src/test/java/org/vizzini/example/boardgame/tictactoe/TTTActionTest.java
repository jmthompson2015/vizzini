package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>TTTAction</code> class.
 */
public final class TTTActionTest
{
    /**
     * Test the <code>TTTAction()</code> method.
     */
    @Test
    public void testConstructor()
    {
        final TTTGameInjector injector = new TTTGameInjector();
        final TTTEnvironment environment = injector.injectEnvironment();

        // Run.
        final TTTAction result = new TTTAction(environment, TTTPosition.b3, TTTToken.X);

        // Verify.
        assertThat(result.getEnvironment(), is(environment));
        assertThat(result.getPosition(), is(TTTPosition.b3));
        assertThat(result.getToken(), is(TTTToken.X));
    }

    /**
     * Test the <code>TTTAction()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final TTTGameInjector injector = new TTTGameInjector();
        final TTTEnvironment environment = injector.injectEnvironment();

        try
        {
            new TTTAction(null, TTTPosition.b3, TTTToken.X);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("environment is null"));
        }

        try
        {
            new TTTAction(environment, null, TTTToken.X);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("position is null"));
        }

        try
        {
            new TTTAction(environment, TTTPosition.b3, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("token is null"));
        }
    }
}

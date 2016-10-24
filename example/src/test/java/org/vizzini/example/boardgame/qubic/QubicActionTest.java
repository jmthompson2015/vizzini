package org.vizzini.example.boardgame.qubic;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>QubicAction</code> class.
 */
public final class QubicActionTest
{
    /**
     * Test the <code>QubicAction()</code> method.
     */
    @Test
    public void testConstructor()
    {
        final QubicGameInjector injector = new QubicGameInjector();
        final QubicEnvironment environment = injector.injectEnvironment();

        // Run.
        final QubicAction result = new QubicAction(environment, QubicPosition.a2A, QubicToken.X);

        // Verify.
        assertThat(result.getEnvironment(), is(environment));
        assertThat(result.getPosition(), is(QubicPosition.a2A));
        assertThat(result.getToken(), is(QubicToken.X));
    }

    /**
     * Test the <code>QubicAction()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final QubicGameInjector injector = new QubicGameInjector();
        final QubicEnvironment environment = injector.injectEnvironment();

        try
        {
            new QubicAction(null, QubicPosition.a2A, QubicToken.X);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("environment is null"));
        }

        try
        {
            new QubicAction(environment, null, QubicToken.X);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("position is null"));
        }

        try
        {
            new QubicAction(environment, QubicPosition.a2A, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("token is null"));
        }
    }
}

package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.Iterator;
import java.util.Set;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultContext</code> class.
 */
public final class DefaultContextTest
{
    /**
     * Test the <code>getVariable()</code> method.
     */
    @Test
    public void getVariable()
    {
        // Setup.
        final Context context = new DefaultContext();
        context.putVariable("x", 1.0);
        context.putVariable("y", 2.0);

        {
            // Run.
            final Double result = (Double)context.getVariable("x");

            // Verify.
            assertNotNull(result);
            assertThat(result, is(1.0));
        }

        {
            // Run.
            final Double result = (Double)context.getVariable("y");

            // Verify.
            assertNotNull(result);
            assertThat(result, is(2.0));
        }
    }

    /**
     * Test the <code>getVariableNames()</code> method.
     */
    @Test
    public void getVariableNames()
    {
        // Setup.
        final Context context = new DefaultContext();
        context.putVariable("x", 1.0);
        context.putVariable("y", 2.0);

        // Run.
        final Set<String> result = context.getVariableNames();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));
        final Iterator<String> iter = result.iterator();
        assertThat(iter.next(), is("x"));
        assertThat(iter.next(), is("y"));
    }
}

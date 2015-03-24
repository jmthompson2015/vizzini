package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>Example</code> class.
 */
public final class ExampleTest
{
    /** Appliance example. */
    private final Example example0 = new Example(new double[] { 0.1, 0.2 }, new double[] { 1.0, 2.0 });

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final String result = example0.toString();

        final String expected = "org.vizzini.ai.neuralnetwork.Example [inputs=[0.1, 0.2],outputs=[1.0, 2.0]]";
        assertThat(result, is(expected));
    }
}

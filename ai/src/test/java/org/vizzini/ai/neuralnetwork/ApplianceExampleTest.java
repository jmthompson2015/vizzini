package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>ApplianceExample</code> class.
 */
public final class ApplianceExampleTest
{
    /** Appliance example. */
    private final ApplianceExample<double[], double[]> example0 = new ApplianceExample<double[], double[]>(
            new double[] { 0.1, 0.2 }, new double[] { 1.0, 2.0 });

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final String result = example0.toString();

        final String expected = "org.vizzini.ai.neuralnetwork.ApplianceExample [input=[ 0.1,  0.2],output=[ 1.0,  2.0]]";
        assertThat(result, is(expected));
    }
}

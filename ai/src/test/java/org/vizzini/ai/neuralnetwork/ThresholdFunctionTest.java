package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.vizzini.ai.neuralnetwork.ActivationFunction;
import org.vizzini.ai.neuralnetwork.ThresholdFunction;

/**
 * Provides unit tests for the <code>ThresholdFunction</code> class.
 */
public final class ThresholdFunctionTest
{
    /** Delta. */
    private static final double DELTA = 1.0e-3;

    /** Function. */
    private ActivationFunction function0;

    /** Function. */
    private ActivationFunction function1;

    /**
     * Test the <code>calcDerivative()</code> method.
     */
    @Test
    public void calcDerivative()
    {
        assertEquals(0.0, function0.calcDerivative(0.0), DELTA);
        assertEquals(0.0, function0.calcDerivative(-10.0), DELTA);
        assertEquals(0.0, function0.calcDerivative(10.0), DELTA);
    }

    /**
     * Test the <code>calculate()</code> method.
     */
    @Test
    public void calculate()
    {
        assertEquals(0.0, function0.calculate(0.0), DELTA);
        assertEquals(0.0, function0.calculate(-10.0), DELTA);
        assertEquals(1.0, function0.calculate(10.0), DELTA);
    }

    /**
     * Test the <code>getMaximum()</code> method.
     */
    @Test
    public void getMaximum()
    {
        assertThat(function0.getMaximum(), is(1.0));
    }

    /**
     * Test the <code>getMinimum()</code> method.
     */
    @Test
    public void getMinimum()
    {
        assertThat(function0.getMinimum(), is(0.0));
    }

    /**
     * Set up the test.
     */
    @Before
    public void setUp()
    {
        function0 = new ThresholdFunction();
        function1 = new ThresholdFunction();
    }

    /**
     * Tear down the test.
     */
    @After
    public void tearDown()
    {
        function0 = null;
        function1 = null;
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        assertTrue(function0.equals(function0));
        assertTrue(function0.equals(function1));

        assertTrue(function1.equals(function0));
        assertTrue(function1.equals(function1));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        assertTrue(function0.hashCode() == function0.hashCode());
        assertTrue(function0.hashCode() == function1.hashCode());

        assertTrue(function1.hashCode() == function0.hashCode());
        assertTrue(function1.hashCode() == function1.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        assertThat(function0.toString(), is(function0.toString()));
        assertThat(function0.toString(), is(function1.toString()));

        assertThat(function1.toString(), is(function0.toString()));
        assertThat(function1.toString(), is(function1.toString()));
    }
}

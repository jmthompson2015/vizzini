package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * Provides tests for the <code>DefaultLayer</code> class.
 */
public final class DefaultLayerTest
{
    /** Flag indicating whether test output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Layer name. */
    private static final String LAYER_NAME0 = "input";

    /** Node count. */
    private static final int NODE_COUNT0 = 3;

    /** Layer name. */
    private static final String LAYER_NAME1 = "output";

    /** Node count. */
    private static final int NODE_COUNT1 = 12;

    /** Layer. */
    private Layer layer0;

    /** Layer. */
    private Layer layer1;

    /**
     * Test the <code>getActivationFunction()</code> method.
     */
    @Test
    public void getActivationFunction()
    {
        assertNotNull(layer0.getActivationFunction());
    }

    /**
     * Test the <code>isBiasNodeUsed()</code> method.
     */
    @Test
    public void isBiasNodeUsed()
    {
        assertTrue(layer0.isBiasNodeUsed());
    }

    /**
     * Set up the test.
     */
    @Before
    public void setUp()
    {
        layer0 = new DefaultLayer(LAYER_NAME0, NODE_COUNT0, new SigmoidFunction(), true);
        layer1 = new DefaultLayer(LAYER_NAME1, NODE_COUNT1, new PassThroughFunction(), false);
    }

    /**
     * Tear down the test.
     */
    @After
    public void tearDown()
    {
        layer0 = null;
        layer1 = null;
    }

    /**
     * Test the constructor method.
     */
    @Test
    public void testConstructor0()
    {
        assertEquals(LAYER_NAME0, layer0.getName());
        assertEquals(NODE_COUNT0 + 1, layer0.getNodeCount());
    }

    /**
     * Test the constructor method.
     */
    @Test
    public void testConstructor1()
    {
        assertEquals(LAYER_NAME1, layer1.getName());
        assertEquals(NODE_COUNT1, layer1.getNodeCount());
    }

    /**
     * Test the constructor method.
     */
    @Test
    public void testConstructorNull()
    {
        final boolean isBiasNodeUsed = false;

        try
        {
            new DefaultLayer(null, 0, null, isBiasNodeUsed);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new DefaultLayer("", 0, null, isBiasNodeUsed);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new DefaultLayer("error", 0, null, isBiasNodeUsed);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("nodeCount <= 0"));
        }

        try
        {
            new DefaultLayer("error", 1, null, isBiasNodeUsed);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("function is null"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        assertTrue(layer0.equals(layer0));
        assertFalse(layer0.equals(layer1));

        assertFalse(layer1.equals(layer0));
        assertTrue(layer1.equals(layer1));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        assertTrue(layer0.hashCode() == layer0.hashCode());
        assertFalse(layer0.hashCode() == layer1.hashCode());

        assertFalse(layer1.hashCode() == layer0.hashCode());
        assertTrue(layer1.hashCode() == layer1.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString0()
    {
        final String expected = "org.vizzini.ai.neuralnetwork.DefaultLayer input";
        final String result = layer0.toString();
        assertNotNull(result);
        assertEquals(expected, result);
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString1()
    {
        final String expected = "org.vizzini.ai.neuralnetwork.DefaultLayer output";
        final String result = layer1.toString();
        assertNotNull(result);
        assertEquals(expected, result);
    }

    /**
     * Test the <code>toDetailString()</code> method.
     */
    @Test
    public void toDetailString0()
    {
        final String result = layer0.toDetailString();

        assertNotNull(result);
        final String expected = "org.vizzini.ai.neuralnetwork.DefaultLayer [activationFunction=org.vizzini.ai.neuralnetwork.SigmoidFunction,biasNodeUsed=true,inputs=[  0.0000,   0.0000,   0.0000,   0.0000],maxValueIndex=0,name=input,nodeCount=4,outputs=[  0.0000,   0.0000,   0.0000,   0.0000]]";

        if (IS_VERBOSE)
        {
            System.out.println("expected = " + expected);
            System.out.println("result   = " + result);
        }

        assertEquals(expected, result);
    }

    /**
     * Test the <code>toDetailString()</code> method.
     */
    @Test
    public void toDetailString1()
    {
        final String result = layer1.toDetailString();

        assertNotNull(result);
        final String expected = "org.vizzini.ai.neuralnetwork.DefaultLayer [activationFunction=org.vizzini.ai.neuralnetwork.PassThroughFunction,biasNodeUsed=false,inputs=[  0.0000,   0.0000,   0.0000,   0.0000,   0.0000,   0.0000,   0.0000,   0.0000,   0.0000,   0.0000,   0.0000,   0.0000],maxValueIndex=0,name=output,nodeCount=12,outputs=[  0.0000,   0.0000,   0.0000,   0.0000,   0.0000,   0.0000,   0.0000,   0.0000,   0.0000,   0.0000,   0.0000,   0.0000]]";

        if (IS_VERBOSE)
        {
            System.out.println("expected = " + expected);
            System.out.println("result   = " + result);
        }

        assertEquals(expected, result);
    }
}

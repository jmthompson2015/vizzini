package org.vizzini.ai.neuralnetwork;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * Provides unit tests for the <code>Connector</code> class.
 */
public final class DefaultConnectorTest
{
    /** First layer name. */
    private static final String LAYER_NAME0 = "input";

    /** First node count. */
    private static final int NODE_COUNT0 = 2;

    /** First layer. */
    private static final Layer LAYER0 = new DefaultLayer(LAYER_NAME0, NODE_COUNT0, new PassThroughFunction(), true);

    /** Second layer. */
    private static final String LAYER_NAME1 = "output";

    /** Second node count. */
    private static final int NODE_COUNT1 = 1;

    /** Second layer. */
    private static final Layer LAYER1 = new DefaultLayer(LAYER_NAME1, NODE_COUNT1, new SigmoidFunction(), false);

    /** First connector. */
    private Connector connector0;

    /**
     * Test the <code>fillWeights()</code> method.
     */
    @Test
    public void fillWeights()
    {
        final double value = 0.123;
        connector0.fillWeights(value);

        final int nodeCount0 = LAYER0.getNodeCount();

        for (int i = 0; i < nodeCount0; i++)
        {
            final int nodeCount1 = LAYER1.getNodeCount();

            for (int j = 0; j < nodeCount1; j++)
            {
                assertEquals(value, connector0.getWeight(i, j), 0.0);
            }
        }
    }

    /**
     * Test the <code>randomizeWeights()</code> method.
     */
    @Test
    public void randomizeWeights()
    {
        connector0.fillWeights(10.0);

        connector0.randomizeWeights();

        final int nodeCount0 = LAYER0.getNodeCount();

        for (int i = 0; i < nodeCount0; i++)
        {
            final int nodeCount1 = LAYER1.getNodeCount();

            for (int j = 0; j < nodeCount1; j++)
            {
                final double weight = connector0.getWeight(i, j);

                assertTrue((-0.1 <= weight) && (weight <= 0.1));
            }
        }
    }

    /**
     * Set up the test.
     */
    @Before
    public void setUp()
    {
        connector0 = new DefaultConnector(LAYER0, LAYER1);
    }

    /**
     * Test the <code>setWeight()</code> method.
     */
    @Test
    public void setWeight()
    {
        final int i = 1;
        final int j = 0;
        assertEquals(0.0, connector0.getWeight(i, j), 0.0);

        final double weight = 2.34;
        connector0.setWeight(i, j, weight);
        assertEquals(weight, connector0.getWeight(i, j), 0.0);
    }

    /**
     * Tear down the test.
     */
    @After
    public void tearDown()
    {
        connector0 = null;
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        assertTrue(connector0.equals(connector0));

        final Connector connector = new DefaultConnector(LAYER0, LAYER1);
        assertTrue(connector0.equals(connector));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        assertTrue(connector0.hashCode() == connector0.hashCode());

        final Connector connector = new DefaultConnector(LAYER0, LAYER1);
        assertTrue(connector0.hashCode() == connector.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final String lineSeparator = System.getProperty("line.separator");
        final String expected = "org.vizzini.ai.neuralnetwork.DefaultConnector[fromLayer=org.vizzini.ai.neuralnetwork.DefaultLayer input,"
                + lineSeparator
                + "weights=[[0.0][0.0][0.0]],"
                + lineSeparator
                + "toLayer=org.vizzini.ai.neuralnetwork.DefaultLayer output]";
        final String result = connector0.toString();
        assertEquals(expected, result);
    }

    /**
     * Test the <code>zeroWeights()</code> method.
     */
    @Test
    public void zeroWeights()
    {
        connector0.zeroWeights();

        final int nodeCount0 = LAYER0.getNodeCount();

        for (int i = 0; i < nodeCount0; i++)
        {
            final int nodeCount1 = LAYER1.getNodeCount();

            for (int j = 0; j < nodeCount1; j++)
            {
                assertEquals(0.0, connector0.getWeight(i, j), 0.0);
            }
        }
    }
}

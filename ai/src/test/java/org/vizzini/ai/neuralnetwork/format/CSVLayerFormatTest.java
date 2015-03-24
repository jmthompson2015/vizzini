package org.vizzini.ai.neuralnetwork.format;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.ai.neuralnetwork.DefaultLayer;
import org.vizzini.ai.neuralnetwork.Layer;
import org.vizzini.ai.neuralnetwork.SigmoidFunction;

/**
 * Provides tests for the <code>CSVLayerFormat</code> class.
 */
public final class CSVLayerFormatTest
{
    /** Formatter. */
    private final LayerFormat formatter = new CSVLayerFormat();

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void format()
    {
        final Layer layer = new DefaultLayer("input", 3, new SigmoidFunction(), false);
        final String result = formatter.format(layer);

        assertNotNull(result);
        final String expected = "org.vizzini.ai.neuralnetwork.DefaultLayer, input, 3, SigmoidFunction, false";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatBiasNode()
    {
        final Layer layer = new DefaultLayer("input", 3, new SigmoidFunction(), true);
        final String result = formatter.format(layer);

        assertNotNull(result);
        final String expected = "org.vizzini.ai.neuralnetwork.DefaultLayer, input, 3, SigmoidFunction, true";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatNull()
    {
        final String result = formatter.format(null);
        assertNull(result);
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parse()
    {
        final Layer result = formatter
                .parse("org.vizzini.ai.neuralnetwork.DefaultLayer, input, 3, SigmoidFunction, false");

        assertNotNull(result);
        assertThat(result.getName(), is("input"));
        assertThat(result.getNodeCount(), is(3));
        assertThat(result.getActivationFunction(), is(SigmoidFunction.class));
        assertFalse(result.isBiasNodeUsed());
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseBiasNode()
    {
        final Layer result = formatter
                .parse("org.vizzini.ai.neuralnetwork.DefaultLayer, input, 3, SigmoidFunction, true");

        assertNotNull(result);
        assertThat(result.getName(), is("input"));
        assertThat(result.getNodeCount(), is(4));
        assertThat(result.getActivationFunction(), is(SigmoidFunction.class));
        assertTrue(result.isBiasNodeUsed());
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseNull()
    {
        final Layer result0 = formatter.parse(null);
        assertNull(result0);

        final Layer result1 = formatter.parse("");
        assertNull(result1);
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void roundTrip()
    {
        final Layer layer = new DefaultLayer("input", 3, new SigmoidFunction(), false);
        final String result0 = formatter.format(layer);
        final Layer result1 = formatter.parse(result0);
        final String result2 = formatter.format(result1);
        assertTrue(result1.equals(layer));
        assertThat(result2, is(result0));
    }
}

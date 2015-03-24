package org.vizzini.ai.neuralnetwork.format;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.ai.neuralnetwork.Connector;
import org.vizzini.ai.neuralnetwork.DefaultConnector;
import org.vizzini.ai.neuralnetwork.DefaultLayer;
import org.vizzini.ai.neuralnetwork.Layer;
import org.vizzini.ai.neuralnetwork.SigmoidFunction;

/**
 * Provides tests for the <code>CSVConnectorFormat</code> class.
 */
public final class CSVConnectorFormatTest
{
    /** Layer. */
    private static final Layer LAYER0 = new DefaultLayer("input", 3, new SigmoidFunction(), false);

    /** Layer. */
    private static final Layer LAYER1 = new DefaultLayer("output", 4, new SigmoidFunction(), false);

    /** Layers. */
    private static final List<Layer> LAYERS = new ArrayList<Layer>();

    static
    {
        LAYERS.add(LAYER0);
        LAYERS.add(LAYER1);
    }

    /** Formatter. */
    private final ConnectorFormat formatter = new CSVConnectorFormat(LAYERS);

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void format()
    {
        final Connector connector = create();
        final String result = formatter.format(connector);

        assertNotNull(result);
        final String expected = "org.vizzini.ai.neuralnetwork.DefaultConnector, input, output, [0.0, 1.0, 2.0, 3.0], [4.0, 5.0, 6.0, 7.0], [8.0, 9.0, 10.0, 11.0], ";
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
        final Connector result = formatter
                .parse("org.vizzini.ai.neuralnetwork.DefaultConnector, input, output, [0.0, 1.0, 2.0, 3.0], [4.0, 5.0, 6.0, 7.0], [8.0, 9.0, 10.0, 11.0], ");

        assertNotNull(result);
        assertThat(result.getFromLayer(), is(LAYER0));
        assertThat(result.getToLayer(), is(LAYER1));

        assertThat(result.getWeight(0, 0), is(0.0));
        assertThat(result.getWeight(0, 1), is(1.0));
        assertThat(result.getWeight(0, 2), is(2.0));
        assertThat(result.getWeight(0, 3), is(3.0));

        assertThat(result.getWeight(1, 0), is(4.0));
        assertThat(result.getWeight(1, 1), is(5.0));
        assertThat(result.getWeight(1, 2), is(6.0));
        assertThat(result.getWeight(1, 3), is(7.0));

        assertThat(result.getWeight(2, 0), is(8.0));
        assertThat(result.getWeight(2, 1), is(9.0));
        assertThat(result.getWeight(2, 2), is(10.0));
        assertThat(result.getWeight(2, 3), is(11.0));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseNull()
    {
        final Connector result0 = formatter.parse(null);
        assertNull(result0);

        final Connector result1 = formatter.parse("");
        assertNull(result1);
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void roundTrip()
    {
        final Connector connector = create();
        final String result0 = formatter.format(connector);
        final Connector result1 = formatter.parse(result0);
        final String result2 = formatter.format(result1);
        assertTrue(result1.equals(connector));
        assertThat(result2, is(result0));
    }

    /**
     * Test the <code>CSVConnectorFormat()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new CSVConnectorFormat(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("layers is null"));
        }

        try
        {
            new CSVConnectorFormat(new ArrayList<Layer>());
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("layers is empty"));
        }
    }

    /**
     * @return a new connector.
     */
    private Connector create()
    {
        final Connector answer = new DefaultConnector(LAYER0, LAYER1);

        final int fromCount = LAYER0.getNodeCount();
        final int toCount = LAYER1.getNodeCount();

        for (int i = 0; i < fromCount; i++)
        {
            for (int j = 0; j < toCount; j++)
            {
                final double weight = j + (i * toCount);
                answer.setWeight(i, j, weight);
            }
        }

        return answer;
    }
}

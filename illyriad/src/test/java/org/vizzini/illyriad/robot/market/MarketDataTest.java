package org.vizzini.illyriad.robot.market;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.illyriad.ProductBuilder;
import org.vizzini.illyriad.ResourceProduct;
import org.vizzini.illyriad.ResourceProductCollection;

/**
 * Provides tests for the <code>MarketData</code> class.
 */
public final class MarketDataTest
{
    /** Resource product collection. */
    private final ResourceProductCollection products = new ProductBuilder().build().getProductCollection();

    /**
     * Test the <code>MarketData()</code> method.
     */
    @Test
    public void testConstructor()
    {
        final ResourceProduct product = products.findByName("Hides");
        final String askPrice = "1";
        final String bidPrice = "2";

        final MarketData result = new MarketData(product, askPrice, bidPrice);

        assertThat(result.getProduct(), is(product));
        assertThat(result.getAskPrice(), is(askPrice));
        assertThat(result.getBidPrice(), is(bidPrice));
    }

    /**
     * Test the <code>MarketData()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final ResourceProduct product = products.findByName("Hides");
        final String askPrice = "1";
        final String bidPrice = "2";

        try
        {
            new MarketData(null, askPrice, bidPrice);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("product is null"));
        }

        try
        {
            new MarketData(product, null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("askPrice and bidPrice are both null or empty"));
        }

        try
        {
            new MarketData(product, "", null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("askPrice and bidPrice are both null or empty"));
        }

        try
        {
            new MarketData(product, null, "");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("askPrice and bidPrice are both null or empty"));
        }

        try
        {
            new MarketData(product, "", "");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("askPrice and bidPrice are both null or empty"));
        }
    }
}

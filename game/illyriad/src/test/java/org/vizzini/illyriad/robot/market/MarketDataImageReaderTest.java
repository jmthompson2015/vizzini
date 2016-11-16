package org.vizzini.illyriad.robot.market;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.io.File;
import java.net.URL;
import java.util.List;

import org.junit.Test;
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.ProductBuilder;
import org.vizzini.illyriad.ResourceProductCollection;

/**
 * Provides tests for the <code>MarketDataImageReader</code> class.
 */
public final class MarketDataImageReaderTest
{
    /** User directory. */
    public static final File USER_DIR;

    static
    {
        final FileUtilities fileUtils = new FileUtilities();
        String userDir = fileUtils.getUserDir();

        final String key = "/illyriad";

        if (userDir.endsWith(key))
        {
            userDir = userDir.substring(0, userDir.length() - key.length());
        }

        USER_DIR = new File(userDir);

        System.out.println("USER_DIR = [" + USER_DIR + "]");
    }

    /** Resource product collection. */
    private final ResourceProductCollection products = new ProductBuilder().build().getProductCollection();

    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void read()
    {
        final File directory = new File(USER_DIR, "illyriad/src/test/resources/marketData/capturedImages");
        final MarketDataImageReader reader = new MarketDataImageReader(products);

        final List<MarketDataImage> result = reader.read(directory);

        assertNotNull(result);
        assertThat(result.size(), is(12));

        verifyMarketDataImageNoBid(result.get(0), "Air Salt");
        verifyMarketDataImageNoBid(result.get(1), "Arctic Bow");
        verifyMarketDataImageNoAsk(result.get(2), "Battle Sword");
        verifyMarketDataImageNoAsk(result.get(3), "Bone Handled Sword");

        verifyMarketDataImageNoAsk(result.get(9), "Silversteel Sword");
        verifyMarketDataImageNoBid(result.get(10), "Steady Warhorse");
        verifyMarketDataImageNoAsk(result.get(11), "War Wolf");
    }

    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void readStringNull()
    {
        final MarketDataImageReader reader = new MarketDataImageReader(products);

        try
        {
            reader.read((String)null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("directory is null or empty"));
        }
    }

    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void readUrlArrayNull()
    {
        final MarketDataImageReader reader = new MarketDataImageReader(products);

        try
        {
            reader.read((URL[])null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("imageFiles is null"));
        }
    }

    /**
     * @param marketDataImage Market data image.
     * @param name Resource name.
     */
    private void verifyMarketDataImageNoAsk(final MarketDataImage marketDataImage, final String name)
    {
        assertNotNull(marketDataImage.getProduct());
        assertThat(marketDataImage.getProduct(), is(products.findByName(name)));
        assertNull("askImage", marketDataImage.getAskImage());
        assertNotNull("bidImage", marketDataImage.getBidImage());
    }

    /**
     * @param marketDataImage Market data image.
     * @param name Resource name.
     */
    private void verifyMarketDataImageNoBid(final MarketDataImage marketDataImage, final String name)
    {
        assertNotNull(marketDataImage.getProduct());
        assertThat(marketDataImage.getProduct(), is(products.findByName(name)));
        assertNotNull("askImage", marketDataImage.getAskImage());
        assertNull("bidImage", marketDataImage.getBidImage());
    }
}

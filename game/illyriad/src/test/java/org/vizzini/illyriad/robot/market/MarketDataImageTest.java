package org.vizzini.illyriad.robot.market;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.io.InputStream;

import org.junit.Test;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;
import org.vizzini.illyriad.ProductBuilder;
import org.vizzini.illyriad.ResourceProduct;
import org.vizzini.illyriad.ResourceProductCollection;

/**
 * Provides tests for the <code>MarketDataImage</code> class.
 */
public final class MarketDataImageTest
{
    /** Resource product collection. */
    private final ResourceProductCollection products = new ProductBuilder().build().getProductCollection();

    /**
     * Test the <code>MarketDataImage()</code> method.
     */
    @Test
    public void testConstructor()
    {
        final ResourceProduct product = products.findByName("Hides");
        final String askFilename = "someFile.png";
        final RobotImage askImage = getAskImage();
        final String bidFilename = "anotherFile.png";
        final RobotImage bidImage = getBidImage();

        final MarketDataImage result = new MarketDataImage(product, askFilename, askImage, bidFilename, bidImage);

        assertThat(result.getProduct(), is(product));
        assertThat(result.getAskFilename(), is(askFilename));
        assertNotNull(result.getAskImage());
        assertThat(result.getBidFilename(), is(bidFilename));
        assertNotNull(result.getBidImage());
    }

    /**
     * Test the <code>MarketDataImage()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final ResourceProduct product = products.findByName("Hides");
        final String askFilename = "someFile.png";
        final RobotImage askImage = getAskImage();
        final String bidFilename = "anotherFile.png";
        final RobotImage bidImage = getBidImage();

        try
        {
            new MarketDataImage(null, askFilename, askImage, bidFilename, bidImage);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("product is null"));
        }

        try
        {
            new MarketDataImage(product, null, askImage, bidFilename, bidImage);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("askFilename and askImage are inconsistent"));
        }

        try
        {
            new MarketDataImage(product, "", askImage, bidFilename, bidImage);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("askFilename and askImage are inconsistent"));
        }

        try
        {
            new MarketDataImage(product, askFilename, null, bidFilename, bidImage);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("askFilename and askImage are inconsistent"));
        }

        try
        {
            new MarketDataImage(product, askFilename, askImage, null, bidImage);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("bidFilename and bidImage are inconsistent"));
        }

        try
        {
            new MarketDataImage(product, askFilename, askImage, "", bidImage);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("bidFilename and bidImage are inconsistent"));
        }

        try
        {
            new MarketDataImage(product, askFilename, askImage, bidFilename, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("bidFilename and bidImage are inconsistent"));
        }
    }

    /**
     * @return a new robot image.
     */
    private RobotImage getAskImage()
    {
        final InputStream inputStream = getClass().getResourceAsStream("/WoodAsk20131010.png");
        final RobotImageIO imageIo = new RobotImageIO();

        return imageIo.read(inputStream);
    }

    /**
     * @return a new robot image.
     */
    private RobotImage getBidImage()
    {
        final InputStream inputStream = getClass().getResourceAsStream("/WoodBid20131010.png");
        final RobotImageIO imageIo = new RobotImageIO();

        return imageIo.read(inputStream);
    }
}

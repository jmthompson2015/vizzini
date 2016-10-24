package org.vizzini.ai.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.awt.Color;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultRobotColor</code> class.
 */
public final class DefaultRobotColorTest
{
    /**
     * Test the <code>compareTo()</code> method.
     */
    @Test
    public void compareTo()
    {
        final RobotColor color0 = DefaultRobotColor.WHITE;
        final RobotColor color1 = DefaultRobotColor.BLACK;
        final RobotColor color2 = new DefaultRobotColor(Color.WHITE);

        assertThat(color0.compareTo(color0), is(0));
        assertTrue(color0.compareTo(color1) > 0);
        assertThat(color0.compareTo(color2), is(0));

        assertFalse(color1.compareTo(color0) > 0);
        assertThat(color1.compareTo(color1), is(0));
        assertFalse(color1.compareTo(color2) > 0);

        assertThat(color2.compareTo(color0), is(0));
        assertTrue(color2.compareTo(color1) > 0);
        assertThat(color2.compareTo(color2), is(0));

        assertThat(DefaultRobotColor.RED.compareTo(DefaultRobotColor.RED), is(0));
        assertTrue(DefaultRobotColor.RED.compareTo(DefaultRobotColor.GREEN) > 0);
        assertTrue(DefaultRobotColor.RED.compareTo(DefaultRobotColor.BLUE) > 0);
        assertTrue(DefaultRobotColor.GREEN.compareTo(DefaultRobotColor.BLUE) > 0);
    }

    /**
     * Test the <code>getGray()</code> method.
     */
    @Test
    public void getGray()
    {
        assertThat(DefaultRobotColor.WHITE.getGray(), is(255));
        assertThat(DefaultRobotColor.YELLOW.getGray(), is(208));
        assertThat(DefaultRobotColor.CYAN.getGray(), is(208));
        assertThat(DefaultRobotColor.MAGENTA.getGray(), is(208));
        assertThat(DefaultRobotColor.SILVER.getGray(), is(191));
        assertThat(DefaultRobotColor.RED.getGray(), is(147));
        assertThat(DefaultRobotColor.GREEN.getGray(), is(147));
        assertThat(DefaultRobotColor.BLUE.getGray(), is(147));
        assertThat(DefaultRobotColor.GRAY.getGray(), is(128));
        assertThat(DefaultRobotColor.IRON.getGray(), is(63));
        assertThat(DefaultRobotColor.BLACK.getGray(), is(0));
    }

    /**
     * Test the <code>isDarkerThan()</code> method.
     */
    @Test
    public void isDarkerThan()
    {
        assertFalse(new DefaultRobotColor(Color.WHITE).isDarkerThan(DefaultRobotColor.BLACK));
        assertTrue(new DefaultRobotColor(Color.BLACK).isDarkerThan(DefaultRobotColor.WHITE));
        assertFalse(new DefaultRobotColor(Color.YELLOW).isDarkerThan(DefaultRobotColor.YELLOW));
        assertTrue(new DefaultRobotColor(1, 2, 3).isDarkerThan(new DefaultRobotColor(2, 3, 4)));

        final RobotColor color = new DefaultRobotColor(1, 2, 3, 4);
        assertFalse(new DefaultRobotColor(1, 2, 3, 4).isDarkerThan(color));
        assertTrue(new DefaultRobotColor(0, 2, 3, 4).isDarkerThan(color));
        assertTrue(new DefaultRobotColor(1, 0, 3, 4).isDarkerThan(color));
        assertTrue(new DefaultRobotColor(1, 2, 0, 4).isDarkerThan(color));
        assertTrue(new DefaultRobotColor(1, 2, 3, 0).isDarkerThan(color));
    }

    /**
     * Test the <code>isDarkerThan()</code> method.
     */
    @Test
    public void isDarkerThanNull()
    {
        assertFalse(new DefaultRobotColor(Color.WHITE).isDarkerThan(null));
        assertFalse(new DefaultRobotColor(Color.BLACK).isDarkerThan(null));
    }

    /**
     * Test the <code>isLighterThan()</code> method.
     */
    @Test
    public void isLighterThan()
    {
        assertTrue(new DefaultRobotColor(Color.WHITE).isLighterThan(DefaultRobotColor.BLACK));
        assertFalse(new DefaultRobotColor(Color.BLACK).isLighterThan(DefaultRobotColor.WHITE));
        assertFalse(new DefaultRobotColor(Color.YELLOW).isLighterThan(DefaultRobotColor.YELLOW));
        assertTrue(new DefaultRobotColor(2, 3, 4).isLighterThan(new DefaultRobotColor(1, 2, 3)));
    }

    /**
     * Test the <code>isLighterThan()</code> method.
     */
    @Test
    public void isLighterThanNull()
    {
        assertTrue(new DefaultRobotColor(Color.WHITE).isLighterThan(null));
        assertTrue(new DefaultRobotColor(Color.BLACK).isLighterThan(null));
    }

    /**
     * Test the <code>scale()</code> method.
     */
    @Test
    public void scaleAzure()
    {
        final RobotColor result = DefaultRobotColor.AZURE.scale(0.95);

        assertNotNull(result);
        assertThat("red", result.getRed(), is(0));
        assertThat("green", result.getGreen(), is(121));
        assertThat("blue", result.getBlue(), is(242));
    }

    /**
     * Test the <code>scale()</code> method.
     */
    @Test
    public void scaleDarkGreen()
    {
        final RobotColor result = DefaultRobotColor.DARK_GREEN.scale(0.95);

        assertNotNull(result);
        assertThat("red", result.getRed(), is(0));
        assertThat("green", result.getGreen(), is(121));
        assertThat("blue", result.getBlue(), is(0));
    }

    /**
     * Test the <code>scale()</code> method.
     */
    @Test
    public void scaleYellow()
    {
        final RobotColor result = DefaultRobotColor.YELLOW.scale(0.95);

        assertNotNull(result);
        assertThat("red", result.getRed(), is(242));
        assertThat("green", result.getGreen(), is(242));
        assertThat("blue", result.getBlue(), is(0));
    }

    /**
     * Test the <code>DefaultRobotColor()</code> method.
     */
    @Test
    public void testConstructorColor()
    {
        final Color color = Color.ORANGE;
        final RobotColor result = new DefaultRobotColor(color);

        assertNotNull(result);
        assertThat(result.getRed(), is(color.getRed()));
        assertThat(result.getGreen(), is(color.getGreen()));
        assertThat(result.getBlue(), is(color.getBlue()));
        assertThat(result.getAlpha(), is(color.getAlpha()));
    }

    /**
     * Test the <code>DefaultRobotColor()</code> method.
     */
    @Test
    public void testConstructorColorInterface()
    {
        final ColorInterface color = new DefaultColor(Color.ORANGE);
        final RobotColor result = new DefaultRobotColor(color);

        assertNotNull(result);
        assertThat(result.getRed(), is(color.getRed()));
        assertThat(result.getGreen(), is(color.getGreen()));
        assertThat(result.getBlue(), is(color.getBlue()));
        assertThat(result.getAlpha(), is(color.getAlpha()));
    }

    /**
     * Test the <code>DefaultRobotColor()</code> method.
     */
    @Test
    public void testConstructorColorInterfaceNull()
    {
        try
        {
            new DefaultRobotColor((ColorInterface)null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("color is null"));
        }
    }

    /**
     * Test the <code>DefaultRobotColor()</code> method.
     */
    @Test
    public void testConstructorColorNull()
    {
        try
        {
            new DefaultRobotColor((Color)null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("color is null"));
        }
    }

    /**
     * Test the <code>DefaultRobotColor()</code> method.
     */
    @Test
    public void testConstructorFourInts()
    {
        final RobotColor result = new DefaultRobotColor(1, 2, 3, 4);

        assertNotNull(result);
        assertThat(result.getRed(), is(1));
        assertThat(result.getGreen(), is(2));
        assertThat(result.getBlue(), is(3));
        assertThat(result.getAlpha(), is(4));
    }

    /**
     * Test the <code>DefaultRobotColor()</code> method.
     */
    @Test
    public void testConstructorInt()
    {
        final Color color = Color.ORANGE;
        final RobotColor result = new DefaultRobotColor(color.getRGB());

        assertNotNull(result);
        assertThat(result.getRed(), is(color.getRed()));
        assertThat(result.getGreen(), is(color.getGreen()));
        assertThat(result.getBlue(), is(color.getBlue()));
        assertThat(result.getAlpha(), is(color.getAlpha()));
    }

    /**
     * Test the <code>DefaultRobotColor()</code> method.
     */
    @Test
    public void testConstructorThreeInts()
    {
        final RobotColor result = new DefaultRobotColor(1, 2, 3);

        assertNotNull(result);
        assertThat(result.getRed(), is(1));
        assertThat(result.getGreen(), is(2));
        assertThat(result.getBlue(), is(3));
        assertThat(result.getAlpha(), is(255));
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final RobotColor color0 = DefaultRobotColor.WHITE;
        final RobotColor color1 = DefaultRobotColor.BLACK;
        final RobotColor color2 = new DefaultRobotColor(Color.WHITE);

        assertTrue(color0.equals(color0));
        assertFalse(color0.equals(color1));
        assertTrue(color0.equals(color2));

        assertFalse(color1.equals(color0));
        assertTrue(color1.equals(color1));
        assertFalse(color1.equals(color2));

        assertTrue(color2.equals(color0));
        assertFalse(color2.equals(color1));
        assertTrue(color2.equals(color2));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final RobotColor color0 = DefaultRobotColor.WHITE;
        final RobotColor color1 = DefaultRobotColor.BLACK;
        final RobotColor color2 = new DefaultRobotColor(Color.WHITE);

        assertTrue(color0.hashCode() == color0.hashCode());
        assertFalse(color0.hashCode() == color1.hashCode());
        assertTrue(color0.hashCode() == color2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final RobotColor color = DefaultRobotColor.YELLOW;

        final String expected = "org.vizzini.ai.robot.DefaultRobotColor [r=255,g=255,b=0,a=255]";
        final String result = color.toString();

        assertNotNull(result);
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>toBlackAndWhite()</code> method.
     */
    @Test
    public void toBlackAndWhiteYellow()
    {
        final RobotColor result = DefaultRobotColor.YELLOW.toBlackAndWhite();

        assertNotNull(result);
        assertThat(result.getRed(), is(255));
        assertThat(result.getGreen(), is(255));
        assertThat(result.getBlue(), is(255));
        assertThat(result.getAlpha(), is(255));
    }

    /**
     * Test the <code>toGrayScale()</code> method.
     */
    @Test
    public void toGrayScaleYellow()
    {
        final RobotColor result = DefaultRobotColor.YELLOW.toGrayScale();

        assertNotNull(result);
        assertThat(result.getRed(), is(208));
        assertThat(result.getGreen(), is(208));
        assertThat(result.getBlue(), is(208));
        assertThat(result.getAlpha(), is(255));
    }
}

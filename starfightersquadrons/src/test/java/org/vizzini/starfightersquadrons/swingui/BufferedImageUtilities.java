package org.vizzini.starfightersquadrons.swingui;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.awt.image.FilteredImageSource;
import java.awt.image.ImageFilter;
import java.awt.image.ImageProducer;
import java.awt.image.RGBImageFilter;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.junit.Ignore;
import org.junit.Test;

/**
 * Provides methods for working with a buffered image.
 */
public final class BufferedImageUtilities
{
    /**
     * Determine the green dice color.
     * 
     * @throws IOException if there is a problem.
     */
    @Ignore
    @Test
    public void findGreenDiceColor() throws IOException
    {
        final BufferedImage image = ImageIO.read(this.getClass().getResource("/DefenseEvade.jpg"));
        final int width = image.getWidth();
        final int height = image.getHeight();
        System.out.println("width, height: " + width + ", " + height);

        int sumRed = 0;
        int sumGreen = 0;
        int sumBlue = 0;
        int count = 0;

        for (int y = 0; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {
                final int pixel = image.getRGB(x, y);
                final Color color = determineColor(pixel);

                if (isGreenish(color))
                {
                    sumRed += color.getRed();
                    sumGreen += color.getGreen();
                    sumBlue += color.getBlue();
                    count++;
                }
            }
        }

        System.out.println("count = " + count);
        System.out.println("green average rgb: " + toInt(sumRed, count) + ", " + toInt(sumGreen, count) + ", "
                + toInt(sumBlue, count));
    }

    /**
     * Determine the red dice color.
     * 
     * @throws IOException if there is a problem.
     */
    @Ignore
    @Test
    public void findRedDiceColor() throws IOException
    {
        final BufferedImage image = ImageIO.read(this.getClass().getResource("/AttackHit.jpg"));
        final int width = image.getWidth();
        final int height = image.getHeight();
        System.out.println("width, height: " + width + ", " + height);

        int sumRed = 0;
        int sumGreen = 0;
        int sumBlue = 0;
        int count = 0;

        for (int y = 0; y < height; y++)
        {
            for (int x = 0; x < width; x++)
            {
                final int pixel = image.getRGB(x, y);
                final Color color = determineColor(pixel);

                if (isReddish(color))
                {
                    sumRed += color.getRed();
                    sumGreen += color.getGreen();
                    sumBlue += color.getBlue();
                    count++;
                }
            }
        }

        System.out.println("count = " + count);
        System.out.println("red average rgb: " + toInt(sumRed, count) + ", " + toInt(sumGreen, count) + ", "
                + toInt(sumBlue, count));
    }

    /**
     * Determine the green dice color.
     * 
     * @throws IOException if there is a problem.
     */
    @Ignore
    @Test
    public void recolorBackground181stFighterWingTie() throws IOException
    {
        final String filename = "181st_Fighter_Wing_TIE.jpg";
        final Color color1 = new Color(0, 0, 170);
        final Color color2 = new Color(110, 200, 255);
        recolorBackground(filename, color1, color2);
    }

    /**
     * Determine the green dice color.
     * 
     * @throws IOException if there is a problem.
     */
    @Ignore
    @Test
    public void recolorBackgroundEWing() throws IOException
    {
        final String filename = "E-Wing.jpg";
        final int delta1 = 0;
        final int delta2 = 0;
        final Color color1 = new Color(0, 0, 127 + delta1);
        final Color color2 = new Color(127 + delta2, 127 + delta2, 255);
        recolorBackground(filename, color1, color2);
    }

    /**
     * Determine the green dice color.
     * 
     * @throws IOException if there is a problem.
     */
    @Ignore
    @Test
    public void recolorBackgroundLambdaClassShuttle() throws IOException
    {
        final String filename = "Lambda-class_Shuttle.jpg";
        final Color color1 = new Color(167, 0, 0);
        final Color color2 = new Color(255, 127, 127);
        recolorBackground(filename, color1, color2);
    }

    /**
     * Determine the green dice color.
     * 
     * @throws IOException if there is a problem.
     */
    @Ignore
    @Test
    public void recolorBackgroundManeuvers() throws IOException
    {
        final String filename = "maneuvers.jpg";
        final Color color1 = new Color(127, 127, 127);
        final Color color2 = Color.WHITE;
        final Color color3 = Color.RED;
        recolorBackground(filename, color1, color2, color3);
    }

    /**
     * Determine the green dice color.
     * 
     * @throws IOException if there is a problem.
     */
    @Ignore
    @Test
    public void recolorBackgroundManeuversEasy() throws IOException
    {
        final Color color1 = new Color(127, 0, 0);
        final Color color2 = new Color(255, 127, 127);
        final Color color3 = new Color(0, 159, 0);

        final String[] filenames = { "Straight_Easy.png", "Bank_Right_Easy.png", "Turn_Right_Easy.png",
                "K_Turn_Easy.png", };

        for (final String filename : filenames)
        {
            recolorBackground(filename, color1, color2, color3);
        }
    }

    /**
     * Determine the green dice color.
     * 
     * @throws IOException if there is a problem.
     */
    @Ignore
    @Test
    public void recolorBackgroundManeuversStandard() throws IOException
    {
        final Color color1 = new Color(127, 0, 0);
        final Color color2 = new Color(255, 127, 127);
        final Color color3 = Color.WHITE;

        final String[] filenames = { "Straight_Standard.png", "Bank_Right_Standard.png", "Turn_Right_Standard.png",
                "K_Turn_Standard.png", };

        for (final String filename : filenames)
        {
            recolorBackground(filename, color1, color2, color3);
        }
    }

    /**
     * Determine the green dice color.
     * 
     * @throws IOException if there is a problem.
     */
    @Ignore
    @Test
    public void recolorBackgroundRoyalGuardTie() throws IOException
    {
        final String filename = "Royal_Guard_TIE.jpg";
        final Color color1 = new Color(0, 0, 127);
        final Color color2 = new Color(130, 190, 255);
        recolorBackground(filename, color1, color2);
    }

    /**
     * Determine the green dice color.
     * 
     * @throws IOException if there is a problem.
     */
    @Ignore
    @Test
    public void recolorBackgroundTieDefender() throws IOException
    {
        final String filename = "TIE_Defender.jpg";
        final int delta1 = 32;
        final Color color1 = new Color(127 + delta1, 0, 0);
        final int delta2 = 64;
        final Color color2 = new Color(255, 127 + delta2, 127 + delta2);
        recolorBackground(filename, color1, color2);
    }

    /**
     * Determine the green dice color.
     * 
     * @throws IOException if there is a problem.
     */
    @Ignore
    @Test
    public void recolorBackgroundTiePhantom() throws IOException
    {
        final String filename = "TIE_Phantom.jpg";
        final int delta1 = 32;
        final Color color1 = new Color(127 + delta1, 0, 0);
        final int delta2 = 64;
        final Color color2 = new Color(255, 127 + delta2, 127 + delta2);
        recolorBackground(filename, color1, color2);
    }

    /**
     * Determine the green dice color.
     * 
     * @throws IOException if there is a problem.
     */
    @Ignore
    @Test
    public void recolorBackgroundZ95Headhunter() throws IOException
    {
        final String filename = "Z-95_Headhunter.jpg";
        final int delta1 = 48;
        final Color color1 = new Color(127 + delta1, 0, 0);
        final int delta2 = 16;
        final Color color2 = new Color(255, 127 + delta2, 127 + delta2);
        recolorBackground(filename, color1, color2);
    }

    /**
     * @param pixel Pixel.
     * 
     * @return the color of the pixel.
     */
    private Color determineColor(final int pixel)
    {
        final int alpha = (pixel >> 24) & 0xff;
        final int red = (pixel >> 16) & 0xff;
        final int green = (pixel >> 8) & 0xff;
        final int blue = (pixel) & 0xff;

        return new Color(red, green, blue, alpha);
    }

    /**
     * @param image Image.
     * @param width Width.
     * @param height Height.
     * 
     * @return a new image.
     */
    private BufferedImage imageToBufferedImage(final Image image, final int width, final int height)
    {
        final BufferedImage dest = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        final Graphics2D g2 = dest.createGraphics();
        g2.drawImage(image, 0, 0, null);
        g2.dispose();

        return dest;
    }

    /**
     * @param color Color.
     * 
     * @return true if the color is a shade of green.
     */
    private boolean isGreenish(final Color color)
    {
        final int red = color.getRed();
        final int green = color.getGreen();
        final int blue = color.getBlue();

        return (red < 127) && (green > 127) && (blue < 127);
    }

    /**
     * @param color Color.
     * 
     * @return true if the color is a shade of red.
     */
    private boolean isReddish(final Color color)
    {
        final int red = color.getRed();
        final int green = color.getGreen();
        final int blue = color.getBlue();

        return (red > 127) && (green < 127) && (blue < 127);
    }

    /**
     * @param filename Filename.
     * @param color1 Low range of color to change.
     * @param color2 High range of color to change.
     * 
     * @throws IOException if there is a problem.
     */
    private void recolorBackground(final String filename, final Color color1, final Color color2) throws IOException
    {
        recolorBackground(filename, color1, color2, null);
    }

    /**
     * @param filename Filename.
     * @param color1 Low range of color to change.
     * @param color2 High range of color to change.
     * @param color3 Replacement color, or null for transparent.
     * 
     * @throws IOException if there is a problem.
     */
    private void recolorBackground(final String filename, final Color color1, final Color color2, final Color color3)
            throws IOException
    {
        final BufferedImage image = ImageIO.read(this.getClass().getResource("/" + filename));
        final int width = image.getWidth();
        final int height = image.getHeight();
        System.out.println(filename + " width, height: " + width + ", " + height);

        final Image transpImg2 = transformColorToTransparency(image, color1, color2, color3);
        final BufferedImage resultImage2 = imageToBufferedImage(transpImg2, image.getWidth(), image.getHeight());

        final File file = new File("images/" + filename);
        System.out.println("writing to file " + file);
        ImageIO.write(resultImage2, "png", file);

        System.out.println("Done.");
        Toolkit.getDefaultToolkit().beep();
    }

    /**
     * @param sum Sum.
     * @param count Count.
     * 
     * @return sum divided by count rounded to an integer.
     */
    private int toInt(final int sum, final int count)
    {
        return (int)Math.round((1.0 * sum) / count);
    }

    /**
     * @param image Image.
     * @param color1 Low range of color to change.
     * @param color2 High range of color to change.
     * @param color3 Replacement color, or null for transparent.
     * 
     * @return a new image with colors in the range transformed to transparent.
     */
    private Image transformColorToTransparency(final BufferedImage image, final Color color1, final Color color2,
            final Color color3)
    {
        // Primitive test, just an example
        final int r1 = color1.getRed();
        final int g1 = color1.getGreen();
        final int b1 = color1.getBlue();
        final int r2 = color2.getRed();
        final int g2 = color2.getGreen();
        final int b2 = color2.getBlue();

        final ImageFilter filter = new RGBImageFilter()
        {
            @Override
            public final int filterRGB(final int x, final int y, final int rgb)
            {
                int answer = rgb;

                final int r = (rgb & 0xFF0000) >> 16;
                final int g = (rgb & 0xFF00) >> 8;
                final int b = rgb & 0xFF;

                if ((r >= r1) && (r <= r2) && (g >= g1) && (g <= g2) && (b >= b1) && (b <= b2))
                {
                    if (color3 == null)
                    {
                        // Set fully transparent but keep color.
                        answer = rgb & 0xFFFFFF;
                    }
                    else
                    {
                        answer = color3.getRGB();
                    }
                }

                return answer;
            }
        };

        final ImageProducer ip = new FilteredImageSource(image.getSource(), filter);
        return Toolkit.getDefaultToolkit().createImage(ip);
    }
}

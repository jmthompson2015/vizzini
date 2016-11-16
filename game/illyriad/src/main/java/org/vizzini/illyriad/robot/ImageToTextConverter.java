package org.vizzini.illyriad.robot;

import java.awt.Dimension;

import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;

/**
 * Provides an application which converts an image into a string array.
 */
public final class ImageToTextConverter
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static final void main(final String[] args)
    {
        new ImageToTextConverter();
    }

    /** Input filter. */
    private final RobotImageInputFilter filter;

    /** Maximum image dimension. */
    private final Dimension maxDimension = new Dimension(8, 16);

    /**
     * Construct this object.
     */
    public ImageToTextConverter()
    {
        filter = new BlackAndWhiteImageInputFilter(maxDimension);

        final RobotImageIO imageIo = new RobotImageIO();

        {
            final RobotImage source = imageIo.read("/digits/decimalPoint/FoodAsk1.png");
            printImage(source);
        }

        {
            final RobotImage source = imageIo.read("/digits/digit3/StoneBid2.png");
            printImage(source);
        }

        {
            final RobotImage source = imageIo.read("/digits/digit8/WoodAsk2.png");
            printImage(source);
        }
    }

    /**
     * @param source Source image.
     */
    public void printImage(final RobotImage source)
    {
        System.out.println("source width, height = " + source.getWidth() + ", " + source.getHeight());

        final boolean isRgb = (filter.getClass() == RGBImageInputFilter.class);

        final double[] image = filter.filter(source);

        for (int j = 0; j < maxDimension.height; j++)
        {
            System.out.print(String.format("%3d |", j));

            for (int i = 0; i < maxDimension.width; i++)
            {
                if (isRgb)
                {
                    final int index = 3 * ((j * maxDimension.width) + i);
                    System.out.print(getPixel(image[index], image[index + 1], image[index + 2]));
                }
                else
                {
                    final int index = (j * maxDimension.width) + i;
                    System.out.print(getPixel(image[index]));
                }
            }
            System.out.println("|");
        }
    }

    /**
     * @param value Pixel value.
     * 
     * @return a string representing the given parameter.
     */
    private String getPixel(final double value)
    {
        String answer;

        if ((0.0 <= value) && (value < 0.2))
        {
            answer = "@";
        }
        else if ((0.2 <= value) && (value < 0.4))
        {
            answer = "#";
        }
        else if ((0.4 <= value) && (value < 0.6))
        {
            answer = "*";
        }
        else if ((0.6 <= value) && (value < 0.8))
        {
            answer = ":";
        }
        else
        {
            answer = " ";
        }

        return answer;
    }

    /**
     * @param red Red component.
     * @param green Green component.
     * @param blue Blue component.
     * 
     * @return a string representing the given parameters.
     */
    private String getPixel(final double red, final double green, final double blue)
    {
        return "<" + getPixel(red) + getPixel(green) + getPixel(blue) + ">";
    }
}

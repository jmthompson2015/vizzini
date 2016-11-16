package org.vizzini.illyriad.robot;

import java.awt.Dimension;
import java.util.Arrays;

import org.vizzini.ai.robot.DefaultRobotColor;
import org.vizzini.ai.robot.RobotColor;
import org.vizzini.ai.robot.RobotImage;

/**
 * Provides a filter to convert a buffered image to input using black and white images. Result input elements are either
 * 0.0 for black or 1.0 for white.
 */
public final class BlackAndWhiteImageInputFilter implements RobotImageInputFilter
{
    /** Minimum pixel value. */
    private static final double MIN = 0.0;

    /** Maximum pixel value. */
    private static final double MAX = 1.0 - MIN;

    /** Maximum image width. */
    private final int maxWidth;

    /** Maximum image height. */
    private final int maxHeight;

    /**
     * Construct this object.
     * 
     * @param maxDimension Maximum image dimension.
     */
    public BlackAndWhiteImageInputFilter(final Dimension maxDimension)
    {
        this(maxDimension.width, maxDimension.height);
    }

    /**
     * Construct this object.
     * 
     * @param maxWidth Maximum image width.
     * @param maxHeight Maximum image height.
     */
    @SuppressWarnings("hiding")
    public BlackAndWhiteImageInputFilter(final int maxWidth, final int maxHeight)
    {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
    }

    @Override
    public int computeInputLength()
    {
        return maxWidth * maxHeight;
    }

    @Override
    public boolean equals(final Object object)
    {
        boolean answer = false;

        if (object == this)
        {
            answer = true;
        }
        else if (object == null)
        {
            answer = false;
        }
        else if (getClass() != object.getClass())
        {
            answer = false;
        }
        else
        {
            final BlackAndWhiteImageInputFilter another = (BlackAndWhiteImageInputFilter)object;

            answer = maxWidth == another.maxWidth;

            if (answer)
            {
                answer = maxHeight == another.maxHeight;
            }
        }

        return answer;
    }

    @Override
    public double[] filter(final RobotImage input)
    {
        if (input == null)
        {
            throw new IllegalArgumentException("input is null");
        }

        final int width = input.getWidth();
        final int height = input.getHeight();

        if ((width > maxWidth) || (height > maxHeight))
        {
            throw new IllegalArgumentException("source dimensions exceed maximums: " + width + ", " + height + " > "
                    + maxWidth + ", " + maxHeight);
        }

        final int xOffset = computeOffset(maxWidth, width);
        final int yOffset = computeOffset(maxHeight, height);

        final double[] answer = new double[computeInputLength()];
        Arrays.fill(answer, MAX);

        for (int j = 0; j < height; j++)
        {
            for (int i = 0; i < width; i++)
            {
                final int index = ((j + yOffset) * maxWidth) + (i + xOffset);
                final RobotColor sourceColor = input.getPixel(i, j);
                final RobotColor color = sourceColor.toBlackAndWhite();
                answer[index] = (color == DefaultRobotColor.BLACK ? MIN : MAX);
            }
        }

        return answer;
    }

    @Override
    public int getMaxHeight()
    {
        return maxHeight;
    }

    @Override
    public int getMaxWidth()
    {
        return maxWidth;
    }

    @Override
    public int hashCode()
    {
        int answer = 2 * maxWidth;
        answer += 3 * maxHeight;

        return answer;
    }

    @Override
    public RobotImage reverseFilter(final double[] output)
    {
        if (output == null)
        {
            throw new IllegalArgumentException("output is null");
        }

        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder(getClass().getName());
        sb.append(" [");
        sb.append("maxWidth=").append(getMaxWidth());
        sb.append(", maxHeight=").append(getMaxHeight());
        sb.append("]");

        return sb.toString();
    }

    /**
     * @param max Maximum value.
     * @param value Value.
     * 
     * @return the offset necessary to center the image.
     */
    private int computeOffset(final int max, final int value)
    {
        return (int)Math.floor((max - value) / 2.0);
    }
}

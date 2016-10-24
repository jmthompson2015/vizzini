package org.vizzini.illyriad.robot.inventory;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.ai.robot.RobotColor;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.illyriad.robot.ImageSplitter;

/**
 * Provides an implementation of an image splitter for an inventory data quantity image.
 */
public final class QuantityImageSplitter implements ImageSplitter
{
    /** Digit width. */
    private final int digitWidth;

    /**
     * Construct this object.
     */
    public QuantityImageSplitter()
    {
        this(5);
    }

    /**
     * Construct this object.
     * 
     * @param digitWidth Digit width.
     */
    @SuppressWarnings("hiding")
    public QuantityImageSplitter(final int digitWidth)
    {
        this.digitWidth = digitWidth;
    }

    /**
     * @return the digitWidth
     */
    public int getDigitWidth()
    {
        return digitWidth;
    }

    @Override
    public List<RobotImage> split(final RobotImage image)
    {
        final List<RobotImage> answer = new ArrayList<RobotImage>();

        if (image != null)
        {
            final RobotColor thresholdColor = image.getMidrangeColor();
            final int maxCount = 0;
            final List<RobotImage> digits = image.splitAlongVerticalLine(thresholdColor, maxCount);

            for (int i = 0; i < digits.size(); i++)
            {
                final RobotImage digit = digits.get(i);

                // If a digit is wider than expected, try to split it again.
                if (digit.getWidth() > digitWidth)
                {
                    final List<RobotImage> myDigits = digit.splitAlongVerticalLine(thresholdColor, maxCount + 1);
                    answer.addAll(myDigits);
                }
                else
                {
                    answer.add(digit);
                }
            }
        }

        return answer;
    }
}

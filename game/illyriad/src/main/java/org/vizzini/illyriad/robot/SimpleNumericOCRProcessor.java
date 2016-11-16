package org.vizzini.illyriad.robot;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.ai.robot.RobotColor;
import org.vizzini.ai.robot.RobotImage;

/**
 * Provides a simple implementation of an OCR processor.
 */
public final class SimpleNumericOCRProcessor implements OCRProcessor
{
    /** Flag indicating whether output should be verbose. */
    private static final boolean IS_VERBOSE = true;

    @Override
    public List<String> process(final List<RobotImage> images)
    {
        final List<String> answer = new ArrayList<String>();

        for (final RobotImage image : images)
        {
            final String value = process(image);
            answer.add(value);
        }

        return answer;
    }

    @Override
    public String process(final RobotImage image)
    {
        final StringBuilder sb = new StringBuilder();

        // Split the image into single character segments.
        final RobotColor thresholdColor = image.getMidrangeColor();
        final List<RobotImage> characterImages = image.splitAlongVerticalLine(thresholdColor);

        for (final RobotImage characterImage : characterImages)
        {
            // Evaluate each segment.
            final String result = determineCharacter(characterImage, thresholdColor);

            // Append the results.
            if (StringUtils.isNotEmpty(result))
            {
                sb.append(result);
            }
        }

        return sb.toString();
    }

    /**
     * @param image Single character image.
     * @param thresholdColor Threshold color.
     * 
     * @return the character represented by the given image.
     */
    private String determineCharacter(final RobotImage image, final RobotColor thresholdColor)
    {
        String answer = "?";

        final int width = image.getWidth();
        final int height = image.getHeight();
        int sum = 0;

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                final RobotColor sourceColor = image.getPixel(i, j);

                if (sourceColor.isDarkerThan(thresholdColor))
                {
                    sum++;
                }
            }
        }

        if (IS_VERBOSE)
        {
            System.out.println("sum = " + sum);
        }

        RobotColor sourceColor;

        switch (sum)
        {
        case 1:
        case 2:
            answer = ".";
            break;
        case 16:
            answer = "2";
            break;
        case 15:
            answer = "3";
            break;
        case 14:
            answer = "4";
            break;
        case 19:
            answer = "0";
            break;
        case 21:
            answer = "6";
            break;
        case 36:
            answer = "64";
            break;
        case 17:
            sourceColor = image.getPixel(2, 6);
            if (sourceColor.isDarkerThan(thresholdColor))
            {
                sourceColor = image.getPixel(0, 5);
                if (sourceColor.isDarkerThan(thresholdColor))
                {
                    answer = "9";
                }
                else
                {
                    answer = "2";
                }
            }
            else
            {
                answer = "0";
            }
            break;
        case 10:
            sourceColor = image.getPixel(0, 4);
            if (sourceColor.isDarkerThan(thresholdColor))
            {
                answer = "1";
            }
            else
            {
                answer = "7";
            }
            break;
        case 18:
            if (image.getWidth() > 4)
            {
                sourceColor = image.getPixel(4, 2);
                if (sourceColor.isDarkerThan(thresholdColor))
                {
                    answer = "8";
                }
                else
                {
                    // answer = "5";
                    sourceColor = image.getPixel(0, 6);
                    if (sourceColor.isDarkerThan(thresholdColor))
                    {
                        answer = "0";
                    }
                    else
                    {
                        answer = "5";
                    }
                }
            }
            else
            {
                answer = "8";
            }
            break;
        }

        return answer;
    }
}

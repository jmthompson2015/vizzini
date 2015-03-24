package org.vizzini.illyriad.robot;

import java.util.Collections;
import java.util.List;

import org.vizzini.ai.robot.RobotColor;
import org.vizzini.ai.robot.RobotImage;

/**
 * Provides a default implementation of an image splitter.
 */
public final class DefaultImageSplitter implements ImageSplitter
{
    @Override
    public List<RobotImage> split(final RobotImage image)
    {
        List<RobotImage> answer;

        if (image != null)
        {
            final RobotColor thresholdColor = image.getMidrangeColor();
            final int maxCount = 0;
            answer = image.splitAlongVerticalLine(thresholdColor, maxCount);
        }
        else
        {
            answer = Collections.emptyList();
        }

        return answer;
    }
}

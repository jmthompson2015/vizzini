package org.vizzini.illyriad.robot;

import org.vizzini.ai.robot.RobotImage;

/**
 * Defines methods required by an image filter.
 */
public interface ImageFilter
{
    /**
     * @param image Image.
     * 
     * @return a new image.
     */
    RobotImage filter(RobotImage image);
}

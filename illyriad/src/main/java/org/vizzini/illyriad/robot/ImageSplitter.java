package org.vizzini.illyriad.robot;

import java.util.List;

import org.vizzini.ai.robot.RobotImage;

/**
 * Defines methods required by an image splitter.
 */
public interface ImageSplitter
{
    /**
     * @param image Image.
     * 
     * @return a new list of images.
     */
    List<RobotImage> split(RobotImage image);
}

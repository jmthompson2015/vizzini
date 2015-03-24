package org.vizzini.illyriad.robot;

import java.util.List;

import org.vizzini.ai.robot.RobotImage;

/**
 * Defines methods required by an optical character recognition processor.
 */
public interface OCRProcessor
{
    /**
     * @param images List of images.
     * 
     * @return a new list of strings.
     */
    List<String> process(List<RobotImage> images);

    /**
     * @param image Image.
     * 
     * @return the string represented by the given parameter.
     */
    String process(RobotImage image);
}

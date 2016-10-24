package org.vizzini.illyriad.robot;

import org.vizzini.ai.neuralnetwork.InputFilter;
import org.vizzini.ai.robot.RobotImage;

/**
 * Defines methods required by a filter which converts a robot image into neural network input.
 */
public interface RobotImageInputFilter extends InputFilter<RobotImage>
{
    /**
     * @return the input length.
     */
    int computeInputLength();

    /**
     * @return the maxHeight
     */
    int getMaxHeight();

    /**
     * @return the maxWidth
     */
    int getMaxWidth();
}

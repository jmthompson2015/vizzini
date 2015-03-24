package org.vizzini.ai.robot;

/**
 * Defines methods required by a robot sensor.
 * 
 * @param <I> Input type.
 * @param <O> Output type.
 */
public interface Sensor<I, O>
{
    /**
     * @return name.
     */
    String getName();

    /**
     * Sense.
     * 
     * @param input Input.
     * 
     * @return output.
     */
    O sense(I input);
}

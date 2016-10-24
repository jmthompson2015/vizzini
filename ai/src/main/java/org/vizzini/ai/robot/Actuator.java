package org.vizzini.ai.robot;

/**
 * Defines methods required by a robot actuator.
 * 
 * @param <I> Input type.
 * @param <O> Output type.
 */
public interface Actuator<I, O>
{
    /**
     * Actuate.
     * 
     * @param input Input.
     * 
     * @return output.
     */
    O actuate(I input);

    /**
     * @return name.
     */
    String getName();
}

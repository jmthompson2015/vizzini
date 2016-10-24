package org.vizzini.ai.robot;

/**
 * Defines methods required by an object which can delay.
 */
public interface Delayable
{
    /**
     * @param ms Time to sleep in milliseconds.
     * 
     * @return this object.
     */
    Delayable delay(int ms);
}

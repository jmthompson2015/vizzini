package org.vizzini.ai.geneticalgorithm;

/**
 * Defines methods required by a generation listener.
 */
public interface GenerationListener
{
    /**
     * @param event Event.
     */
    void generationCompleted(GenerationEvent event);
}

package org.vizzini.ai.neuralnetwork;

/**
 * Defines methods required by a filter.
 * 
 * @param <I> Input type.
 * @param <O> Output type.
 */
public interface Filter<I, O>
{
    /**
     * Filter.
     * 
     * @param input Input.
     * 
     * @return output.
     */
    O filter(I input);

    /**
     * Reverse filter.
     * 
     * @param output Output.
     * 
     * @return input.
     */
    I reverseFilter(O output);
}

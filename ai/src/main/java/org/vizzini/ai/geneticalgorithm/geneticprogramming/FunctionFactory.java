package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import org.vizzini.core.Factory;

/**
 * Defines methods required by a function factory.
 * 
 * @param <T> Type.
 */
public interface FunctionFactory<T> extends Factory<Function<T>>
{
    /**
     * @return maxLevelCount
     */
    int getMaxLevelCount();

    /**
     * @return the returnType.
     */
    Class<T> getReturnType();

    /**
     * @return terminalFactory
     */
    TerminalFactory<T> getTerminalFactory();
}

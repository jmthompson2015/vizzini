package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import org.vizzini.core.Factory;
import org.vizzini.core.RandomGenerator;

/**
 * Defines methods required by a terminal factory.
 * 
 * @param <T> Type.
 */
public interface TerminalFactory<T> extends Factory<Terminal<T>>
{
    /**
     * @return the converter
     */
    Converter<T> getConverter();

    /**
     * @return the generator
     */
    RandomGenerator getGenerator();

    /**
     * @return the returnType.
     */
    Class<T> getReturnType();
}

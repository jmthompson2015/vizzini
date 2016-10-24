package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Terminal;
import org.vizzini.core.Factory;

/**
 * Provides a factory for a right terminal.
 */
public final class LeftTerminalFactory implements Factory<Terminal<Integer>>
{
    /** Converter. */
    private final Converter<Integer> converter;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     */
    @SuppressWarnings("hiding")
    public LeftTerminalFactory(final Converter<Integer> converter)
    {
        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        this.converter = converter;
    }

    @Override
    public LeftTerminal create()
    {
        return new LeftTerminal(converter);
    }

    /**
     * @return the converter
     */
    public Converter<Integer> getConverter()
    {
        return converter;
    }

    /**
     * @return the returnType.
     */
    public Class<?> getReturnType()
    {
        return converter.getReturnType();
    }
}
